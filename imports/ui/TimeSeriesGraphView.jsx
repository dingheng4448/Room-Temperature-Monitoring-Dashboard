import React from 'react';
import Dygraph from 'dygraphs';
import './time-series-graph-view.css';

class TimeSeriesGraphView extends React.Component {	
	constructor(props) {
		super(props);
		this.graphRef = React.createRef();
		var graph = null;
		
		this.state = {
			minSliderValue: 1,
			maxSliderValue: 2,
			currentSliderValue: 1,
			baseValue: 2
		};
	}
	
	// Load graph once its container div is rendered
	componentDidMount() {
		this.graph = this.loadGraph();
	}
	
	// Update graph upon changes to timeseries data or start/end/slider inputs
	componentDidUpdate(prevProps, prevState) {
		if (((this.props.timeseries !== prevProps.timeseries) && this.graph != null) ||
			((this.state.currentSliderValue !== prevState.currentSliderValue) && this.graph != null)) {
				
			// Set graph window to start/end inputs
			var minX = Date.parse(this.props.inputStartString);
			var maxX = Date.parse(this.props.inputEndString);
			
			// Extract data from timeseries for current graph window
			var extractedData = [];
			var minXDate = new Date(minX);
			var maxXDate = new Date(maxX);
			for (var i=0; i < this.props.timeseries.length; i += 1) {
				let item = this.props.timeseries[i];
				let itemDate = new Date(item.timestamp);
				if (itemDate >= minXDate) {
					extractedData.push(item);
				}
				if (itemDate >= maxXDate) {
					break;
				}
			}

			// Calculate max slider range based on total number of date points in extracted data
			var maxDatePoints = extractedData.length;
			var maxSliderValue = Math.ceil(
				Math.log(maxDatePoints) / Math.log(this.state.baseValue)
			);
			
			// Update max slider range if extracted data was changed
			if (this.state.maxSliderValue != maxSliderValue) {
				this.setState({
					maxSliderValue: maxSliderValue
				});
			}
			
			// Calculate interval to skip when loading extracted data into graph
			var samplesPerLine = Math.pow(this.state.baseValue, this.state.currentSliderValue);
			var skipSize = Math.ceil(maxDatePoints/samplesPerLine);
			
			var displayData = "";
			var newDatePoints = 0;
			var r0Total = 0;
			var r0NullCount = 0;
			var r1Total = 0;
			var r1NullCount = 0;
			var r2Total = 0;
			var r2NullCount = 0;
			var r3Total = 0;
			var r3NullCount = 0;
			var r4Total = 0; 
			var r4NullCount = 0;
			var r5Total = 0;
			var r5NullCount = 0;
			var r6Total = 0;
			var r6NullCount = 0;
			
			// Convert JSON extracted data into CSV to display on graph
			for (var i=0; i < maxDatePoints; i += skipSize) {
				let item = extractedData[i];
				
				// CSV Conversion
				displayData += item.timestamp + ',' + (item.room_0_temp || "NaN") + ',' +
				(item.room_1_temp || "NaN") + ',' + (item.room_2_temp || "NaN") + ',' +
				(item.room_3_temp || "NaN") + ',' + (item.room_4_temp || "NaN") + ',' +
				(item.room_5_temp || "NaN") + ',' + (item.room_6_temp || "NaN") + "\n";
				
				// Add each room's temperature to its total or add 0 if data is missing
				r0Total += parseFloat(item.room_0_temp || 0);
				r1Total += parseFloat(item.room_1_temp || 0);
				r2Total += parseFloat(item.room_2_temp || 0);
				r3Total += parseFloat(item.room_3_temp || 0);
				r4Total += parseFloat(item.room_4_temp || 0);
				r5Total += parseFloat(item.room_5_temp || 0);
				r6Total += parseFloat(item.room_6_temp || 0);
				
				// Log each time each room's temperature data is missing
				if (item.room_0_temp == null) r0NullCount++;
				if (item.room_1_temp == null) r1NullCount++;
				if (item.room_2_temp == null) r2NullCount++;
				if (item.room_3_temp == null) r3NullCount++;
				if (item.room_4_temp == null) r4NullCount++;
				if (item.room_5_temp == null) r5NullCount++;
				if (item.room_6_temp == null) r6NullCount++;
				
				newDatePoints++;
			}
			
			// Calculate average temperatures of each room in current graph window
			this.props.tempValues.set('r0', r0Total/(newDatePoints-r0NullCount));
			this.props.tempValues.set('r1', r1Total/(newDatePoints-r1NullCount));
			this.props.tempValues.set('r2', r2Total/(newDatePoints-r2NullCount));
			this.props.tempValues.set('r3', r3Total/(newDatePoints-r3NullCount));	
			this.props.tempValues.set('r4', r4Total/(newDatePoints-r4NullCount));
			this.props.tempValues.set('r5', r5Total/(newDatePoints-r5NullCount));
			this.props.tempValues.set('r6', r6Total/(newDatePoints-r6NullCount));
			this.props.updateTempValues();
			
			// Uncomment to include end point in graph
			/*var lastRow = this.props.timeseries[this.props.timeseries.length - 1];
			displayData += lastRow.timestamp + ',' + (lastRow.room_0_temp || "NaN") + ',' +
				(lastRow.room_1_temp || "NaN") + ',' + (lastRow.room_2_temp || "NaN") + ',' +
				(lastRow.room_3_temp || "NaN") + ',' + (lastRow.room_4_temp || "NaN") + ',' +
				(lastRow.room_5_temp || "NaN") + ',' + (lastRow.room_6_temp || "NaN") + "\n";*/
			
			// Show/Hide graph lines depending on rooms selected from data in XState
			var r0Selected = this.props.tempDashboardState.value.room0 === "selected";
			var r1Selected = this.props.tempDashboardState.value.room1 === "selected";
			var r2Selected = this.props.tempDashboardState.value.room2 === "selected";
			var r3Selected = this.props.tempDashboardState.value.room3 === "selected";
			var r4Selected = this.props.tempDashboardState.value.room4 === "selected";
			var r5Selected = this.props.tempDashboardState.value.room5 === "selected";
			var r6Selected = this.props.tempDashboardState.value.room6 === "selected";
			
			// Update graph with new options
			this.graph.updateOptions({ 
				file: displayData,
				dateWindow: [minX, maxX],
				visibility: [r0Selected, r1Selected, r2Selected,
							r3Selected, r4Selected, r5Selected, r6Selected]
			});
		}
	}
	
	// Function to setup Dygraph
	loadGraph() {
		let onPanZoom = this.props.onPanZoom;
		var data = "";

		// Define custom interaction model for Dygraph to handle panning end event
		const interactionModel = Object.assign({}, Dygraph.defaultInteractionModel, {
			mouseup: (event, g, context) => {
				if (context.isPanning == true) {
					onPanZoom(g.dateWindow_[0], g.dateWindow_[1]);
				}
				Dygraph.endPan(event, g, context);
				context.isPanning = false;
			}
		});
		
		var g = new Dygraph(this.graphRef.current, data, {
			legend: 'always',
			labelsDiv: legend,
			labelsSeparateLines: true,
			labels: ['Date', 'Room 0 Temp', 'Room 1 Temp', 
			'Room 2 Temp', 'Room 3 Temp', 'Room 4 Temp', 
			'Room 5 Temp', 'Room 6 Temp'],
			animatedZooms: true,
			connectSeparatedPoints: true,
			ylabel: 'Temperature (&#8451;)',
			interactionModel: interactionModel,
			visibility: [true, true, true, true, true, true, true],
			colors: ['#006400', '#000080', '#b03060', '#00bfff', '#ff0000', '#ff00ff', '#00ff00'],
			
			zoomCallback: function(minX, maxX, yRanges) {
				onPanZoom(minX, maxX);
			}
        });
		
		return(g);
	}
	
	// Update currentSliderValue upon changes in slider input
	updateCurrentSliderValue = e => {
		this.setState({
			currentSliderValue: e.target.value
		});
	}
	
	render() { 
		return ( 
			<div id="time-series-graph-view">
				<GraphControls 
					minDate={this.props.minDate}
					maxDate={this.props.maxDate}
					inputStartString={this.props.inputStartString} 
					inputEndString={this.props.inputEndString}
					onChangeStartDate={this.props.onChangeStartDate}
					onChangeStartTime={this.props.onChangeStartTime} 
					onChangeEndDate={this.props.onChangeEndDate} 
					onChangeEndTime={this.props.onChangeEndTime}
					
					minSliderValue={this.state.minSliderValue}
					maxSliderValue={this.state.maxSliderValue}
					currentSliderValue={this.state.currentSliderValue}
					baseValue={this.state.baseValue}
					onChangeSlider={this.updateCurrentSliderValue}
				/>
				<div id="graph-container" style={{height: "320px"}}>
					<div id="graph" ref={this.graphRef} style={{width: "75%"}}></div>
					<div id="legend"></div>
				</div>
			</div>
		);
	}
}

// Renders the GraphControls
class GraphControls extends React.Component {
	render() {
		let startDate = this.props.inputStartString.split("T")[0];
		let startTime = this.props.inputStartString.split("T")[1];
		let endDate = this.props.inputEndString.split("T")[0];
		let endTime = this.props.inputEndString.split("T")[1];
		
		return (
			<div id="graph-controls">
				<div className="controls">
					<label htmlFor="startDate">Start: </label>
					<input type="date" id="startDate" name="startDate" 
						min={this.props.minDate} max={this.props.maxDate} 
						value={startDate} onChange={this.props.onChangeStartDate} 
					/>
					<input type="time" id="startTime" name="startTime" style={{marginLeft: "2px"}} 
						step="900" min="00:00" max="24:00"
						value={startTime} onChange={this.props.onChangeStartTime} 
					/>
				</div>
				<div className="controls">
					<label htmlFor="endDate">End: </label>
					<input type="date" id="endDate" name="endDate" 
						min={this.props.minDate} max={this.props.maxDate}
						value={endDate} onChange={this.props.onChangeEndDate} 
					/>
					<input type="time" id="endTime" name="endTime" style={{marginLeft: "2px"}}
						step="900" min="00:00" max="24:00"
						value={endTime} onChange={this.props.onChangeEndTime} 
					/>
				</div>
				<div className="controls">
					<input type="range" id="sampleSizeSlider" name="sampleSizeSlider" 
						min={this.props.minSliderValue} max={this.props.maxSliderValue} 
						value={this.props.currentSliderValue} onChange={this.props.onChangeSlider}
					/>
					<span id="sampleSize" style={{marginLeft: "10px"}}>
						{this.props.baseValue}^{this.props.currentSliderValue} = 
						{Math.pow(this.props.baseValue, this.props.currentSliderValue)} samples max per line
					</span>
				</div>
			</div>
		);
	}
}

export default TimeSeriesGraphView;