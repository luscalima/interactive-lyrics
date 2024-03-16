import { state } from "./state"
import { transformTracks } from "./tracks"

const lyricsInput: HTMLInputElement = document.querySelector(".lyrics-input")!
const lyricsReader = new FileReader()

export function initializeLyricsForm() {
  lyricsInput.addEventListener("change", event => {
    event.preventDefault()

    const file = lyricsInput?.files?.[0]

    if (!file) {
      // TODO: handle nonexistent file
      return
    }

    lyricsReader.readAsText(file)
    lyricsReader.addEventListener("load", () => {
      const lines = readerResult(lyricsReader).split("\n")
      state.tracks = transformTracks(lines)
    })
  })
}

function readerResult(reader: FileReader) {
  return reader.result?.toString() ?? ""
}
