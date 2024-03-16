import { Track } from "./state"

export function transformTracks(lines: string[]) {
  return lines.reduce((arr, line) => {
    if (!line) return arr

    const time = getTime(line)
    const text = getText(line)
    const ref = getRef(text)

    arr.push({
      text,
      time,
      ref,
    })

    return arr
  }, [] as Track[])
}

function getTime(line: string) {
  const [_, m, s, ms] = line.match(/(\d\d):(\d\d).(\d\d)/)!
  return (Number(m) * 60 + Number(s)) * 1000 + (Number(ms) * 1000) / 100
}

function getText(line: string) {
  return line.replace(/\[.+]/, "").trim()
}

function getRef(text: string) {
  const p = document.createElement("p")
  p.setAttribute("class", "line")
  const t = document.createTextNode(text)
  p.appendChild(t)

  return p
}
