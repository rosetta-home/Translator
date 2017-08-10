import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from '../../service/reactbroadcast';
import d3 from 'd3';
import { route } from 'preact-router';

import CustomSelector from '../elements/Selector';

export default class Now extends Component {
	constructor(props) {
		super(props);
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
			.attr("stroke-width","0px")
			.attr("fill", "white")
			.on("click", function(d) {
				route('/now/' + d.datapoint);
			});

		elemEnter.append("text")
			.attr("dy", function(d){return 6})
			.style("text-anchor", "middle")
			.style("font-weight", "lighter")
			.style("font-size", "24px")
			.text(function(d){
				return d.label
			});

		/*var circlesTransition = d3.selectAll("circle")
	   .transition()
	   .duration(5000)
	   .attr("cy", "0")
	   .attrTween('cx', function (d, i, a) {
	        return function (t) {
	          // Add salt, pepper and constants as per your taste
	          return a + (Math.random() - 0.5) * 10;
	        };
	    });*/

		ReactBroadcast.broadcast('SetTitle', 'Now');
	}
	render() {
		return (
			<div>
			<div id="now">
			</div>
			</div> );
	}
}
