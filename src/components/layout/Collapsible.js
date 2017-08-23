import { h, Component } from 'preact';
import React from 'preact-compat';
import PropTypes from 'prop-types';

class Collapsible extends Component {
  constructor(props) {
    super(props)
    // Will set the state based on the props at mount
    if (this.props.open) {
      this.state = {
        isClosed: false,
        shouldSwitchAutoOnNextCycle: false,
        height: 'auto',
        transition: 'none',
        hasBeenOpened: true,
        overflow: this.props.overflowWhenOpen,
        inTransition: false,
      }
    } else {
      this.state = {
        isClosed: true,
        shouldSwitchAutoOnNextCycle: false,
        height: 0,
        transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
        hasBeenOpened: false,
        overflow: 'hidden',
        inTransition: false,
      }
    }
  }
  // When update will compare the states
  componentDidUpdate(prevProps, prevState) {
    if(this.state.shouldOpenOnNextCycle){
      this.continueOpenCollapsible();
    }
    if (prevState.height === 'auto' && this.state.shouldSwitchAutoOnNextCycle === true) {
      window.setTimeout(() => {
        this.setState({
          height: 0,
          overflow: 'hidden',
          isClosed: true,
          shouldSwitchAutoOnNextCycle: false,
        });
      }, 50);
    }
    if (prevProps.open !== this.props.open) {
      if(this.props.open === true) {
        this.openCollapsible();
      } else {
        this.closeCollapsible();
      }
    }
  }
  // Will close the collapsible when triggered
  closeCollapsible() {
    this.setState({
      shouldSwitchAutoOnNextCycle: true,
      height: this.inner.offsetHeight,
      transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
      inTransition: true,
    });
  }
  // Will open the collapsible when triggered
  openCollapsible() {
    this.setState({
      inTransition: true,
      shouldOpenOnNextCycle: true,
    });
  }
  continueOpenCollapsible = () => {
    this.setState({
      height: this.inner.offsetHeight,
      transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
      isClosed: false,
      hasBeenOpened: true,
      inTransition: true,
      shouldOpenOnNextCycle: false,
    });
  }
  handleTriggerClick = (event) => {
    event.preventDefault();
    if (this.props.triggerDisabled) { return }
    if (this.props.handleTriggerClick) {
      this.props.handleTriggerClick(this.props.accordionPosition);
    } else {
      if (this.state.isClosed === true) {
        this.openCollapsible();
      } else {
        this.closeCollapsible();
      }
    }
  }
  renderNonClickableTriggerElement() {
    if (this.props.triggerSibling && typeof this.props.triggerSibling === 'string') {
      return (
        <span className={`${this.props.classParentString}__trigger-sibling`}>{this.props.triggerSibling}</span>
      )
    } else if(this.props.triggerSibling) {
      return <this.props.triggerSibling />
    }
    return null;
  }
  handleTransitionEnd = () => {
    if (!this.state.isClosed) {
      this.setState({ height: 'auto', inTransition: false });
    } else {
      this.setState({ inTransition: false });
    }
  }
  initializeOutRef = (ref) => {
    if (!ref) { return; }
    this.outer = ref;
  }

  initializeInRef = (ref) => {
    if (!ref) { return; }
    this.inner = ref;
  }
  render() {
    var dropdownStyle = {
      height: this.state.height,
      WebkitTransition: this.state.transition,
      msTransition: this.state.transition,
      transition: this.state.transition,
      overflow: this.state.overflow,
    }
    // Gets the trigger title and the children in the component.
    var trigger = (this.state.isClosed === false) && (this.props.triggerWhenOpen !== undefined) ? this.props.triggerWhenOpen: this.props.trigger;
    var children = (this.state.isClosed && !this.state.inTransition) ? null : this.props.children;
    // Render the component.
    return(
      <div style="padding: 10px;text-align:left;">
        <div style="box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);">
        <div style="background-color:#eceeef;padding: 5px;">
          <span style="font-size:small;font-weight: 100;" onClick={this.handleTriggerClick}>
            {trigger}
          </span>
        </div>
        {this.renderNonClickableTriggerElement()}
        <div ref={ref => this.initializeOutRef(ref)} style={dropdownStyle} onTransitionEnd={this.handleTransitionEnd}>
          <div ref={ref => this.initializeInRef(ref)}>
            {children}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Collapsible;
