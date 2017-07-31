import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 20,
      'z-index':10,
      'padding-top':80
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div style={modalStyle}>
          <div style="text-align: right;">
            <button onClick={this.props.onClose} style="font-size:25px;color:gray;">✖</button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
