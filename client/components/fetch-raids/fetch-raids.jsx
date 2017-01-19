import React, { PropTypes } from 'react';
import co from 'co';
import { shapes } from 'ducks/data/raid';

const FetchRaids = ({
  raidDataGetSignal,
  raidDataDeleteSignal,
  raidDataResetSignal,
  raidDataIm,
}) => {
  const click = () => co(function* clickGen() {
    const { isSuccess } = yield raidDataGetSignal();

    if (isSuccess) {
      alert('data was fetched, state was updated'); // eslint-disable-line no-alert
    }
  });

  return (
    <div>
      <button onClick={click}>Fetch Raids</button>
      <button onClick={raidDataResetSignal}>Reset</button>
      <br />

      <div>
        <h3>raids:</h3>
        {raidDataIm.valueSeq().map((raid) => {
          const id = raid.get('id');
          const deleteAction = () => raidDataDeleteSignal({ id });

          return (
            <div key={id}>
              <div>
                <span>name: {raid.get('name')}</span>
              </div>
              <div>
                <span>size: {raid.get('size')}</span>
              </div>
              <div>
                <span>drives: {raid.get('drives').toJS().toString(',')}</span>
              </div>
              <button onClick={deleteAction}>Delete</button>
              <br /><br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

FetchRaids.propTypes = {
  raidDataGetSignal: PropTypes.func.isRequired,
  raidDataDeleteSignal: PropTypes.func.isRequired,
  raidDataResetSignal: PropTypes.func.isRequired,
  raidDataIm: shapes.state.isRequired,
};

export default FetchRaids;

