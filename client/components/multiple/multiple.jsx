import React, { PropTypes } from 'react';
import { shapes } from 'ducks/components/multiple';

const SelectButton = ({ selectedIndex, buttonIndex, setSelectedAction }) => (
  <button onClick={() => setSelectedAction({ selectedIndex: buttonIndex })}>
    { selectedIndex === buttonIndex ? 'Active' : 'Inactive' }
  </button>
);

SelectButton.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  buttonIndex: PropTypes.number.isRequired,
  setSelectedAction: PropTypes.func.isRequired,
};

const Multiple = ({
  multipleComponentIm,
  multipleComponentSetSelectedDelta,
}) => {
  const selectedIndex = multipleComponentIm.get('selectedIndex');

  return (
    <div>
      <span>Multiple smart component</span>
      <div>
        {[0, 1, 2].map(index => (
          <SelectButton
            key={index}
            buttonIndex={index}
            selectedIndex={selectedIndex}
            setSelectedAction={multipleComponentSetSelectedDelta}
          />
        ))}
      </div>
    </div>
  );
};

Multiple.propTypes = {
  multipleComponentIm: shapes.state.isRequired,
  multipleComponentSetSelectedDelta: PropTypes.func.isRequired,
};

export default Multiple;
