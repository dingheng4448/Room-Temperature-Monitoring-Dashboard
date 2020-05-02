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

			// Calculate max slider range based on total number of date points in timeseries
			var maxDatePoints = this.props.timeseries.length;
			var maxSliderValue = Math.ceil(
				Math.log(maxDatePoints) / Math.log(this.state.baseValue)
			);
			
			// Update max slider range if timeseries data was changed
			if (this.state.maxSliderValue != maxSliderValue) {
				this.setState({
					maxSliderValue: maxSliderValue
				});
			}
			
			// Calculate interval to skip when loading data into graph
			var samplesPerLine = Math.pow(this.state.baseValue, this.state.currentSliderValue);
			var skipSize = Math.ceil(maxDatePoints/samplesPerLine);
			
			// Convert JSON timeseries data into CSV and calculate average temps
			var data = "";
			var newDatePoints = 0;
			var r0 = 0;
			var r1 = 0;
			var r2 = 0;
			var r3 = 0;
			var r4 = 0; 
			var r5 = 0;
			var r6 = 0;
			for (var i=0; i < maxDatePoints; i += skipSize) {
				var item = this.props.timeseries[i];
				data += item.timestamp + ',' + (item.room_0_temp || "NaN") + ',' +
				(item.room_1_temp || "NaN") + ',' + (item.room_2_temp || "NaN") + ',' +
				(item.room_3_temp || "NaN") + ',' + (item.room_4_temp || "NaN") + ',' +
				(item.room_5_temp || "NaN") + ',' + (item.room_6_temp || "NaN") + "\n";
				
				r0 += parseFloat(item.room_0_temp || 0);
				r1 += parseFloat(item.room_1_temp || 0);
				r2 += parseFloat(item.room_2_temp || 0);
				r3 += parseFloat(item.room_3_temp || 0);
				r4 += parseFloat(item.room_4_temp || 0);
				r5 += parseFloat(item.room_5_temp || 0);
				r6 += parseFloat(item.room_6_temp || 0);
				
				newDatePoints++;
			}
			this.props.tempValues.set('r0', r0/newDatePoints);
			this.props.tempValues.set('r1', r1/newDatePoints);
			this.props.tempValues.set('r2', r2/newDatePoints);
			this.props.tempValues.set('r3', r3/newDatePoints);	
			this.props.tempValues.set('r4', r4/newDatePoints);
			this.props.tempValues.set('r5', r5/newDatePoints);
			this.props.tempValues.set('r6', r6/newDatePoints);
			this.props.updateTempValues();
			
			// Uncomment to include end point in graph
			/*var lastRow = this.props.timeseries[this.props.timeseries.length - 1];
			data += lastRow.timestamp + ',' + (lastRow.room_0_temp || "NaN") + ',' +
				(lastRow.room_1_temp || "NaN") + ',' + (lastRow.room_2_temp || "NaN") + ',' +
				(lastRow.room_3_temp || "NaN") + ',' + (lastRow.room_4_temp || "NaN") + ',' +
				(lastRow.room_5_temp || "NaN") + ',' + (lastRow.room_6_temp || "NaN") + "\n";*/
			
			// Set graph window to start/end inputs
			var minX = Date.parse(this.props.inputStartString);
			var maxX = Date.parse(this.props.inputEndString);
		
			this.graph.updateOptions({ 
				file: data,
				dateWindow: [minX, maxX]
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