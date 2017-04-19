import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { shapes as raidDataShapes, beautify as beautifyRaid } from 'ducks/data/raid';
import { shapes as driveDataShapes } from 'ducks/data/drive';

// eslint-disable-next-line react/prefer-stateless-function
class RaidItem extends PureComponent {
  static propTypes = {
    raidIm: raidDataShapes.itemState.isRequired,
    deleteAction: PropTypes.func.isRequired,
  };

  render() {
    const { raidIm, deleteAction } = this.props;
    const beautify = beautifyRaid(raidIm);
    const deleteRaid = () => deleteAction({ id: raidIm.get('id') });

    return (
      <div>
        <div>
          <span>name: {raidIm.get('name')}</span>
        </div>
        <div>
          <span>size: {beautify.size()}</span>
        </div>
        <div>
          <span>drives: {beautify.drives()}</span>
        </div>
        <button onClick={deleteRaid}>Delete</button>
        <br /><br />
      </div>
    );
  }
}

const FetchRaids = ({
  raidDataGetSignal,
  raidDataDeleteSignal,
  raidDataResetDelta,
  raidDataIm,
  driveDataIm,
}) => (
  <div>
    <div>
      Total drives count: {driveDataIm.size}
    </div>

    <button onClick={raidDataGetSignal}>Fetch Raids</button>
    <button onClick={raidDataResetDelta}>Reset</button>
    <br />

    <div>
      <h3>raids:</h3>
      {raidDataIm.valueSeq().map((raidIm) => {
        const id = raidIm.get('id');

        return <RaidItem raidIm={raidIm} key={id} deleteAction={raidDataDeleteSignal} />;
      })}
    </div>
  </div>
);

FetchRaids.propTypes = {
  raidDataGetSignal: PropTypes.func.isRequired,
  raidDataDeleteSignal: PropTypes.func.isRequired,
  raidDataResetDelta: PropTypes.func.isRequired,
  raidDataIm: raidDataShapes.state.isRequired,
  driveDataIm: driveDataShapes.state.isRequired,
};

export default FetchRaids;

