/*
* Данный компонент должен быть отрисован лишь один раз,
* где-нибудь в верхнем уровне DOM приложения
* */

import React from 'react';
import { shapes as modalShapes } from 'ducks/components/modal';
import Portal from 'react-portal';
import cn from 'classnames';

// Защита от анимации закрытия еще неоткрытого окна
let isModalBackgroundWasOpened = false;

// Отображается только при наличии активных модальных окон
const ModalBackground = ({ modalComponentIm }) => {
  const hasModals = modalComponentIm.size > 0;
  const className = cn(
    'modal__background',
    { modal__background_visible: hasModals },
    { modal__background_hide: !hasModals && isModalBackgroundWasOpened },
  );

  isModalBackgroundWasOpened = hasModals;

  // Убираем прокрутку у body на время открытия модального окна
  // Это можно сделать через класс (если у body будет таковой)
  document.body.style.overflowY = hasModals ? 'hidden' : '';

  return (
    <Portal isOpened>
      <div className={className} />
    </Portal>
  );
};

ModalBackground.propTypes = {
  modalComponentIm: modalShapes.state.isRequired,
};

export default ModalBackground;
