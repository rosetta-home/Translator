import { h, Component } from 'preact';
import { Card, Button,TextField } from 'preact-mdl';

export default class Touchstone extends Component {
	constructor(props) {
		super(props);
		this.formdata = {'name':''};
	}
	componentDidMount() {
		this.props.next(false);
	}
  componentWillUnmount() {}
	submit = () => {
		//this.props.updateTouchstone({'id':this.props.id,'name':this.formdata.name}).then(v => {
			this.props.next(true);
    //});
	}
	// Tracks the change in the current touchstone name
	onChange(event) {
		this.formdata['name'] = event.target.value;
  }
	render() {
		return (
      <div>
				<h6>Find the blinking touchstone and please enter this locaiton.</h6>
				<h6>ID {this.props.id}</h6>
				<div className="row" style="margin-top:5px;margin-right:10px;margin-left:10px;">
					<div className="col-12 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
						<br></br>
						<TextField name="name" placeholder="Touchstone Name" onChange={this.onChange.bind(this)}></TextField>
						<div style="width:100%;text-align:end;">
						<Button onClick={this.submit}>Save</Button>
					</div>
					</div>
				</div>
      </div>
    );
	}
}
