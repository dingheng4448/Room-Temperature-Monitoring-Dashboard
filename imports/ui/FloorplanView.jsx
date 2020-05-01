import React from 'react';
import './FloorplanView.css';
import Corridor from './Corridor.jsx';
import Room from './Room.jsx';

class FloorplanView extends React.Component {	
	constructor(props) {
		super(props);

		this.state = {
			isSelectedMap : this.props.isSelectedMap,
			tempValues : this.props.tempValues,
		};
		
		
	}

	// set the state of room selected ON/OFF upon click
	handleRoomClicks = (event, roomNum) => {
		var tempMap = this.state.isSelectedMap; 
		tempMap.set(roomNum, tempMap.get(roomNum) ? false : true);

		this.setState({isSelectedMap: tempMap});
	}

	findRoomColours = (tempValues) => {
		var sortedTemp = new Map([...tempValues.entries()].sort((a,b) => a[1] - b[1]));
		var tempColours = ["#01365F", "#01579B", "#0288D1", "#4FC3F7", "#6BC8FA", "#B3E5FC", "#BEEBFF"];
		
		let index = 0;
		for(let [key,value] of sortedTemp ) {
			sortedTemp.set(key, tempColours[index]);
			index++;
		}
		return sortedTemp;
		

	}

	render() { 	

		var roomColours = this.findRoomColours(this.state.tempValues);

		return ( 
			// might wanna consider writing a loop here if time permit
			<div className="floorplan">
				<Room 
				roomNum={0}
				colour={(this.props.tempDashboardState.room0.toString() == 'selected') ? roomColours.get('r0') : "#ffffff"} 
				// colour={this.state.isSelectedMap.get('r0') ? roomColours.get('r0') : "#ffffff"}
				onClick={(event) => this.props.onRoomClick(event, 'room0')}/>
				<Corridor name={""}/>
				<Corridor name={"floorplan"}/>
				<Room roomNum={1}
				colour={this.state.isSelectedMap.get('r1') ? roomColours.get('r1') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r1')}/>
				<Room roomNum={2} 
				colour={this.state.isSelectedMap.get('r2') ? roomColours.get('r2') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r2')}/>
				<Room roomNum={3} 
				colour={this.state.isSelectedMap.get('r3') ? roomColours.get('r3') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r3')}/>
				<Room roomNum={4} 
				colour={this.state.isSelectedMap.get('r4') ? roomColours.get('r4') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r4')}/>
				<Room roomNum={5} 
				colour={this.state.isSelectedMap.get('r5') ? roomColours.get('r5') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r5')}/>
				<Room roomNum={6} 
				colour={this.state.isSelectedMap.get('r6') ? roomColours.get('r6') : "#ffffff"}
				onClick={(event) => this.handleRoomClicks(event, 'r6')}/>	
			</div>
		);
	}
}

export default FloorplanView;