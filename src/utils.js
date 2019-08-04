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

export const addActiveStyle = (node, mobile) => {
  if (node !== null) {
    const li = node.querySelector(".ant-menu-item-selected")
    if (li && mobile) {
      li.style.backgroundColor = "tomato"
      li.style.borderRight = "8px solid #001529"
      return
    }
    if (li) {
      li.style.backgroundColor = "tomato"
    }
  }
}

export const rusToLatin = (str, separator = '-') => {

  let ru = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d",
    "е": "e", "ё": "e", "ж": "j", "з": "z", "и": "i",
    "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
    "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "h", "ц": "c", "ч": "ch", "ш": "sh",
    "щ": "shch", "ы": "y", "э": "e", "ю": "u", "я": "ya",
  }, newStr = []
  if(separator) {
    str = str.replace(/ /g, separator)
  }
  str = str.replace(/[\\/:"*?<>|]/g, '')
  str = str.replace(/[ъь]+/g, "").replace(/й/g, "i")

  for (let i = 0; i < str.length; ++i) {
    newStr.push(
      ru[str[i]]
      || (ru[str[i].toLowerCase()] === undefined && str[i])
      || (ru[str[i].toLowerCase()].replace(/^(.)/, function(match) {
        return match.toUpperCase()
      })),
    )
  }
  newStr[0].toLowerCase()
  return newStr.join("")
}