import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { TimeseriesCollection } from '../api/timeseries.js';

import TimeSeriesGraphView from './TimeSeriesGraphView';
import FloorplanView from './FloorplanView';

class App extends React.Component {	
	constructor(props) {
		super(props);

		

		

	}

	render() { 
		const isSelectedMap = new Map();
		isSelectedMap.set('r0', true);
		isSelectedMap.set('r1', true);
		isSelectedMap.set('r2', true);
		isSelectedMap.set('r3', true);
		isSelectedMap.set('r4', true);
		isSelectedMap.set('r5', true);
		isSelectedMap.set('r6', true);


		return ( 
			<div>
				<h1>sendh3lp's Room Temperature Monitoring Dashboard</h1>
				<TimeSeriesGraphView />
				<FloorplanView 
				isSelectedMap = {isSelectedMap}
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