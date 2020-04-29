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
				{this.props.timeseries.map(item => <div>{item.timestamp_day}</div>)}
				<FloorplanView />
			</div>
		);
	}
}

// Subscribes to data from server based on user inputs
export default withTracker(() => {
	Meteor.subscribe('queriedResults', "2013-10-02");
	return {
		timeseries: TimeseriesCollection.find({}).fetch(),
	};
})(App);