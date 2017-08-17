import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import React from 'preact-compat';
import { Card, Button, Grid,Cell } from 'preact-mdl';

export default class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: false,
      showDoneBtn: false,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length)
    };
    this.hidden = {
      display: 'none'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i=0; i<length; i++) {
      if(i < indx) {
        styles.push('done')
      }
      else if(i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  checkNavState(currentStep){
    if(currentStep > 0 && currentStep < this.props.steps.length - 1){
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false,
        showDoneBtn: false
      })
    }
    else if(currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true,
        showDoneBtn: false
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false,
        showDoneBtn: true
      })
    }
  }

  setNavState(next) {
    this.setState({navState: this.getNavStates(next, this.props.steps.length)})
    if (next < this.props.steps.length) {
      this.setState({compState: next})
    }
    this.checkNavState(next);
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick(evt) {
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next() {
    var cc = this.props.steps[this.state.compState].component;
    this.setNavState(this.state.compState + 1)
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
    var size = 100 / this.props.steps.length;
    var syt = "width:" + Math.round(size) + "%;";
    return this.props.steps.map((s, i)=> (
      <li style={syt} className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i+1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  enableNext = (status) => {
    this.setState({showNextBtn:status});
  }
  enablePrevious = (status) => {
    this.setState({showPreviousBtn:status});
  }


  render() {
    console.log(this.state);
    var step = this.props.steps[this.state.compState].component;
    step.attributes['next'] = this.enableNext;
    step.attributes['previous'] = this.enablePrevious;
    step.attributes['done'] = this.enablePrevious;
    return (
      <div onKeyDown={this.handleKeyDown}>
        <ol className="progtrckr">
          {this.renderSteps()}
        </ol>
        {step}
        <div style={this.props.showNavigation ? {} : this.hidden}>
          <div className="row" style="margin-right:0px;margin-left:0px;">
          <div className="col-4 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
          <Button style={this.state.showPreviousBtn ? {} : this.hidden}
                  onClick={this.previous}>Previous</Button>
          </div>
          <div className="col-4 full">
          </div>
          <div className="col-4 full" style="padding-right: 5px;text-align: right;padding-top: 0px;padding-bottom: 0px;">
          <Button style={this.state.showNextBtn ? {} : this.hidden}
                  onClick={this.next}>Next</Button>

                  <Button style={this.state.showDoneBtn ? {} : this.hidden}
                          onClick={this.props.save}>Save</Button>
          </div>
          </div>



        </div>
      </div>
    );
  }
}

Wizard.defaultProps = {
  showNavigation: true
};
