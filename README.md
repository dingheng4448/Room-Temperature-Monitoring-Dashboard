Repo URL: https://github.com/dingheng4448/Room-Temperature-Monitoring-Dashboard

## Server Setup
When setting up the server, please ensure you see "Server Setup Complete" in the console. It takes about 1 minute 30 seconds for the server to complete its setup as there are many entries to load from room-temperatures.csv.

## Folder Structure

Room-Temperature-Monitoring-Dashboard/
* client/
	* main.css (Styling for the overall application)
	* main.html (Main template for the application)
	* main.jsx (Main JS code for client which registers service worker and renders App component)
* imports/
	* api/
		* timeseries.js (Exports the MongoDB Collection for time series data. If running from server environment, the Collection’s publication is defined.)
	* ui/
		* App.jsx (Parent of all components in this folder. Manages the state which subcomponents rely on to dynamically render their views.)
		* CorridorView.jsx (Corridor component to be used in Floorplan component)
		* FloorplanView.css (Styling for Floorplan component)
		* FloorplanView.jsx (Floorplan component that renders the floorplan and colours of the rooms)
		* RoomView.jsx (Room component to be used in Floorplan component)
		* tempDashboardMachine.jsx (Describes the statechart for the dashboard and the business logic to handle the rooms’ selected state.)
		* TimeSeriesGraphContainer.jsx (Container component which subscribes to data from server and passes it to the TimeSeriesGraph child component)
		* time-series-graph-view.css (Styling for TimeSeriesGraph component)
		* TimeSeriesGraphView.jsx (TimeSeriesGraph component that renders the Dygraph component and graph controls, as well as handling the data to be displayed)
* private/
	* room-temperatures.csv (original data file provided)
* public/
	* images/ (Icons for PWA to render it's app icons)
		* icons-192.png
		* icons-512.png
	* manifest.json (Manifest for PWA properties)
	* sw.js (Service worker for Meteor)
* server/
	* main.js (Main JS code for server which sets up server database by parsing CSV to JSON.
