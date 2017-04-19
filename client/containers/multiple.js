import { connect } from 'react-redux';
import Multiple from 'components/multiple';
import { actions as multipleActions } from 'ducks/components/multiple';

const mapDispatchToProps = multipleActions;

function mapStateToProps(state) {
  return {
    multipleComponentIm: state.components.multipleComponentIm,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Multiple);
