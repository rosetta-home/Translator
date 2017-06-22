import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';

import { Button } from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';

@connect(reduce, bindActions(actions))
export default class App extends Component {




	load() {
		var x = Math.floor((Math.random() * 300) + 1);
		var datum = [{
	          key: "Cumulative Return",
	          values: [
	            {
	              "label" : "A" ,
	              "value" : x
	            } ,
	            {
	              "label" : "B" ,
	              "value" : 0
	            } ,
	            {
	              "label" : "C" ,
	              "value" : 32.807804682612
	            } ,
	            {
	              "label" : "D" ,
	              "value" : 196.45946739256
	            } ,
	            {
	              "label" : "E" ,
	              "value" : 0.19434030906893
	            } ,
	            {
	              "label" : "F" ,
	              "value" : -98.079782601442
	            } ,
	            {
	              "label" : "G" ,
	              "value" : -13.925743130903
	            } ,
	            {
	              "label" : "H" ,
	              "value" : -5.1387322875705
	            }
	          ]
	        }
	      ];
		ReactDOM.render(
        <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x="label" y="value"/>,
        document.getElementById('barChart')
      );
	}

	removeTodo = (todo) => {
		this.props.removeTodo(todo);
	};

	updateText = (e) => {
		this.setState({ text: e.target.value });
	};

	render({ todos }, { text }) {
		return (
			<div id="app">
				<h1>Rosetta Home</h1>
				<Button onClick={this.load}>Load</Button>
				<div id="barChart"></div>
			</div>
		);
	}
}
