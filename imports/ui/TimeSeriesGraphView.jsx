import React from 'react';
import Dygraph from 'dygraphs';

class TimeSeriesGraphView extends React.Component {	
	constructor(props) {
		super(props);
		this.graphRef = React.createRef();
	}
	
	render() { 		
		return ( 
			<div>
				<div ref={this.graphRef}></div>
			</div>
		);
	}
	
	// Load graph once its container div is rendered
	componentDidMount() {
        var data = "";
        this.props.timeseries.forEach((item) => {
            data += item.timestamp + ',' + item.room_0_temp + ',' +
			item.room_1_temp + ',' + item.room_2_temp + ',' +
			item.room_3_temp + ',' + item.room_4_temp + ',' +
			item.room_5_temp + ',' + item.room_6_temp + "\n";
        });
		
		new Dygraph(this.graphRef.current, data, {
			legend: 'always',
			animatedZooms: true,
			labels: ['Date', 'Room 0 Temp', 'Room 1 Temp', 
			'Room 2 Temp', 'Room 3 Temp', 'Room 4 Temp', 
			'Room 5 Temp', 'Room 6 Temp'],
			ylabel: 'Temperature (C)',
			connectSeparatedPoints: true
        });
    }
	
	// Reload graph upon changes to timeseries data
	componentDidUpdate(prevProps) {
		if (this.props.timeseries !== prevProps.timeseries) {
			var data = "";
			this.props.timeseries.forEach((item) => {
				data += item.timestamp + ',' + item.room_0_temp + ',' +
				item.room_1_temp + ',' + item.room_2_temp + ',' +
				item.room_3_temp + ',' + item.room_4_temp + ',' +
				item.room_5_temp + ',' + item.room_6_temp + "\n";
			});
		
			new Dygraph(this.graphRef.current, data, {
				legend: 'always',
				animatedZooms: true,
				labels: ['Date', 'Room 0 Temp', 'Room 1 Temp', 
				'Room 2 Temp', 'Room 3 Temp', 'Room 4 Temp', 
				'Room 5 Temp', 'Room 6 Temp'],
				ylabel: 'Temperature (C)',
				connectSeparatedPoints: true
			});
		}
	}
}

export default TimeSeriesGraphView;