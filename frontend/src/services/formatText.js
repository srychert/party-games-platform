export function formatText(text) {
  return text
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');
}
