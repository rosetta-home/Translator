import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 20,
      'z-index':10,
      'padding-top':20,
      'overflow': 'scroll'
    };
    const modalStyle = {
      backgroundColor: '#fff',
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto'
    };
    const buttonstyle = {
      'font-size':'25px',
      'color':'gray'
    };
    return (
      <div className="backdrop" style={backdropStyle}>
        {/*<div style={modalStyle}>
          <div style="text-align: right;">
            <button onClick={this.props.onClose} style={buttonstyle}>✖</button>
          </div>
          {this.props.children}
        </div>*/}
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
