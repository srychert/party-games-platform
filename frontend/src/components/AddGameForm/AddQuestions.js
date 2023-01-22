import React, { useState } from 'react';
import AddABCDQuestion from './AddABCDQuestion';
import TFQuestion from './TFQuestion';

function AddQuestions({ dispatch }) {
  const [type, setType] = useState('');

  const renderAddComponent = () => {
    switch (type) {
      case 'ABCD':
        return <AddABCDQuestion dispatch={dispatch} setType={setType} />;
      case 'TF':
        return <TFQuestion dispatch={dispatch} setType={setType} />;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex flex-col content-start pb-3">
        <label htmlFor="type">Choose question type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-input m-0"
        >
          <option value={''}>Select</option>
          <option value={'ABCD'}>ABCD</option>
          <option value={'TF'}>True/False</option>
        </select>
      </div>
      {renderAddComponent()}
    </div>
  );
}

export default AddQuestions;
