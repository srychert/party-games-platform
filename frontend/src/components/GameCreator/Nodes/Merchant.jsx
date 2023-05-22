import React, { useEffect, useState } from 'react';
import ItemsComboBox from '../ItemsComboBox';
import { CgPen, CgTrash } from 'react-icons/cg';
import { IconContext } from 'react-icons';

function Merchant({ node, setNode }) {
  const [nodeItems, setNodeItems] = useState(node.data.node.itemList || []);

  useEffect(() => {
    setNode((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          node: {
            ...node.data.node,
            itemList: nodeItems,
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

  const handelCostChange = (id, cost) => {
    setNodeItems((items) =>
      items.map((item) => (item.id === id ? { ...item, cost } : item))
    );
  };

  const handelItemEffectChange = (id, key, value) => {
    setNodeItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, itemEffectMap: { ...item.itemEffectMap, [key]: value } }
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
          <div className="grid" key={item.id}>
            <div className="flex justify-between">
              <h2 className="bold">{item.type}</h2>
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
              className="grid"
              style={{
                gridTemplateRows: `${item.edit ? '1fr' : '0fr'}`,
                transition: 'grid-template-rows 0.5s ease-out',
              }}
            >
              <div className="overflow-hidden">
                <div className="flex gap-2">
                  <label htmlFor={`cost-${item.id}`}>Cost</label>
                  <input
                    id={`cost-${item.id}`}
                    placeholder={item.cost}
                    onChange={(e) => handelCostChange(item.id, e.target.value)}
                  ></input>
                </div>

                {Object.entries(item.itemEffectMap).map(([effect, value], idx) => {
                  return (
                    <div className="grid grid-cols-2" key={`${item.id}-${idx}`}>
                      <span>Effect: {effect}</span>
                      <div className="flex gap-2">
                        <label htmlFor={`effect-${item.id}-${idx}`}>Effect Value: </label>
                        <input
                          id={`effect-${item.id}-${idx}`}
                          placeholder={value}
                          onChange={(e) =>
                            handelItemEffectChange(item.id, effect, e.target.value)
                          }
                        ></input>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Merchant;
