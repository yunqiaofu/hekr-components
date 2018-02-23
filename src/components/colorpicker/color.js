export const rgbToHsv = ({ r, g, b }) => {
  if (r < 0) r = 0
  if (r > 255) r = 255

  if (g < 0) g = 0
  if (g > 255) g = 255

  if (b < 0) b = 0
  if (b > 255) b = 255

  r /= 255
  g /= 255
  b /= 255

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h
  let s = max === 0 ? 0 : (max - min) / max
  let v = max

  if (max === min) {
    h = 0 // achromatic
  } else {
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
  return { h: h * 360, s, v }
}

export const hsvToRgb = ({ h, s, v }) => {
  if (h < 0) h = 0
  if (h >= 360) h = 359

  if (s < 0) s = 0
  if (s > 1) s = 1

  if (v < 0) v = 0
  if (v > 1) v = 1

  const C = v * s
  const H = h / 60
  const X = C * (1 - Math.abs(H % 2 - 1))
  let r = 0
  let g = 0
  let b = 0
  if (H >= 0 && H < 1) {
    r = C
    g = X
  } else if (H >= 1 && H < 2) {
    r = X
    g = C
  } else if (H >= 2 && H < 3) {
    g = C
    b = X
  } else if (H >= 3 && H < 4) {
    g = X
    b = C
  } else if (H >= 4 && H < 5) {
    r = X
    b = C
  } else {
    r = C
    b = X
  }
  r += v - C
  g += v - C
  b += v - C
  return { r: r * 255, g: g * 255, b: b * 255 }
}
