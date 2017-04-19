import { connect } from 'react-redux';
import Modal from 'components/modal/modal';

function mapStateToProps(state) {
  return {
    modalComponentIm: state.components.modalComponentIm,
  };
}

export default connect(mapStateToProps)(Modal);
