import { Mongo } from 'meteor/mongo';

export const TimeseriesCollection = new Mongo.Collection('timeseries');

// Publishes a subset of data to client based on function parameters
if(Meteor.isServer){
	Meteor.publish('queriedResults', function(parameters){
		var startTimestamp = parameters[0];
		var endTimestamp = parameters[1];
		
		return TimeseriesCollection.find({ timestamp: { $gte : startTimestamp, $lte: endTimestamp } });
	});
}