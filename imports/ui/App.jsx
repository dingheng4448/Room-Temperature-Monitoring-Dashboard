import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { TimeseriesCollection } from '../api/timeseries.js';

import TimeSeriesGraphView from './TimeSeriesGraphView';
import FloorplanView from './FloorplanView';

class App extends React.Component {	
	render() { 		
		return ( 
			<div>
				<h3 id="header">sendh3lp's Room Temperature Monitoring Dashboard</h3>
				<TimeSeriesGraphView />
				{this.props.timeseries.map(item => <div>{item.timestamp.toISOString()}</div>)}
				<FloorplanView />
			</div>
		);
	}
}

// Subscribes to data from server based on user inputs
export default withTracker(() => {
	var startTimestamp = new Date("2013-10-02T05:00:00");
	var endTimestamp = new Date("2013-10-07T06:00:00");
	
	Meteor.subscribe('queriedResults', [startTimestamp, endTimestamp]);
	return {
		timeseries: TimeseriesCollection.find({}).fetch(),
	};
})(App);