import { Mongo } from 'meteor/mongo';

export const TimeseriesCollection = new Mongo.Collection('timeseries');

// Publishes a subset of data to client based on function parameters
if(Meteor.isServer){
	Meteor.publish('queriedResults', function(startDate){
		return TimeseriesCollection.find({ timestamp: startDate });
	});
}