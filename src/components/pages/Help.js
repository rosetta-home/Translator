import { h, Component } from 'preact';
import ReactBroadcast from '../../service/reactbroadcast';
import Collapsible from '../layout/Collapsible';
import { Card, Button, TextField } from 'preact-mdl';

export default class Help extends Component {
  constructor(props) {
    super();
    var questions = [
      {question:'',answer:''},
      {question:'',answer:''},
      {question:'',answer:''},
      {question:'',answer:''}
    ];
  }
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Help');
	}
	render() {
		return (
      <div>
			<div className="page_outline">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Q&A</Card.Title>



        <Collapsible lazyRender transitionTime={600} trigger="What does it mean if my touchstones are blinking red?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>
        <Collapsible lazyRender transitionTime={600} trigger="How do I reset my kit for a move?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>
        <Collapsible lazyRender transitionTime={600} trigger="What does it mean if my touchstones are blinking red?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>
        <Collapsible lazyRender transitionTime={600} trigger="How do I reset my kit for a move?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>
        <Collapsible lazyRender transitionTime={600} trigger="What does it mean if my touchstones are blinking red?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>
        <Collapsible lazyRender transitionTime={600} trigger="How do I reset my kit for a move?" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} overflowWhenOpen="visible">
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          <p style="color:black;padding:5px;margin: 0;">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </Collapsible>


			</Card>
		  </div>
      </div>
    );
	}

}
