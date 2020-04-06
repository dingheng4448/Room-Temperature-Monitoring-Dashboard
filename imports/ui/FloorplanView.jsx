import React from 'react';
import './FloorplanView.css';
import Corridor from './Corridor.jsx';
import Room from './Room.jsx';

class FloorplanView extends React.Component {	
	constructor(props) {
		super(props);

		this.state = {isR0Selected : true,
		isR1Selected: true,
		isR2Selected: true};
		
	}

	// probably find a nicer way to do this handle clicks
	handleR0Click = (event) => {
		this.setState({isR0Selected: this.state.isR0Selected ? false : true});
	}

	handleR1Click = (event) => {
		this.setState({isR1Selected: this.state.isR1Selected ? false : true});
	}

	handleR2Click = (event) => {
		this.setState({isR2Selected: this.state.isR2Selected ? false : true});
	}

	render() { 	
		// to be refactored out and passed from the main class
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
				<Room 
				roomNum={0} 
				colour={this.state.isR0Selected ? sortedTemp.get('r0') : "#ffffff"}
				onClick={this.handleR0Click}/>
				<Corridor name={""}/>
				<Corridor name={"floorplan"}/>
				<Room roomNum={1}
				colour={this.state.isR1Selected ? sortedTemp.get('r1') : "#ffffff"}
				onClick={this.handleR1Click}/>
				<Room roomNum={2} 
				colour={this.state.isR2Selected ? sortedTemp.get('r2') : "#ffffff"}
				onClick={this.handleR2Click}/>
				<Room roomNum={3} colour={sortedTemp.get('r3')}/>
				<Room roomNum={4} colour={sortedTemp.get('r4')}/>
				<Room roomNum={5} colour={sortedTemp.get('r5')}/>
				<Room roomNum={6} colour={sortedTemp.get('r6')}/>

				
			</div>
		);
	}
}

export default FloorplanView;