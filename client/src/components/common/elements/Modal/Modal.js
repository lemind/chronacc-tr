import React from 'react'
import ReactModal from 'react-modal'

import { isFunction } from 'helpers/misc'

const REACT_MODAL_STYLES = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  content : {
    top          : '50%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    padding      : '0',
    transform    : 'translate(-50%, -50%)',
    maxWidth     : '1377px',
    width        : 'auto',
    maxHeight    : '90%'
  }
}

export default class Modal extends React.Component {
  componentWillMount(){
    ReactModal.setAppElement('#app')
  }

  closeModal(e){
    const { onClose } = this.props;
    isFunction(onClose) && onClose()
  }

  render() {
    const { children, onClose, ...rest } = this.props;

    return (
      <ReactModal
        style={ REACT_MODAL_STYLES }
        onRequestClose={ onClose }
        isOpen={ true }
        { ...rest }
      >
        <div>
          <button onClick={ (e) => this.closeModal(e) }>close</button>
        </div>
        { children }
      </ReactModal>
    );
  }
}
