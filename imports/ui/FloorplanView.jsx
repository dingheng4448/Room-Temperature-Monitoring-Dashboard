import React from 'react';
import './FloorplanView.css';
import Corridor from './Corridor.jsx';
import Room from './Room.jsx';

class FloorplanView extends React.Component {	
	constructor(props) {
		super(props);

		this.state = {
			isSelectedMap : this.props.isSelectedMap,
			tempValues : this.props.tempValues};
		
	}

	// set the state of room selected ON/OFF upon click
	handleRoomClicks = (event, roomNum) => {
		var tempMap = this.state.isSelectedMap; 
		tempMap.set(roomNum, tempMap.get(roomNum) ? false : true);

		this.setState({isSelectedMap: tempMap});
	}

	render() { 	
		
		var sortedTemp = new Map([...this.state.tempValues.entries()].sort((a,b) => a[1] - b[1]));
		console.log(sortedTemp);
		console.log(sortedTemp.get('r0'));

		// var tempColours = ["#01579B", "#0288D1", "#03A9F4", "#4FC3F7", "#81D4FA", "#B3E5FC", "#E1F5FE"];
		var tempColours = ["#01365F", "#01579B", "#0288D1", "#4FC3F7", "#6BC8FA", "#B3E5FC", "#BEEBFF"];
		
		let index = 0;
		for(let [key,value] of sortedTemp ) {
			console.log("current key is : " + key);
			sortedTemp.set(key, tempColours[index]);
			index++;
		}
		console.log(sortedTemp);
		console.log(sortedTemp.get('r0'));
		return ( 
			
			<div className="floorplan">
				<Room 
				roomNum={0} 
				colour={this.state.isSelectedMap.get('r0') ? sortedTemp.get('r0') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r0')}/>
				<Corridor name={""}/>
				<Corridor name={"floorplan"}/>
				<Room roomNum={1}
				colour={this.state.isSelectedMap.get('r1') ? sortedTemp.get('r1') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r1')}/>
				<Room roomNum={2} 
				colour={this.state.isSelectedMap.get('r2') ? sortedTemp.get('r2') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r2')}/>
				<Room roomNum={3} 
				colour={this.state.isSelectedMap.get('r3') ? sortedTemp.get('r3') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r3')}/>
				<Room roomNum={4} 
				colour={this.state.isSelectedMap.get('r4') ? sortedTemp.get('r4') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r4')}/>
				<Room roomNum={5} 
				colour={this.state.isSelectedMap.get('r5') ? sortedTemp.get('r5') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r5')}/>
				<Room roomNum={6} 
				colour={this.state.isSelectedMap.get('r6') ? sortedTemp.get('r6') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r6')}/>	
			</div>
		);
	}
}

export default FloorplanView;