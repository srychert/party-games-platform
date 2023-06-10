export function itemTypeToString(itemType) {
  return itemType
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');
}

function mapShortToLongName(shortName) {
  switch (shortName) {
    case 'HEAL':
      return 'Heal';
    case 'HP_BUFF':
      return 'Health Buff';
    case 'HP_DEBUFF':
      return 'Health Debuff';
    case 'ATK_BUFF':
      return 'Attack Buff';
    case 'ATK_DEBUFF':
      return 'Attack Debuff';
    case 'SPEED_BUFF':
      return 'Speed Buff';
    case 'SPEED_DEBUFF':
      return 'Speed Debuff';
    default:
      return shortName;
  }
}

export function itemEffectsToString(itemEffects) {
  return Object.keys(itemEffects).map((effect) => {
    return {
      name: mapShortToLongName(effect),
      value: itemEffects[effect],
    };
  });
}
