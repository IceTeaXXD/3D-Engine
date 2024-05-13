export class Listener {
  #listeners = {}

  addEventListener(event, callback) {
    if (!(event in this.#listeners)) {
      this.#listeners[event] = []
    }
    if (!this.#listeners[event].includes(callback)) {
      this.#listeners[event].push(callback)
    }
  }

  removeEventListener(event, callback) {
    if (event in this.#listeners) {
      this.#listeners[event] = this.#listeners[event].filter(
        (listener) => listener !== callback
      )
    }
  }

  dispatchEvent(event, ...args) {
    if (event in this.#listeners) {
      this.#listeners[event].forEach((listener) => listener(...args))
    }
  }

  hasEventListener(event, callback) {
    return event in this.#listeners && this.#listeners[event].includes(callback)
  }

  hasEventListenerEvent(event) {
    return event in this.#listeners
  }
}
