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
		return ( 
			<div>
				<h1>sendh3lp's Room Temperature Monitoring Dashboard</h1>
				<TimeSeriesGraphView />
				<FloorplanView 
			
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