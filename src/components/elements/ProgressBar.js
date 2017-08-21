import { h, Component } from 'preact';
import PropTypes from 'prop-types';

class Progress extends Component {
  // Props type for the componet to insure number are in use.
   static propTypes = {
    completed: ((props, propName) => {
      if (typeof props[propName] !== 'number')
        return Progress.throwError('Invalid Props: "completed" should ∈ ℝ ');
      if( props[propName] < 0 || props[propName] > 100) {
        return Progress.throwError('Invalid Props: "completed" should be between 0 and 100' );
      }
    }),
    color: PropTypes.string,
    animation: PropTypes.number,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }
  // Default styling for the process bar.
  static defaultProps = {
    completed: 0,
    color: '#32b93b',
    animation: 200,
    height: 10
  }
  // Will throw the error with the arguments
  static throwError() {   return new Error(...arguments); }
  // Renders the component
  render () {
    // Gets the parameters from the props
    const {color, completed, animation, height, className, children, ...rest} = this.props;
    // The style for the div
    const style = {
      backgroundColor: color, width: completed + '%',
      transition: `width ${animation}ms`, height: height,
      'box-shadow': '0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2)'
    };
    // Renders the componenet
    return (
      <div className={className || "progressbar-container"} {...rest}>
        <div className="progressbar-progress" style={style}>{children}</div>
      </div>
    );
  }
}
export default Progress;
