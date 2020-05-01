import React from 'react';
import Dygraph from 'dygraphs';
import './time-series-graph-view.css';

class TimeSeriesGraphView extends React.Component {	
	constructor(props) {
		super(props);
		this.graphRef = React.createRef();
	}
	
	render() { 
		return ( 
			<div id="time-series-graph-view">
				<GraphControls 
					minDate={this.props.minDate}
					maxDate={this.props.maxDate}
					startTimestamp={this.props.startTimestamp} 
					endTimestamp={this.props.endTimestamp}
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
		this.loadGraph();
    }
	
	// Reload graph upon changes to timeseries data
	componentDidUpdate(prevProps) {
		if (this.props.timeseries !== prevProps.timeseries) {
			this.loadGraph();
		}
	}
	
	// Function to load timeseries data into Dygraph
	loadGraph() {
		let onZoom = this.props.onZoom;
		
		var data = "";
        this.props.timeseries.forEach((item) => {
            data += item.timestamp + ',' + item.room_0_temp + ',' +
			item.room_1_temp + ',' + item.room_2_temp + ',' +
			item.room_3_temp + ',' + item.room_4_temp + ',' +
			(item.room_5_temp || "NaN") + ',' + item.room_6_temp + "\n";
        });
		
		new Dygraph(this.graphRef.current, data, {
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
	}
}

// Renders the GraphControls
class GraphControls extends React.Component {
	render() {
		let startDate = this.props.startTimestamp.split("T")[0];
		let startTime = this.props.startTimestamp.split("T")[1];
		let endDate = this.props.endTimestamp.split("T")[0];
		let endTime = this.props.endTimestamp.split("T")[1];
		
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
				<div className="controls">
					<input type="button" id="resetButton" value="Reset Graph" onClick={this.props.onReset} />
				</div>
			</div>
		);
	}
}

export default TimeSeriesGraphView;