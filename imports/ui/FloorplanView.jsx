import React from 'react';
import './FloorplanView.css';
import Corridor from './Corridor.jsx';
import Room from './Room.jsx';

class FloorplanView extends React.Component {	
	constructor(props) {
		super(props);

		
		
		// E1F5FE, #B3E5FC, 81D4FA #4FC3F7, #03A9F4, 0288D1, 01579B
		
	}



	render() { 	
		var tempValues = new Map();
		tempValues.set('r0', 80);
		tempValues.set('r1', 93);
		tempValues.set('r2', 8);
		tempValues.set('r3', 16);	
		tempValues.set('r4', 3);
		tempValues.set('r5', 56);
		tempValues.set('r6', 57);
		
		var sortedTemp = new Map([...tempValues.entries()].sort((a,b) => a[1] - b[1]));
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
				<Room className="room" roomNum={0} colour={sortedTemp.get('r0')}/>
				<Corridor className="corridor" name={""}/>
				<Corridor className="corridor" name={"floorplan"}/>
				<Room className="room" roomNum={1} colour={sortedTemp.get('r1')}/>
				<Room className="room" roomNum={2} colour={sortedTemp.get('r2')}/>
				<Room className="room" roomNum={3} colour={sortedTemp.get('r3')}/>
				<Room className="room" roomNum={4} colour={sortedTemp.get('r4')}/>
				<Room className="room" roomNum={5} colour={sortedTemp.get('r5')}/>
				<Room className="room" roomNum={6} colour={sortedTemp.get('r6')}/>

				
			</div>
		);
	}
}

export default FloorplanView;