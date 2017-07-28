import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

class Modal extends Component {
    constructor () {
        super();

        this.state = {
            isVisible: false
        };
    }
    componentDidMount () {
        if (this.state.isVisible) {
            this.show();
        }
    }
    show () {
        this.state.isVisible = true;
        this.dialog.showModal();
    }
    hide () {
        this.state.isVisible = false;
        this.dialog.close();
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible !== this.state.isVisible) {
            this.state.isVisible = nextProps.visible;

            if (this.state.isVisible) {
                this.show();
            } else {
                this.hide();
            }
        }
    }
    render () {
        this.state.isVisible = this.props.visible;

        return (
            <dialog className="dialog" ref={(ref) => this.dialog = ref}>
                {this.props.children}
            </dialog>
        );
    }
};

export default Modal;
