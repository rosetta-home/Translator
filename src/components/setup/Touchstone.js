import { h, Component } from 'preact';
import { Card, Button,TextField } from 'preact-mdl';

export default class Touchstone extends Component {
	constructor(props) {
		super(props);
		this.formdata = {'name':''};
		this.state = { enter: true, saved:false, name:null };
		this.props.next(true);
	}
	componentDidMount() { }
	componentWillReceiveProps(nextProps) {
  	this.setState({enter:false,saved:false});
		this.props.updateTouchstone({'touchstone_id':nextProps.id}).then(v => {
			this.setState({enter:true});
    });
	}
	save = () => {
		this.props.saveTouchstone(this.props.id,this.formdata['name']).then(v => {
			console.log(v);
			console.log("Saved!");
			this.setState({saved:true});
    });
	}
	onChange(event) {
		this.formdata['name'] = event.target.value;
  }
	render() {
		const { enter,saved,name } = this.state;
		return (
      <div>
				{enter === false &&
					<h6>Find the blinking touchstone, you will be asked to name it in a few moments.</h6>
				}
				{saved === true &&
					<h6 style="color:green;">Saved!</h6>
				}
				<div className="row" style="margin-top:5px;margin-right:10px;margin-left:10px;">
					<div className="col-12 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
						<br></br>
						{enter === true &&
							<div>
							<h6>Please enter name of locaiton for the touchstone then tap 'Next'.</h6>
							<TextField name="name" placeholder="Touchstone Name" onChange={this.onChange.bind(this)}></TextField>
							<div style="width:100%;text-align:center;">
							<button onClick={this.save}>Save</button>
							</div>
							</div>
						}
					</div>
				</div>
      </div>
    );
	}
}
