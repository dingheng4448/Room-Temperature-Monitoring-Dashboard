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
				data += item.timestamp + ',' + item.room_0_temp + ',' +
				item.room_1_temp + ',' + item.room_2_temp + ',' +
				item.room_3_temp + ',' + item.room_4_temp + ',' +
				(item.room_5_temp || "NaN") + ',' + item.room_6_temp + "\n";
			});
		
			this.graph.updateOptions({ 
				file: data,
				dateWindow: [Date.parse(this.props.inputStartString), Date.parse(this.props.inputEndString)]
			});
		}
	}
	
	// Function to setup Dygraph
	loadGraph() {
		let onZoom = this.props.onZoom;
		var data = "";

		// Define custom interaction model for Dygraph
		/*const myInteractions = Object.assign({}, Dygraph.defaultInteractionModel, {
      dblclick: (event, g, context) => {
        console.log("double-click!", event, g, context);
      },
      mousedown: (event, g, context) => {
        console.log("start mousedown");
        context.initializeMouseDown(event, g, context);
		if (event.altKey || event.shiftKey) {
  Dygraph.startZoom(event, g, context);
} else {
  Dygraph.startPan(event, g, context);
} 
        //Dygraph.startPan(event, g, context);
      },
      mousemove: (event, g, context) => {
        if(context.isPanning) {
          console.log("mouse is moving", event, g, context);
          Dygraph.movePan(event, g, context);
        }
      },
      mouseup: (event, g, context) => {
        console.log("mouseup", event, g, context);
        Dygraph.endPan(event, g, context);
        context.isPanning = false;
      }
});*/
		
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
			
			
			
			zoomCallback: function(minX, maxX, yRanges) {
				onZoom(minX, maxX);
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