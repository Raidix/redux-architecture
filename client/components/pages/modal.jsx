import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'containers/modal/modal';

/*
* First step
* */

const FirstStep = ({
  changeDelta,
  closeActiveDelta,
}) => (
  <div>
    <button onClick={closeActiveDelta}>close</button>
    <h3>First step</h3>

    <button onClick={() => changeDelta({ id: 'second_step' })}>Next</button>
  </div>
);

FirstStep.propTypes = {
  changeDelta: PropTypes.func.isRequired,
  closeActiveDelta: PropTypes.func.isRequired,
};

/*
* Second step
* */

class SecondStep extends PureComponent {
  static propTypes = {
    changeDelta: PropTypes.func.isRequired,
    showDelta: PropTypes.func.isRequired,
    closeActiveDelta: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { isDisabled: false };
    this.clickNext = this.clickNext.bind(this);
  }

  clickNext() {
    this.setState({ isDisabled: true });

    setTimeout(() => {
      this.setState({ isDisabled: false });
      this.props.changeDelta({ id: 'third_step' });
    }, 2000);
  }

  render() {
    const {
      changeDelta,
      showDelta,
      closeActiveDelta,
    } = this.props;
    const isDisabled = this.state.isDisabled;

    return (
      <div>
        <button disabled={isDisabled} onClick={closeActiveDelta}>close</button>
        <h3>Second step</h3>

        <div>
          <button disabled={isDisabled} onClick={() => showDelta({ id: 'error' })}>Show Error</button>
        </div>
        <br />

        <button disabled={isDisabled} onClick={() => changeDelta({ id: 'first_step' })}>Back</button>
        <button disabled={isDisabled} onClick={this.clickNext}>Next</button>
      </div>
    );
  }
}

/*
* Third step
* */

const ThirdStep = ({
  closeActiveDelta,
  changeDelta,
}) => (
  <div>
    <button onClick={closeActiveDelta}>close</button>
    <h3>Third step</h3>

    <button onClick={() => changeDelta({ id: 'second_step' })}>Back</button>
    <button onClick={closeActiveDelta}>Close</button>
  </div>
);

ThirdStep.propTypes = {
  closeActiveDelta: PropTypes.func.isRequired,
  changeDelta: PropTypes.func.isRequired,
};

/*
* Error
* */

const ErrorModal = ({ closeActiveDelta }) => (
  <div>
    <button onClick={closeActiveDelta}>close</button>
    <h3>Error</h3>

    <button onClick={closeActiveDelta}>Ok</button>
  </div>
);

ErrorModal.propTypes = {
  closeActiveDelta: PropTypes.func.isRequired,
};

const ModalPage = ({
  modalComponentShowDelta: showDelta,
  modalComponentChangeDelta: changeDelta,
  modalComponentCloseActiveDelta: closeActiveDelta,
}) => (
  <div>
    <h2>Modal Page</h2>

    <button onClick={() => showDelta({ id: 'first_step' })}>Start wizard</button>

    <Modal modalId="first_step">
      <FirstStep
        changeDelta={changeDelta}
        closeActiveDelta={closeActiveDelta}
      />
    </Modal>

    <Modal modalId="second_step">
      <SecondStep
        showDelta={showDelta}
        changeDelta={changeDelta}
        closeActiveDelta={closeActiveDelta}
      />
    </Modal>

    <Modal modalId="third_step">
      <ThirdStep
        closeActiveDelta={closeActiveDelta}
        changeDelta={changeDelta}
      />
    </Modal>

    <Modal modalId="error">
      <ErrorModal closeActiveDelta={closeActiveDelta} />
    </Modal>
  </div>
);

ModalPage.propTypes = {
  modalComponentShowDelta: PropTypes.func.isRequired,
  modalComponentChangeDelta: PropTypes.func.isRequired,
  modalComponentCloseActiveDelta: PropTypes.func.isRequired,
};

export default ModalPage;
