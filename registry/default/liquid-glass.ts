/**
 * Liquid Glass — optical refraction for the web.
 * Adapted from https://github.com/rizzytoday/liquid-glass
 * Chromium uses SVG displacement; other browsers receive backdrop blur.
 *
 * MIT License
 * Copyright (c) 2026 Riz Roze
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

type LiquidGlassOptions = {
  width?: number
  height?: number
  borderRadius?: number
  scale?: number
  border?: number
  lightness?: number
  alpha?: number
  blur?: number
  aberration?: [number, number, number]
  frost?: number
  saturation?: number
  displaceBlur?: number
  fallbackFilter?: string
  filterId?: string
}

type LiquidGlassConfig = {
  width: number
  height: number
  radius: number
  scale: number
  border: number
  lightness: number
  alpha: number
  blur: number
  r: number
  g: number
  b: number
  frost: number
  saturation: number
  displace: number
}

type FilterRefs = {
  svg: SVGSVGElement
  filter: SVGFilterElement
  image: SVGFEImageElement
  red: SVGFEDisplacementMapElement
  green: SVGFEDisplacementMapElement
  blue: SVGFEDisplacementMapElement
  blur: SVGFEGaussianBlurElement
}

type LiquidGlassInstance = {
  isActive: boolean
  filterElement: SVGSVGElement
  update: (options: Partial<LiquidGlassOptions>) => void
  destroy: () => void
}

const isChromium =
  typeof navigator !== "undefined" && /Chrome\//.test(navigator.userAgent)

const mapCache = new Map<string, string>()
let instanceCount = 0

function resolveConfig(
  element: HTMLElement,
  options: LiquidGlassOptions
): LiquidGlassConfig {
  const rect = element.getBoundingClientRect()
  const aberration = options.aberration ?? [0, 10, 20]

  return {
    width: options.width ?? Math.round(rect.width),
    height: options.height ?? Math.round(rect.height),
    radius: options.borderRadius ?? 50,
    scale: options.scale ?? -180,
    border: options.border ?? 0.07,
    lightness: options.lightness ?? 50,
    alpha: options.alpha ?? 0.93,
    blur: options.blur ?? 11,
    r: aberration[0],
    g: aberration[1],
    b: aberration[2],
    frost: options.frost ?? 0,
    saturation: options.saturation ?? 1,
    displace: options.displaceBlur ?? 0,
  }
}

function buildDisplacementMap(config: LiquidGlassConfig) {
  const key = [
    config.width,
    config.height,
    config.radius,
    config.scale,
    config.border,
    config.blur,
    config.lightness,
    config.alpha,
  ].join(":")
  const cached = mapCache.get(key)
  if (cached) return cached

  const maxDisplace = Math.max(Math.abs(config.scale) * 0.5, 20)
  const padding = Math.ceil(maxDisplace)
  const canvas = document.createElement("canvas")
  canvas.width = config.width + padding * 2
  canvas.height = config.height + padding * 2
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Liquid Glass needs Canvas 2D support.")

  context.fillStyle = "rgb(128, 128, 128)"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.save()
  context.beginPath()
  context.roundRect(
    padding,
    padding,
    config.width,
    config.height,
    config.radius
  )
  context.clip()
  context.fillStyle = "#000"
  context.fillRect(padding, padding, config.width, config.height)

  const red = context.createLinearGradient(
    padding + config.width,
    padding,
    padding,
    padding
  )
  red.addColorStop(0, "#000")
  red.addColorStop(1, "#f00")
  context.fillStyle = red
  context.fillRect(padding, padding, config.width, config.height)

  context.globalCompositeOperation = "difference"
  const blue = context.createLinearGradient(
    padding,
    padding,
    padding,
    padding + config.height
  )
  blue.addColorStop(0, "#000")
  blue.addColorStop(1, "#00f")
  context.fillStyle = blue
  context.fillRect(padding, padding, config.width, config.height)

  context.globalCompositeOperation = "source-over"
  const border = Math.min(config.width, config.height) * (config.border * 0.5)
  context.filter = `blur(${config.blur}px)`
  context.fillStyle = `hsla(0, 0%, ${config.lightness}%, ${config.alpha})`
  context.beginPath()
  context.roundRect(
    padding + border,
    padding + border,
    config.width - border * 2,
    config.height - border * 2,
    config.radius
  )
  context.fill()
  context.restore()

  const uri = canvas.toDataURL()
  mapCache.set(key, uri)
  return uri
}

function createFilterSvg(id: string): FilterRefs {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none"
  svg.innerHTML = `
    <defs>
      <filter id="${id}" color-interpolation-filters="sRGB">
        <feImage result="map" preserveAspectRatio="none" />
        <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispRed" data-channel="red" />
        <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
        <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispGreen" data-channel="green" />
        <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
        <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispBlue" data-channel="blue" />
        <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
        <feBlend in="red" in2="green" mode="screen" result="rg" />
        <feBlend in="rg" in2="blue" mode="screen" result="output" />
        <feGaussianBlur in="output" stdDeviation="0" />
      </filter>
    </defs>`

  const get = <T extends Element>(selector: string) => {
    const node = svg.querySelector<T>(selector)
    if (!node) throw new Error(`Liquid Glass filter is missing ${selector}.`)
    return node
  }

  return {
    svg,
    filter: get<SVGFilterElement>("filter"),
    image: get<SVGFEImageElement>("feImage"),
    red: get<SVGFEDisplacementMapElement>('[data-channel="red"]'),
    green: get<SVGFEDisplacementMapElement>('[data-channel="green"]'),
    blue: get<SVGFEDisplacementMapElement>('[data-channel="blue"]'),
    blur: get<SVGFEGaussianBlurElement>("feGaussianBlur"),
  }
}

function applyConfig(config: LiquidGlassConfig, refs: FilterRefs) {
  const uri = buildDisplacementMap(config)
  const maxDisplace = Math.max(Math.abs(config.scale) * 0.5, 20)
  const x = Math.ceil((maxDisplace / config.width) * 100)
  const y = Math.ceil((maxDisplace / config.height) * 100)

  refs.filter.setAttribute("x", `-${x}%`)
  refs.filter.setAttribute("y", `-${y}%`)
  refs.filter.setAttribute("width", `${100 + x * 2}%`)
  refs.filter.setAttribute("height", `${100 + y * 2}%`)
  refs.image.setAttributeNS("http://www.w3.org/1999/xlink", "href", uri)
  refs.image.setAttribute("href", uri)
  refs.red.setAttribute("scale", String(config.scale + config.r))
  refs.green.setAttribute("scale", String(config.scale + config.g))
  refs.blue.setAttribute("scale", String(config.scale + config.b))
  refs.blur.setAttribute("stdDeviation", String(config.displace))
}

function createLiquidGlass(
  element: HTMLElement,
  options: LiquidGlassOptions = {}
): LiquidGlassInstance {
  const fallback = options.fallbackFilter ?? "blur(12px)"

  if (!isChromium) {
    const previous = element.style.backdropFilter
    const previousWebkit = element.style.getPropertyValue(
      "-webkit-backdrop-filter"
    )
    element.style.backdropFilter = fallback
    element.style.setProperty("-webkit-backdrop-filter", fallback)
    const placeholder = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    )

    return {
      isActive: false,
      filterElement: placeholder,
      update() {},
      destroy() {
        element.style.backdropFilter = previous
        element.style.setProperty("-webkit-backdrop-filter", previousWebkit)
      },
    }
  }

  const id = options.filterId ?? `liquid-glass-${++instanceCount}`
  const refs = createFilterSvg(id)
  document.body.appendChild(refs.svg)
  let currentOptions = { ...options }
  let config = resolveConfig(element, currentOptions)

  const applyStyles = (nextConfig: LiquidGlassConfig) => {
    const filter = `url(#${id}) saturate(${nextConfig.saturation})`
    element.style.backdropFilter = filter
    element.style.setProperty("-webkit-backdrop-filter", filter)
    if (nextConfig.frost > 0) {
      element.style.background = `hsl(0 0% 0% / ${nextConfig.frost})`
    }
  }

  applyConfig(config, refs)
  applyStyles(config)

  let resizeFrame = 0
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      if (currentOptions.width == null || currentOptions.height == null) {
        config = resolveConfig(element, currentOptions)
        applyConfig(config, refs)
        applyStyles(config)
      }
    })
  })
  observer.observe(element)

  return {
    isActive: true,
    filterElement: refs.svg,
    update(nextOptions) {
      currentOptions = { ...currentOptions, ...nextOptions }
      config = resolveConfig(element, currentOptions)
      applyConfig(config, refs)
      applyStyles(config)
    },
    destroy() {
      observer.disconnect()
      cancelAnimationFrame(resizeFrame)
      refs.svg.remove()
      element.style.backdropFilter = ""
      element.style.setProperty("-webkit-backdrop-filter", "")
      element.style.background = ""
    },
  }
}

export { createLiquidGlass, isChromium }
export type { LiquidGlassInstance, LiquidGlassOptions }
