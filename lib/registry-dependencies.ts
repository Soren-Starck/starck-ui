import registry from "@/registry.json"

import { getComponent } from "@/lib/components"

type RegistryItem = {
  name: string
  dependencies?: readonly string[]
  registryDependencies?: readonly string[]
}

const items: readonly RegistryItem[] = registry.items

function packageName(spec: string) {
  const versionAt = spec.lastIndexOf("@")
  return versionAt > 0 ? spec.slice(0, versionAt) : spec
}

/** What the shadcn CLI installs alongside a component, read from registry.json. */
function getComponentDependencies(slug: string) {
  const item = items.find((entry) => entry.name === slug)
  const packages = (item?.dependencies ?? []).map(packageName)
  const components = (item?.registryDependencies ?? []).map((url) => {
    const name =
      url
        .split("/")
        .pop()
        ?.replace(/\.json$/, "") ?? url
    return getComponent(name)?.title ?? name
  })
  return { packages, components }
}

function joinList(values: readonly string[]) {
  if (values.length <= 1) return values.join("")
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`
}

function describeDependencies(slug: string) {
  const { packages, components } = getComponentDependencies(slug)
  const names = [...packages, ...components.map((title) => `the ${title}`)]
  return names.length > 0
    ? `Also installs ${joinList(names)}.`
    : "No extra dependencies."
}

export { describeDependencies, getComponentDependencies }
