import React from 'react';
import { interpret } from 'xstate'
import { withTracker } from 'meteor/react-meteor-data';

import { TimeseriesCollection } from '../api/timeseries.js';

import TimeSeriesGraphView from './TimeSeriesGraphView';
import FloorplanView from './FloorplanView';


import { tempDashboardMachine } from './tempDashboardMachine'; 

class App extends React.Component {	
	constructor(props) {
		super(props);

		const isSelectedMap = new Map();
		isSelectedMap.set('r0', true);
		isSelectedMap.set('r1', true);
		isSelectedMap.set('r2', true);
		isSelectedMap.set('r3', true);
		isSelectedMap.set('r4', true);
		isSelectedMap.set('r5', true);
		isSelectedMap.set('r6', true);

		// temp hard coded values to be obtained from model class (should just get ave temp)
		const tempValues = new Map();
		tempValues.set('r0', 80);
		tempValues.set('r1', 93);
		tempValues.set('r2', 8);
		tempValues.set('r3', 16);	
		tempValues.set('r4', 3);
		tempValues.set('r5', 56);
		tempValues.set('r6', 57);

		
		this.state = {
			isSelectedMap: isSelectedMap,
			tempValues: tempValues,
			tempDashboardState: tempDashboardMachine.initialState
		}

	}

	service = interpret(tempDashboardMachine).onTransition(current =>
		this.setState({ tempDashboardState: current })
	);

	// Start the service when the component is mounted
	componentDidMount() {
		this.service.start();
	}
	
	// Stop the service when the component is unmounted
	componentWillUnmount() {
		this.service.stop();
	}

	updateRoomState = (event, roomNum) => {
		console.log("successfully called");
		console.log("the room number is " + roomNum);
		
		var roomStates = this.state.tempDashboardState.value;
		var roomStateString = roomStates.room0.toString();
		console.log("the initial state is " + roomStateString);

		// if true, set to unselected
		// if false, set to selected
		var newState = (roomStateString == 'selected') ? 'unselected' : 'selected'

		console.log("the new state is " + newState);
		this.service.send('CLICK_R0');
		
	}

	render() { 
		// let currentState = this.state.tempDashboardState.value;
		// console.log("look here " + currentState.room0);
		return ( 
			<div>
				<h1>sendh3lp's Room Temperature Monitoring Dashboard</h1>
				<TimeSeriesGraphView />
				<FloorplanView 
				isSelectedMap = {this.state.isSelectedMap}
				tempValues = {this.state.tempValues}
				tempDashboardState = {this.state.tempDashboardState.value}
				onRoomClick={(event, roomNum) => this.updateRoomState(event, roomNum)}
				/>
			</div>
		);
	}
}

export default withTracker(() => {
	return {
		timeseries: TimeseriesCollection.find({}).fetch(),
	};
})(App);