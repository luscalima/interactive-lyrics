import { subscribe } from "./state"

const cover = document.querySelector(
  ".music-panel .music-cover img",
)! as HTMLImageElement
const title = document.querySelector(".music-panel .music-title strong")!
const artist = document.querySelector(".music-panel .music-title p")!
const timeEnd = document.querySelector(".music-panel .time-end")!

subscribe("music", (_, value) => {
  if (!value) {
    cover.src = ""
    title.textContent = ""
    artist.textContent = ""
    timeEnd.textContent = "-:-"
    return
  }

  cover.src = `${import.meta.env.VITE_SERVER}/musics/${value.id}/cover`
  title.textContent = value.title
  artist.textContent = value.artist
  timeEnd.textContent = value.duration
})
