// Documentation strings mark code with backticks, as in Markdown.

type InlinePart = { text: string; code: boolean }

function splitInlineCode(text: string): InlinePart[] {
  return text
    .split("`")
    .map((part, index) => ({ text: part, code: index % 2 === 1 }))
    .filter((part) => part.text.length > 0)
}

function stripInlineCode(text: string) {
  return text.replaceAll("`", "")
}

export { splitInlineCode, stripInlineCode }
export type { InlinePart }
