export const isWindow = typeof window !== `undefined`

export const randomArticles = (oldArray, n) => {
  return oldArray
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n)
}

export const getWidth = () => {
  if (!isWindow) return 0
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
  )
}
