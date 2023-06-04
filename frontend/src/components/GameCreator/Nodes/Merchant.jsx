import React, { useEffect, useState } from 'react';
import ItemsComboBox from '../ItemsComboBox';
import { CgPen, CgTrash } from 'react-icons/cg';
import { IconContext } from 'react-icons';

function Merchant({ node, setNode }) {
  const [nodeItems, setNodeItems] = useState(node.data.node.itemsList || []);

  useEffect(() => {
    setNode((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          node: {
            ...node.data.node,
            itemsList: nodeItems,
          },
        },
      };
    });
  }, [nodeItems]);

  const removeItem = (id) => {
    setNodeItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleEditItem = (id) => {
    setNodeItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, edit: item?.edit ? !item.edit : true } : item
      )
    );
  };

  const handleCostChange = (id, cost) => {
    setNodeItems((items) =>
      items.map((item) => (item.id === id ? { ...item, cost } : item))
    );
  };

  const handleItemEffectChange = (id, key, value) => {
    setNodeItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              itemEffectMap: {
                ...item.itemEffectMap,
                [key]: isNaN(parseInt(value)) ? 0 : parseInt(value),
              },
            }
          : item
      )
    );
  };

  return (
    <div className="grid w-full gap-4">
      <div>
        <h2>Items:</h2>
        <ItemsComboBox setNodeItems={setNodeItems} />
      </div>

      {nodeItems.map((item) => {
        return (
          <div className="grid gap-2" key={item.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{item.type}</h2>
              <div className="flex gap-2">
                <button
                  className="buttonSmall bg-rose-600"
                  onClick={() => removeItem(item.id)}
                >
                  <IconContext.Provider value={{ size: '2em' }}>
                    <CgTrash />
                  </IconContext.Provider>
                </button>

                <button
                  className="buttonSmall bg-violet-600"
                  onClick={() => toggleEditItem(item.id)}
                >
                  <IconContext.Provider value={{ size: '2em' }}>
                    <CgPen />
                  </IconContext.Provider>
                </button>
              </div>
            </div>

            <div
              className={`grid rounded-lg border p-2 ${
                item.edit ? 'border-violet-600' : ''
              }`}
              style={{
                gridTemplateRows: `${item.edit ? '1fr' : '0fr'}`,
                transition: 'all 0.5s ease-out',
              }}
            >
              <div className="grid gap-2 overflow-hidden">
                <div className="flex items-center gap-4">
                  <img className="w-12" src={`/src/assets/${item.path}`}></img>
                  <div className="grid">
                    <label htmlFor={`cost-${item.id}`} className="text-lg">
                      Cost:
                    </label>
                    <input
                      id={`cost-${item.id}`}
                      placeholder={item.cost}
                      onChange={(e) => handleCostChange(item.id, e.target.value)}
                      className="form-input p-1 placeholder-slate-600"
                    ></input>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {Object.entries(item.itemEffectMap).map(([effect, value], idx) => {
                    return (
                      <div className="grid gap-1" key={`${item.id}-${idx}`}>
                        <label htmlFor={`effect-${item.id}-${idx}`}>{effect}: </label>
                        <input
                          id={`effect-${item.id}-${idx}`}
                          placeholder={value}
                          onChange={(e) =>
                            handleItemEffectChange(item.id, effect, e.target.value)
                          }
                          className="form-input p-1 placeholder-slate-600"
                        ></input>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Merchant;
