import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import { shapes as modalShapes } from 'ducks/components/modal';

const modalAnimationTime = 300;

class Modal extends PureComponent {
  static propTypes = {
    modalId: PropTypes.string.isRequired,
    modalComponentIm: modalShapes.state.isRequired,
    children: PropTypes.element.isRequired,
  };

  // Анимация при закрытии модального окна.
  // Вешаем класс анимации, откладываем удаление компонента из DOM
  static beforeClose(node, removeFromDom) {
    const wrapper = node.getElementsByClassName('js-wrapper')[0];

    wrapper.className += ' modal__wrapper_close';

    setTimeout(removeFromDom, modalAnimationTime);
  }

  render() {
    const {
      modalId,
      children,
      modalComponentIm,
    } = this.props;
    const activeModalIm = modalComponentIm.last();
    const isOpened = (activeModalIm !== undefined) && (activeModalIm.get('id') === modalId);

    return (
      <Portal isOpened={isOpened} beforeClose={this.beforeClose}>
        <div className="modal__layout">
          <div className="js-wrapper modal__wrapper">
            {children}
          </div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
