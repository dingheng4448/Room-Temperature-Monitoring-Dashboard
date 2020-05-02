import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { TimeseriesCollection } from '../api/timeseries.js';
import TimeSeriesGraphView from './TimeSeriesGraphView.jsx';

// This class creates a container component which provides data to TimeSeriesGraphView component
// Subscribes to data from server based on user inputs and stores data into timeseries variable
const TimeSeriesGraphContainer = withTracker(({ dataStartString, dataEndString }) => {
	var startDate = new Date(dataStartString);
	var endDate = new Date(dataEndString);
	
	Meteor.subscribe('queriedResults', [startDate, endDate]);
	return {
		timeseries: TimeseriesCollection.find({}, { sort: { timestamp: 1 } }).fetch()
	};
})(TimeSeriesGraphView);

export default TimeSeriesGraphContainer;