import { connect } from 'react-redux';
import dataFetcherEnhance from 'components/data-fetcher-enhance/data-fetcher-enhance';
import FetchRaids from 'components/fetch-raids';
import { actions as raidDataActions } from 'ducks/data/raid';
import { actions as driveDataActions } from 'ducks/data/drive';

const mapDispatchToProps = Object.assign({},
  raidDataActions,
  driveDataActions,
);

function mapStateToProps(state) {
  return {
    raidDataIm: state.data.raidDataIm,
    driveDataIm: state.data.driveDataIm,
  };
}

const FetchRaidsWithFetch = dataFetcherEnhance(FetchRaids, [
  'raidDataGetSignal',
  'driveDataGetSignal',
]);

export default connect(mapStateToProps, mapDispatchToProps)(FetchRaidsWithFetch);
