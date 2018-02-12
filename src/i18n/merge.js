export default function merge (...arg) {
  let i = 0
  while (i < arg.length) {
    if (!arg[i + 1]) {
      i++
      continue
    }
    if (typeof arg[0] !== 'object') {
      arg[0] = arg[i + 1]
      i++
      continue
    }
    Object.keys(arg[i + 1])
      .forEach(key => {
        if (!arg[0][key] || typeof arg[0][key] !== 'object' || typeof arg[i + 1][key] !== 'object') {
          arg[0][key] = arg[i + 1][key]
        } else {
          arg[0][key] = merge({}, arg[0][key], arg[i + 1][key])
        }
      })
    i++
  }
  return arg[0]
}
