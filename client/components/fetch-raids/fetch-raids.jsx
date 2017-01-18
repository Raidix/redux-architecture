import React, { PropTypes } from 'react';
import { shapes } from 'ducks/data/raid';

const FetchRaids = ({
  raidDataFetchSignal,
  raidDataResetDelta,
  raidDataIm,
}) => {
  const click = () => raidDataFetchSignal().then(() => {
    alert('data was fetched, state was updated');
  });

  return (
    <div>
      <button onClick={click}>Fetch Raids</button>
      <button onClick={raidDataResetDelta}>Reset</button>
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
  raidDataResetDelta: PropTypes.func.isRequired,
  raidDataIm: shapes.state.isRequired,
};

export default FetchRaids;

