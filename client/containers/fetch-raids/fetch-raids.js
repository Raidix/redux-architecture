import { connect } from 'react-redux';
import { FetchRaids } from 'components';
import {
  actions as raidDataActions,
} from 'ducks/data/raid';

const mapDispatchToProps = raidDataActions;

function mapStateToProps(state) {
  return {
    raidDataIm: state.data.raidDataIm,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchRaids);
