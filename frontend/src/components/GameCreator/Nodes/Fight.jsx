import React, { useContext, useState, useEffect } from 'react';
import EnemyTypeSelect from '../Select/EnemyTypeSelect';
import { GameContext } from '../gameContext';
import { STANCES } from '../../../enums/StanceTypes';

const defaultStances = Object.values(STANCES).map((key) => {
  return {
    stance: key,
    chance: 25,
  };
});

function Fight({ node, setNode }) {
  const { enemies, items } = useContext(GameContext);

  const [enemy, setEnemy] = useState({
    type: node.data.node.enemy?.type,
    hp: node.data.node.enemy?.hp ?? 0,
    atk: node.data.node.enemy?.atk ?? 0,
    speed: node.data.node.enemy?.speed ?? 0,
    stance: node.data.node.enemy?.stance ?? STANCES.NORMAL,
    stances: node.data.node.enemy?.stances ?? defaultStances,
    loot: node.data.node.enemy?.loot ?? {
      gold: 0,
      items: [],
    },
  });

  useEffect(() => {
    if (node.data.node.enemy) {
      const rest = defaultStances
        .filter((s) => !node.data.node.enemy.stances.find((es) => es.stance === s.stance))
        .map((s) => {
          return { ...s, chance: 0 };
        });

      setEnemy({
        ...node.data.node.enemy,
        stances: [...node.data.node.enemy.stances, ...rest],
      });
    }
  }, [node.data.node.enemy?.type]);

  useEffect(() => {
    setNode((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          node: {
            ...node.data.node,
            enemy: enemy,
          },
        },
      };
    });
  }, [enemy]);

  const stanceColors = {
    [STANCES.OFFENSIVE]: 'border-red-300 outline-red-600',
    [STANCES.DEFENSIVE]: 'border-blue-300 outline-blue-600',
    [STANCES.NORMAL]: 'border-green-300 outline-green-600',
    [STANCES.COUNTER]: 'border-violet-300 outline-violet-600',
  };

  return (
    <div>
      <EnemyTypeSelect node={node} setNode={setNode} enemies={enemies} />
      {node.data.node.enemy?.type && (
        <div>
          <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-2 rounded-lg border p-2">
            <div className="grid">
              <label htmlFor="hp">Hp</label>
              <input
                id="hp"
                type="number"
                step={1}
                min={0}
                value={enemy.hp}
                onChange={(e) => setEnemy({ ...enemy, hp: parseInt(e.target.value) })}
                className="creator-input border-red-300 outline-red-600"
              ></input>
            </div>
            <div className="grid">
              <label htmlFor="atk">Attack</label>
              <input
                id="atk"
                type="number"
                step={1}
                min={0}
                value={enemy.atk}
                onChange={(e) => setEnemy({ ...enemy, atk: parseInt(e.target.value) })}
                className="creator-input border-blue-300 outline-blue-600"
              ></input>
            </div>
            <div className="grid">
              <label htmlFor="speed">Speed</label>
              <input
                id="speed"
                type="number"
                step={1}
                min={0}
                value={enemy.speed}
                onChange={(e) => setEnemy({ ...enemy, speed: parseInt(e.target.value) })}
                className="creator-input border-yellow-300 outline-yellow-300"
              ></input>
            </div>
            <div className="grid">
              <label htmlFor="stance">Initial stance</label>
              <select
                id="stance"
                className="creator-input border-violet-300 outline-violet-600"
                value={enemy.stance}
                onChange={(e) => setEnemy({ ...enemy, stance: e.target.value })}
              >
                {Object.values(STANCES).map((stance) => {
                  return (
                    <option value={stance} key={stance}>
                      {stance}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid">
              <label htmlFor="gold">Gold</label>
              <input
                id="gold"
                type="number"
                step={1}
                min={0}
                value={enemy.loot.gold}
                onChange={(e) =>
                  setEnemy({
                    ...enemy,
                    loot: { ...enemy.loot, gold: parseInt(e.target.value) },
                  })
                }
                className="creator-input border-amber-300 outline-amber-400"
              ></input>

              {/* TODO loot items */}
              <div></div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 rounded-lg border p-2">
            {Object.values(STANCES).map((stance) => {
              return (
                <div className="grid" key={stance}>
                  <label htmlFor="stance-def">Chance {stance}</label>
                  <input
                    id={`stance-${stance}`}
                    type="number"
                    step={1}
                    min={0}
                    max={100}
                    value={enemy.stances.find((s) => s.stance === stance)?.chance || 0}
                    onChange={(e) =>
                      setEnemy({
                        ...enemy,
                        stances: enemy.stances.map((s) =>
                          s.stance === stance
                            ? { ...s, chance: parseInt(e.target.value) }
                            : s
                        ),
                      })
                    }
                    className={`creator-input ${stanceColors[stance]}`}
                  ></input>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Fight;
