import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';

export default class Done extends Component {
  constructor(props) {
		super(props);
	}
	render() {
		return (
      <div>
			<span>Well Done! Your Rosetta Home is all set up.</span>
			<br></br>
			<br></br>
			<div className="row" style="margin-top:5px;margin-right:10px;margin-left:10px;">
				<div className="col-12 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
				</div>
			</div>
      </div>
    );
	}
}
