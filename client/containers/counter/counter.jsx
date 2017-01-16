import { connect } from 'react-redux';
import { Counter } from 'components';
import {
  actions as counterActions,
} from 'ducks/components/counter';

const mapDispatchToProps = counterActions;

function mapStateToProps(state) {
  return {
    counterComponentIm: state.components.counter,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

