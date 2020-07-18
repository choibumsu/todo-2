export const templateToElement = (template) => {
  const parser = new DOMParser()

  return parser.parseFromString(template, 'text/html').body.firstElementChild
}

export const elementToTemplate = (element) => {
  const tempDiv = document.createElement('div')
  tempDiv.appendChild(element)

  const template = tempDiv.innerHTML
  tempDiv.remove()

  return template
}
