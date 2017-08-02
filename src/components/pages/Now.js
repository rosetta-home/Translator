import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from "ReactBroadcast";
import d3 from 'd3';
import { route } from 'preact-router';

import CustomSelector from '../elements/Selector';

export default class Now extends Component {
	constructor() {
		super();
  }
	componentDidMount() {
		var svg = d3.select("#now").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight)

		var json = {"nodes":[
  		{"x":80,"y":600, "r":40, "label":"Sound","datapoint":"ieq.sound"},
  		{"x":200,"y":300, "r":60, "label":"Pressure","datapoint":"ieq.pressure"},
  		{"x":280,"y":150, "r":60, "label":"CO2","datapoint":"ieq.co2"}
		]};

    var elem = svg.selectAll("g myCircleText").data(json.nodes)
    var elemEnter = elem.enter().append("g").attr("transform", function(d){return "translate("+d.x+","+ d.y +")"})

    var circle = elemEnter.append("circle")
		.attr("r", function(d){return d.r} )
		.attr("stroke","lightgray")
		.attr("stroke-width","3px")
		.attr("fill", "white")
		.on("click", function(d) {
    	console.log(d);
			route('/now/' + d.datapoint);
		});

		elemEnter.append("text").attr("dx", function(d){return -20}).text(function(d){return d.label})
		//elemEnter.append("text").attr("dx", function(d){return 0}).attr("dy", function(d){return 0}).text(function(d){return d.label})

		ReactBroadcast.broadcast('SetTitle', 'Now');
	}
	render() {
		console.log(this.props);
		return (
			<div>
			{/*<div style="width:100%;height:50px;">
			</div>*/}
			<div id="now">
			</div>
			</div> );
	}
}
