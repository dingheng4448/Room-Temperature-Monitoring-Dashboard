import React from 'react';
import TimeSeriesGraphContainer from './TimeSeriesGraphContainer.jsx';
import FloorplanView from './FloorplanView.jsx';

class App extends React.Component {	
	constructor(props){
		super(props);	
	
		this.state = {
			minDate: "2013-10-02",
			maxDate: "2013-12-03",
			startTimestamp: "2013-10-02T05:00:00",
			endTimestamp: "2013-10-03T00:00:00",
			oldStartTimestamp: "2013-10-02T05:00:00",
			oldEndTimestamp: "2013-10-03T00:00:00"
		}; 
	}
	
	// Update startTimestamp upon changes in start date input
	updateStartDate = e => {
		let time = this.state.startTimestamp.split("T")[1];
		let newStartTimestamp = e.target.value + "T" + time;
		this.setState({
			startTimestamp: newStartTimestamp
		});
	}
	
	// Update startTimestamp upon changes in start time input
	updateStartTime = e => {
		let date = this.state.startTimestamp.split("T")[0];
		let newStartTimestamp = date + "T" + e.target.value + ":00";
		this.setState({
			startTimestamp: newStartTimestamp
		});
	}
	
	// Update endTimestamp upon changes in end date input
	updateEndDate = e => {
		let time = this.state.endTimestamp.split("T")[1];
		let newEndTimestamp = e.target.value + "T" + time;
		this.setState({
			endTimestamp: newEndTimestamp
		});
	}
	
	// Update endTimestamp upon changes in end time input
	updateEndTime = e => {
		let date = this.state.endTimestamp.split("T")[0];
		let newEndTimestamp = date + "T" + e.target.value + ":00";
		this.setState({
			endTimestamp: newEndTimestamp
		});
	}
	
	// Update start and end timestamps upon pan/zoom
	updateInputFields = (minX, maxX) => {
		let oldStartTimestamp = this.state.startTimestamp;
		let oldEndTimestamp = this.state.endTimestamp;
		
		let timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
		let newStartTimestamp = (new Date(minX - timezoneOffset)).toISOString().slice(0, -8);
		let newEndTimestamp = (new Date(maxX - timezoneOffset)).toISOString().slice(0, -8);
		
		this.setState({
			startTimestamp: newStartTimestamp,
			endTimestamp: newEndTimestamp,
			oldStartTimestamp: oldStartTimestamp,
			oldEndTimestamp: oldEndTimestamp
		});
	}
	
	// TODO: Remove reset graph button if unnecessary
	// Reset start and end timestamps after pan/zoom
	resetInputFields = () => {
		let oldStartTimestamp = this.state.oldStartTimestamp;
		let oldEndTimestamp = this.state.oldEndTimestamp;
		
		this.setState({
			startTimestamp: oldStartTimestamp,
			endTimestamp: oldEndTimestamp
		});
	}
	
	render() {
		return ( 
			<div>
				<h3 id="header">sendh3lp's Room Temperature Monitoring Dashboard</h3>
				<TimeSeriesGraphContainer 
					minDate={this.state.minDate}
					maxDate={this.state.maxDate}
					startTimestamp={this.state.startTimestamp} 
					endTimestamp={this.state.endTimestamp}
					onChangeStartDate={this.updateStartDate} 
					onChangeStartTime={this.updateStartTime} 
					onChangeEndDate={this.updateEndDate} 
					onChangeEndTime={this.updateEndTime} 
					onZoom={this.updateInputFields}
					onReset={this.resetInputFields}
				/>
				<FloorplanView />
			</div>
		);
	}
}

export default App;