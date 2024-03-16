import { subscribe } from "./state"

const lyricsDisplay = document.querySelector(".lyrics-display")!

export function initializeDisplay() {
  subscribe("tracks", state => {
    if (!state.tracks.length) {
      lyricsDisplay.remove()
      return
    }

    state.tracks.forEach(track => {
      lyricsDisplay.appendChild(track.ref)
    })
  })

  subscribe("currentTrack", (state, value) => {
    state.tracks[value - 1]?.ref.classList.remove("focus")
    state.tracks[value].ref.classList.add("passed", "focus")
  })
}
