import { h, Component } from 'preact';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';

export default class CheckList extends Component {
	constructor(props) {
		super(props);
		this.list = [
		    {'name':'Statement #1',checked:false},{'name':'Statement #2',checked:false},
				{'name':'Statement #3',checked:false},{'name':'Statement #4',checked:false},
				{'name':'Statement #5',checked:false},{'name':'Statement #6',checked:false}
		];
	}
	componentDidMount() { }
	componentWillReceiveProps(nextProps) { }
	done = () => {
		this.props.next(true);
		this.props.getTouchstones();
	}
	checked = (element) => {
		//console.log(this.list[element.target.id] );
		this.list[element.target.id].checked = true;
		var done = true;
		for (var i = 0; i < this.list.length; i++) {
			 done = this.list[i].checked;
		}
		if (done) {
			this.props.next(true);
			this.props.getTouchstones();
		}
	}
	render() {
		var checklist = [];
		for (var i = 0; i < this.list.length; i++) {
			checklist.push(<div style="padding: 10px;"><input type="checkbox" id={i} onClick={this.checked}></input><label for={i}>{this.list[i].name}</label></div>);
		}
		return (
      <div>
        <p style="color:black;margin:0px;">Here are a few things you need to check off to insure a proper setup of your Rosetta Home.</p>
				<div style="text-align:left;padding:10px;">
					{ checklist }
				</div>
      </div>
    );
	}
}
