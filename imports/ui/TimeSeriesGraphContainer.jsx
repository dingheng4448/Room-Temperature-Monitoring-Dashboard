import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { TimeseriesCollection } from '../api/timeseries.js';
import TimeSeriesGraphView from './TimeSeriesGraphView.jsx';

// This class creates a container component which provides data to TimeSeriesGraphView component
// Subscribes to data from server based on user inputs and stores data into timeseries variable
const TimeSeriesGraphContainer = withTracker(({ startTimestamp, endTimestamp }) => {
	var start = new Date(startTimestamp);
	var end = new Date(endTimestamp);
	
	Meteor.subscribe('queriedResults', [start, end]);

	return {
		timeseries: TimeseriesCollection.find({}).fetch()
	};
})(TimeSeriesGraphView);

export default TimeSeriesGraphContainer;