import React from 'react';
import TimeSeriesGraphContainer from './TimeSeriesGraphContainer.jsx';
import FloorplanView from './FloorplanView.jsx';

class App extends React.Component {	
	constructor(props){
		super(props);	
	
		this.defaultStartString = "2013-10-02T05:00:00";
		this.defaultEndString = "2013-10-03T00:00:00";
		this.defaultMinDate = "2013-10-02";
		this.defaultMaxDate = "2013-12-03";
		
		this.state = {
			minDate: this.defaultMinDate,
			maxDate: this.defaultMaxDate,
			inputStartString: this.defaultStartString,
			inputEndString: this.defaultEndString,
			dataStartString: this.defaultStartString,
			dataEndString: this.defaultEndString
		}; 
	}
	
	// Update inputStartString upon changes in start date input
	updateStartDate = e => {
		let time = this.state.inputStartString.split("T")[1];
		let newInputStartString = e.target.value + "T" + time;
		
		let dataStartDate = new Date(this.state.dataStartString);
		let dataEndDate = new Date(this.state.dataEndString);
		let newStartDate = new Date(newInputStartString);
		
		if (newStartDate < dataStartDate || newStartDate > dataEndDate) {
			this.setState({
				dataStartString: newInputStartString,
				inputStartString: newInputStartString
			});
		} else {
			this.setState({
				inputStartString: newInputStartString
			});
		}
	}
	
	// Update inputStartString upon changes in start time input
	updateStartTime = e => {
		let date = this.state.inputStartString.split("T")[0];
		let newInputStartString = date + "T" + e.target.value + ":00";
		
		let dataStartDate = new Date(this.state.dataStartString);
		let dataEndDate = new Date(this.state.dataEndString);
		let newStartDate = new Date(newInputStartString);
		
		if (newStartDate < dataStartDate || newStartDate > dataEndDate) {
			this.setState({
				dataStartString: newInputStartString,
				inputStartString: newInputStartString
			});
		} else {
			this.setState({
				inputStartString: newInputStartString
			});
		}
	}
	
	// Update inputEndString upon changes in end date input
	updateEndDate = e => {
		let time = this.state.inputEndString.split("T")[1];
		let newInputEndString = e.target.value + "T" + time;
		
		let dataStartDate = new Date(this.state.dataStartString);
		let dataEndDate = new Date(this.state.dataEndString);
		let newEndDate = new Date(newInputEndString);
		
		if (newEndDate < dataStartDate || newEndDate > dataEndDate) {
			this.setState({
				dataEndString: newInputEndString,
				inputEndString: newInputEndString
			});
		} else {
			this.setState({
				inputEndString: newInputEndString
			});
		}
	}
	
	// Update inputEndString upon changes in end time input
	updateEndTime = e => {
		let date = this.state.inputEndString.split("T")[0];
		let newInputEndString = date + "T" + e.target.value + ":00";
		
		let dataStartDate = new Date(this.state.dataStartString);
		let dataEndDate = new Date(this.state.dataEndString);
		let newEndDate = new Date(newInputEndString);
		
		if (newEndDate < dataStartDate || newEndDate > dataEndDate) {
			this.setState({
				dataEndString: newInputEndString,
				inputEndString: newInputEndString
			});
		} else {
			this.setState({
				inputEndString: newInputEndString
			});
		}
	}
	
	// Update start and end input strings upon pan/zoom
	updateInputFields = (minX, maxX) => {
		let timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
		let newInputStartString = (new Date(minX - timezoneOffset)).toISOString().slice(0, -8);
		let newInputEndString = (new Date(maxX - timezoneOffset)).toISOString().slice(0, -8);
		
		let defaultStartDate = new Date(this.defaultStartString);
		let dataStartDate = new Date(this.state.dataStartString);
		let dataEndDate = new Date(this.state.dataEndString);
		let newStartDate = new Date(newInputStartString);
		let newEndDate = new Date(newInputEndString);
		
		if (newStartDate < defaultStartDate) {
			newInputStartString = this.defaultStartString;
			newStartDate = new Date(newInputStartString);
		}
		
		if (newStartDate < dataStartDate || newStartDate > dataEndDate) {
			this.setState({
				dataStartString: newInputStartString,
				inputStartString: newInputStartString,
				inputEndString: newInputEndString
			});
		} else if (newEndDate < dataStartDate || newEndDate > dataEndDate) {
			this.setState({
				dataEndString: newInputEndString,
				inputStartString: newInputStartString,
				inputEndString: newInputEndString
			});
		} else {
			this.setState({
				inputStartString: newInputStartString,
				inputEndString: newInputEndString
			});
		}
	}
	
	render() {
		return ( 
			<div>
				<h3 id="header">sendh3lp's Room Temperature Monitoring Dashboard</h3>
				<TimeSeriesGraphContainer 
					minDate={this.state.minDate}
					maxDate={this.state.maxDate}
					inputStartString={this.state.inputStartString} 
					inputEndString={this.state.inputEndString}
					dataStartString={this.state.dataStartString} 
					dataEndString={this.state.dataEndString}
					onChangeStartDate={this.updateStartDate} 
					onChangeStartTime={this.updateStartTime} 
					onChangeEndDate={this.updateEndDate} 
					onChangeEndTime={this.updateEndTime} 
					onPanZoom={this.updateInputFields}
				/>
				<FloorplanView />
			</div>
		);
	}
}

export default App;