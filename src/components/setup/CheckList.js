import { h, Component } from 'preact';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';

export default class CheckList extends Component {
	constructor(props) {
		super(props);
		this.list = [
		    {'name':'Is the Hub and Touchstones all plugged in?',checked:false},
				{'name':'Is the Rosetta Home Hub connected to the Internet?',checked:false},
				{'name':'Another interesting question?',checked:false},
				{'name':'The final interesting question?',checked:false}
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
		if (this.list[element.target.id].checked) {
			this.list[element.target.id].checked = false;
		} else {
			this.list[element.target.id].checked = true;
		}

		var haveFalse = false;
		for (var i = 0; i < this.list.length; i++) {
			 if (this.list[i].checked === false) {
				 haveFalse = true
			 }
		}
		if (haveFalse) {
			//this.props.next(false);
		} else {
			//this.props.next(true);
		}
	}
	render() {
		var checklist = [];
		for (var i = 0; i < this.list.length; i++) {
			checklist.push(<div style="padding: 10px;"><input type="checkbox" id={i} onClick={this.checked}></input><label for={i}><small>{this.list[i].name}</small></label></div>);
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
