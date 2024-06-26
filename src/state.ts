export interface Music {
  id: string
  title: string
  audio: string
  lyric: string
  cover: string
  artist: string
  album: string
  year: number
  duration: string
  genre: string
}

export interface Track {
  time: number
  text: string
  ref: HTMLElement
}

export interface State {
  music: Music | null
  musics: Music[]
  tracks: Track[]
  currentTrack: number
  elapsedTime: number
}

type Listener<K extends keyof State> = (state: State, value: State[K]) => any

let trackInterval = 0
const TRACK_TIME_INTERVAL = 20
const listeners: Record<keyof State, Listener<any>[]> = {
  music: [],
  musics: [],
  tracks: [],
  elapsedTime: [],
  currentTrack: [],
}

export const state = new Proxy<State>(
  {
    music: null,
    musics: [],
    tracks: [],
    elapsedTime: 0,
    currentTrack: -1,
  },
  {
    set(target, key, value) {
      const _key = key as keyof typeof target
      target[_key] = value
      listeners[_key].forEach(listener => listener(target, value))

      return true
    },
  },
)

export const controls = {
  startTracking,
  pauseTracking,
}

export function subscribe<K extends keyof State>(
  key: K,
  listener: Listener<K>,
) {
  listeners[key].push(listener)
}

function startTracking() {
  trackInterval = setInterval(() => {
    state.elapsedTime += TRACK_TIME_INTERVAL

    if (state.elapsedTime >= state.tracks[state.currentTrack + 1].time) {
      state.currentTrack++
    }
  }, TRACK_TIME_INTERVAL)
}

function pauseTracking() {
  clearInterval(trackInterval)
}
