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

type TProps = {
  onClose(): void,
  isOpen?: boolean,
  children: JSX.Element | JSX.Element[],
  title?: string,
}

import './modal.less'

export default class Modal extends React.Component<TProps> {
  componentWillMount(): void {
    ReactModal.setAppElement('#app')
  }

  closeModal = (): void => {
    const { onClose } = this.props;
    isFunction(onClose) && onClose()
  }

  render() {
    const { children, onClose, title, ...rest } = this.props;

    return (
      <ReactModal
        style={ REACT_MODAL_STYLES }
        onRequestClose={ onClose }
        isOpen={ true }
        { ...rest }
      >
        <div className="modalBody">
          <div className="modalTitle">{ title }</div>
          <div>
            <button
              className="modalClose"
              onClick={ this.closeModal }
            >x</button>
          </div>
          { children }
        </div>
      </ReactModal>
    );
  }
}
