import React, { useEffect, useState } from 'react';

function Heal({ node, setNode }) {
  const [baseHeal, setBaseHeal] = useState(node.data.node.baseHeal || 2);

  const updateNodeBaseHeal = (value) => {
    setNode((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          node: {
            ...node.data.node,
            baseHeal: value,
          },
        },
      };
    });
  };

  const handleChangeBaseHeal = (e) => {
    const num = parseInt(e.target.value);
    const isValid = Number.isInteger(num) && num > 0;

    setBaseHeal(num);

    if (isValid) {
      updateNodeBaseHeal(num);
    }
  };

  useEffect(() => {
    updateNodeBaseHeal(baseHeal);
  }, []);

  return (
    <div className="form-row">
      <div className="form-input-container">
        <label htmlFor="username">Base Heal</label>
        <input
          className="form-input border "
          type="number"
          name="baseHeal"
          id="baseHeal"
          autoComplete="off"
          onChange={handleChangeBaseHeal}
          value={baseHeal}
          min="0"
          step="1"
        />
      </div>
    </div>
  );
}

export default Heal;
