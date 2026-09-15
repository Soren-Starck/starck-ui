async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = value
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.append(textarea)
    textarea.select()

    try {
      return document.execCommand("copy")
    } finally {
      textarea.remove()
    }
  }
}

export { copyToClipboard }
