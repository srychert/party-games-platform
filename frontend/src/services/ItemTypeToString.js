export function itemTypeToString(itemType) {
  return itemType
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');
}
