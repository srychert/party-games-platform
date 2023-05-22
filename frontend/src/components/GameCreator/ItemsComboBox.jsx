import React, { useContext } from 'react';

import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { GameContext } from './gameContext';
import { CgInsertAfter } from 'react-icons/cg';
import { IconContext } from 'react-icons';

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

function ItemsComboBox({ setNodeItems }) {
  const { items } = useContext(GameContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemSelect = (item) => {
    setSelectedItem(null);

    setNodeItems((nodeItems) => [...nodeItems, { ...item, id: uniqueID() }]);
  };

  return (
    <Combobox value={selectedItem} onChange={onItemSelect}>
      <div className="relative">
        <Combobox.Input
          className="form-input border"
          displayValue={(selectedItem) => selectedItem?.type}
        />
        <Combobox.Button className="absolute right-3 top-3">
          <IconContext.Provider value={{ size: '1.5em' }}>
            <CgInsertAfter />
          </IconContext.Provider>
        </Combobox.Button>
        <Combobox.Options>
          {items.map((item) => (
            <Combobox.Option key={item.id} value={item}>
              {({ selected, active }) => (
                <>
                  <div
                    className={`w-full p-2 ${active ? 'bg-emerald-600 text-white' : ''}`}
                  >
                    {item.type}
                  </div>
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

export default ItemsComboBox;
