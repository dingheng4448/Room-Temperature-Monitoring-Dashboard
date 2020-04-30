import { Meteor } from 'meteor/meteor';

import { TimeseriesCollection } from '/imports/api/timeseries';

// Code to be run on starting up the server to setup server database
Meteor.startup(() => {
	
	// If the TimeseriesCollection collection is empty, populate it with data from room-temperatures.csv.
	if (TimeseriesCollection.find().count() === 0) {
		
		// Read room-temperatures.csv
		let csv = Assets.getText("room-temperatures.csv");
		var rows = csv.split(/\r\n|\n/);
		// Remove headers row from csv
		rows.shift();
		
		console.log("Loading...");
		
		// Parse into custom JSON schema and dump into TimeseriesCollection
		for (row of rows) {
			if (row.length > 0) { 
				var data = row.split(",");
				let roomNo = data[0];
				let timestamp = new Date(data[1]);
				let temperature = data[2];
				
				var setObject = {};
				setObject["room_" + roomNo + "_temp"] = temperature;
				
				// Insert new timestamp if it doesn't exist, else add new fields to existing timestamp
				let result = TimeseriesCollection.update({
					timestamp : timestamp
				},
				{ $set: setObject }, 
				{ upsert: true });
			}
		}
		
		console.log("Server Setup Complete");
	}
});

