import { h, Component } from 'preact';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';

export default class CheckList extends Component {
	render() {
		return (
      <div>

                <p style="color:black;margin:0px;">Here are a few things you need to check off to insure a proper setup of your Rosetta Home.</p>
                <div style="text-align:left;padding:10px;">

                <div style="padding: 10px;">
                <input type="checkbox" id="s1"></input>
                <label for="s1">Statement #1</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s2"></input>
                <label for="s2">Statement #2</label>
                </div>


                <div style="padding: 10px;">
                <input type="checkbox" id="s3"></input>
                <label for="s3">Statement #3</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s4"></input>
                <label for="s4">Statement #4</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s5"></input>
                <label for="s5">Statement #5</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s6"></input>
                <label for="s6">Statement #6</label>
                </div>


                </div>
      </div>
    );
	}
}
