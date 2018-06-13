export const rgbToHsv = ({ r, g, b }) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = max === 0 ? 0 : (max - min) / max
  let v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / (max - min) + 2
        break
      case b:
        h = (r - g) / (max - min) + 4
        break
    }
    h /= 6
  }

  if (h < 0) h = 0
  if (h > 1) h = 1
  if (s < 0) s = 0
  if (s > 1) s = 1
  if (v < 0) v = 0
  if (v > 1) v = 1

  return { h, s, v }
}

export const hsvToRgb = ({ h, s, v }) => {
  let r
  let g
  let b

  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  r = parseInt(r * 255)
  g = parseInt(g * 255)
  b = parseInt(b * 255)

  // if (r < 0) r = 0
  // if (r > 255) r = 255
  // if (g < 0) g = 0
  // if (g > 255) g = 255
  // if (b < 0) b = 0
  // if (b > 255) b = 255

  return { r, g, b }
}
