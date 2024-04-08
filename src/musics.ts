import { Music, state, subscribe } from "./state"
import { h } from "./utils"

const list = document.querySelector(".musics .list")!

fetch("http://localhost:3000/musics")
  .then(res => res.json() as Promise<Music[]>)
  .then(musics => {
    state.musics = musics
  })

subscribe("musics", (_, musics) => {
  musics.forEach((music, index) => {
    list.appendChild(render(music, index + 1))
  })
})

function handleClick(music: Music) {
  state.music = music
}

function render(music: Music, number: number) {
  const src = `${import.meta.env.VITE_SERVER}/musics/${music.id}/cover`

  return h("li", { class: "music", onclick: () => handleClick(music) }, [
    h("span", { class: "number" }, [number.toString()]),
    h("div", { class: "cover" }, [h("img", { src })]),
    h("div", { class: "infos" }, [
      h("strong", { class: "title" }, [music.title]),
      h("p", { class: "artist" }, [music.artist]),
    ]),
  ])
}
