type Attributes = Record<string, string | EventListenerOrEventListenerObject>

export function h<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Attributes,
  children?: (HTMLElement | string)[],
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName)

  if (attributes) {
    for (const [attr, value] of Object.entries(attributes)) {
      if (attr.startsWith("on")) {
        const event = attr.slice(2)
        element.addEventListener(event, value as EventListener)
      } else {
        element.setAttribute(attr, value as string)
      }
    }
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    })
  }

  return element
}
