import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';



class DemoChart extends Component {
  constructor(props){
    super(props);
  }


 	componentDidMount() {

    console.log(this);

  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }

	render () {
    //const divNode = new ReactFauxDOM.Element('div');
    //return divNode.toReact();
    return (<div></div>);
  }
}
export default DemoChart;
