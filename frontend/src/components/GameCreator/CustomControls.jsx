import React from 'react';
import { IconContext } from 'react-icons';
import { MdLibraryAdd } from 'react-icons/md';
import { ControlButton, Controls } from 'reactflow';

function CustomControls({ addNode }) {
  return (
    <Controls>
      <ControlButton onClick={addNode} title="add node">
        <IconContext.Provider value={{ size: '4em' }}>
          <MdLibraryAdd />
        </IconContext.Provider>
      </ControlButton>
    </Controls>
  );
}

export default CustomControls;
