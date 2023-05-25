import { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import React from 'react';
import { IconContext } from 'react-icons';
import { CgCheck } from 'react-icons/cg';

function BaseSelect({ label = 'Type', options, startOption, handleSelect }) {
  const [selectedOption, setSelectedOption] = useState(startOption);

  const handleChange = (v) => {
    setSelectedOption(v);
    handleSelect(v);
  };

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 text-left shadow-md  focus:outline-amber-600">
        <span className="block truncate">{selectedOption.option}</span>
      </Listbox.Button>
      <Transition
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="mt-2 grid cursor-pointer">
          {options.map((option, idx) => (
            <Listbox.Option key={idx} value={option} className="border-b-2">
              {({ active, selected }) => (
                <div
                  className={`p-2 ${
                    active ? 'bg-emerald-600 text-white' : 'bg-white text-black'
                  }`}
                >
                  <div className="flex items-center ">
                    {selected && (
                      <IconContext.Provider value={{ size: '1.5em' }}>
                        <CgCheck />
                      </IconContext.Provider>
                    )}
                    <span className="block truncate">{option.option}</span>
                  </div>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

export default BaseSelect;
