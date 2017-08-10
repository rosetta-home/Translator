import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';

import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { bindActionCreators } from 'redux';
import React from 'preact';
import d3 from 'd3';
import nv from 'nvd3';

import Collapsible from 'react-collapsible';
import RHLiveGraph from '../elements/LiveGraph';
import SparkGraphLive from '../elements/SparkGraphLive';
import Authentication from '../../service/authservice';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import DRes from '../../service/dres';

class DashboardCard extends Component {
  constructor(props){ super(props); }
  /* Component lifecyle function */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render () {
    return (
      <div>
      <Card shadow={4} style="width:100%">
        <Card.Title>
        <Card.TitleText><small>Outdoor Temperature</small></Card.TitleText>
        </Card.Title>
        <div className="row">
        <div className="col-4">
        <div className="center-div">
        <label className="readingLabel">75°C</label>
        </div>
        </div>
        <div className="col-8">
        <SparkGraphLive/>
        </div>
        </div>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
        <Card.Actions style="text-align:right">
        </Card.Actions>
        </Card>
        <br></br>
      </div>
    );
  }
}
export default DashboardCard;
