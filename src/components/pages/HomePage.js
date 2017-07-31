import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from "ReactBroadcast";
import d3 from 'd3';

export default class HomePage extends Component {
	constructor() {
		super();
  }
	componentDidMount() {
		console.log("Mounted");

		var svg = d3.select("#now").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)

		var json = {"nodes":[
  		{"x":80,"y":600, "r":40, "label":"Node 1"},
  		{"x":200,"y":300, "r":60, "label":"Node 2"},
  		{"x":280,"y":150, "r":60, "label":"Node 3"}
		]};


    var elem = svg.selectAll("g myCircleText")
        .data(json.nodes)
    var elemEnter = elem.enter()
	    .append("g")
	    .attr("transform", function(d){return "translate("+d.x+","+ d.y +")"})
    var circle = elemEnter.append("circle")
	    .attr("r", function(d){return d.r} )
	    .attr("stroke","white")
	    .attr("fill", "white")
    elemEnter.append("text")
	    .attr("dx", function(d){return -20})
	    .text(function(d){return d.label})


		ReactBroadcast.broadcast('SetTitle', 'Rosetta Home');
	}
	render() {
		console.log("Rendered")
		return (
			<div>

			<div id="now">

			</div>

			</div>
		);
	}
}
