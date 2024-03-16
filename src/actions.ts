import { controls } from "./state"

const buttonPlay: HTMLButtonElement = document.querySelector(".btn-play")!

export function initializeActions() {
  let btnState: "pause" | "play" = "pause"

  buttonPlay.addEventListener("click", () => {
    if (btnState === "pause") {
      controls.startTracking()
      btnState = "play"
    } else {
      controls.pauseTracking()
      btnState = "pause"
    }
  })
}
