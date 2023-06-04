export default function getImgUrl(name) {
  return new URL(`/src/assets/${name}`, import.meta.url).href;
}
