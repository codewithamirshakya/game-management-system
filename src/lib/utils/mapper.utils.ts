export function mapper(src: any,dest: any) {
  console.log(Object.getOwnPropertyNames(src));
  console.log('src',Object.keys(src));
  Object.keys(src).forEach(key => key in dest? src[key] = dest[key] : null);
  return src;
}
