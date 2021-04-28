export const getColorFromString = (string: string) => {
  const colors = ['#f2c9d8', '#d5c9f2', '#c9d2f2', '#c9e6f2', '#c9f2f0', '#c9f2da', '#d9f2c9', '#eff2c9', '#f2e2c9']
  let hash = 0
  if (string.length === 0) return colors[0]

  for (let i = 0; i < string.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
    // eslint-disable-next-line no-bitwise
    hash &= hash
  }
  hash = ((hash % colors.length) + colors.length) % colors.length

  return colors[hash]
}
