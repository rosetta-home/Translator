import { h, Component } from 'preact';
import { Card, Button,TextField } from 'preact-mdl';

export default class Touchstone extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.next(false);
		console.log(this.props);
	}
  componentWillUnmount() {

	}
	submit = () => {
		this.props.updateTouchstone({'id':this.props.id}).then(v => {
			console.log(v);
			this.props.next(true);
    });
	}
	render() {
		return (
      <div>
			<h6>Find the blinking touchstone and please enter this locaiton.</h6>
			<h6>ID {this.props.id}</h6>
			<div className="row" style="margin-top:5px;margin-right:10px;margin-left:10px;">
				<div className="col-12 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
				<br></br>
				<TextField name="name" placeholder="Touchstone Name"></TextField>
				<div style="width:100%;text-align:end;">
				<Button onClick={this.submit}>Save</Button>
				</div>
				</div>
			</div>
      </div>
    );
	}
}
