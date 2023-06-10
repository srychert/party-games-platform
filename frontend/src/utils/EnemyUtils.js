export function enemieTypeToString(enemieType) {
  return enemieType
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');
}
