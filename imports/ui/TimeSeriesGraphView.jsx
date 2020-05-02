import React from 'react';
import Dygraph from 'dygraphs';
import './time-series-graph-view.css';

class TimeSeriesGraphView extends React.Component {	
	constructor(props) {
		super(props);
		this.graphRef = React.createRef();
		var graph = null;
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
					onReset={this.props.onReset}
				/>
				<div id="graph-container" style={{height: "320px"}}>
					<div id="graph" ref={this.graphRef} style={{width: "75%"}}></div>
					<div id="legend"></div>
				</div>
			</div>
		);
	}
	
	// Load graph once its container div is rendered
	componentDidMount() {
		this.graph = this.loadGraph();
    }
	
	// Update graph upon changes to timeseries data or start/end inputs
	componentDidUpdate(prevProps) {
		if ((this.props.timeseries !== prevProps.timeseries) && this.graph != null) {
			
			// Convert JSON timeseries data into CSV
			var data = "";
			this.props.timeseries.forEach((item) => {
				data += item.timestamp + ',' + (item.room_0_temp || "NaN") + ',' +
				(item.room_1_temp || "NaN") + ',' + (item.room_2_temp || "NaN") + ',' +
				(item.room_3_temp || "NaN") + ',' + (item.room_4_temp || "NaN") + ',' +
				(item.room_5_temp || "NaN") + ',' + (item.room_6_temp || "NaN") + "\n";
			});
			
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
					<input type="range" id="sampleSizeSlider" name="sampleSizeSlider" />
					<span id="sampleSize" style={{marginLeft: "10px"}}>999 samples</span>
				</div>
			</div>
		);
	}
}

export default TimeSeriesGraphView;