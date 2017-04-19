import { connect } from 'react-redux';
import ModalPage from 'components/pages/modal';
import { actions as modalActions } from 'ducks/components/modal';

const mapDispatchToProps = modalActions;

function mapStateToProps(state) {
  return {
    modalComponentIm: state.components.modalComponentIm,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPage);
