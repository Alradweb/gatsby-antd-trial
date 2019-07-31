export const isWindow = typeof window !== `undefined`

export const randomArticles = (oldArray, n) =>{
  // const n = 5;
  return oldArray
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n);
}