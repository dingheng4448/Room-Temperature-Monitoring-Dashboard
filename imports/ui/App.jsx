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
		// find action being carried out by user
		var action = 'CLICK_'
		action = action.concat(roomNum.toUpperCase());
		console.log("the action is " + action);

		// send action to xstate machine
		this.service.send( action );
	}

	// function to find average temperatures
	findAveTemp = (temperatures, sampleSize) => {

	}

	render() { 
		return ( 
			<div>
				<h1>sendh3lp's Room Temperature Monitoring Dashboard</h1>
				<TimeSeriesGraphView />
				<FloorplanView 
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