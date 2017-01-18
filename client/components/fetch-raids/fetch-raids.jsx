import React, { PropTypes } from 'react';
import { shapes } from 'ducks/data/raid';

const FetchRaids = ({
  raidDataFetchSignal,
  raidDataResetSignal,
  raidDataIm,
}) => {
  const click = () => raidDataFetchSignal().then(() => {
    alert('data was fetched, state was updated'); // eslint-disable-line no-alert
  });

  return (
    <div>
      <button onClick={click}>Fetch Raids</button>
      <button onClick={raidDataResetSignal}>Reset</button>
      <br />

      <div>
        <h3>raids:</h3>
        <pre>
          {JSON.stringify(raidDataIm.toJS(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

FetchRaids.propTypes = {
  raidDataFetchSignal: PropTypes.func.isRequired,
  raidDataResetSignal: PropTypes.func.isRequired,
  raidDataIm: shapes.state.isRequired,
};

export default FetchRaids;

