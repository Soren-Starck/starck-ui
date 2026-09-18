import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { officialProjects } from "./official-projects.mjs"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, "..")
const projectsRoot = process.env.STARCK_PROJECTS_ROOT
  ? path.resolve(process.env.STARCK_PROJECTS_ROOT)
  : path.resolve(repositoryRoot, "..")
const outputPath = path.join(
  repositoryRoot,
  "lib/component-provenance.generated.ts"
)
const checkOnly = process.argv.includes("--check")

const sourceExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
])

const componentSignatures = [
  {
    slug: "liquid-glass-navbar",
    matches(source) {
      return (
        /\bLiquidGlassNavbar\b/.test(source) ||
        (/\bcreateLiquidGlass\b/.test(source) &&
          /backdrop-blur/.test(source) &&
          /Main navigation/.test(source))
      )
    },
  },
  {
    slug: "blue-cta-button",
    matches(source) {
      return (
        /\bBlueCtaButton\b/.test(source) ||
        /starck-blue-cta/.test(source) ||
        (/cta-glossy/.test(source) &&
          /(CTA_LABEL|Get SessionWatcher|Get Moorline)/.test(source))
      )
    },
  },
  {
    slug: "gradient-faq",
    matches(source) {
      return /\bGradientFAQ\b|\bGradientFaq\b/.test(source)
    },
  },
  {
    slug: "scroll-reveal",
    matches(source) {
      return /\bStaggerItem\b/.test(source) && /\bReveal\b/.test(source)
    },
  },
  {
    slug: "terminal-command",
    matches(source) {
      return /\bBrewCommand\b|\bTerminalCommand\b/.test(source)
    },
  },
  {
    slug: "macbook-mockup",
    matches(source) {
      return /\bMacbookPreview\b|\bMacbookMockup\b/.test(source)
    },
  },
  {
    slug: "sticky-product-cta",
    matches(source) {
      return /\bStickyBuyBar\b|\bStickyProductCta\b/.test(source)
    },
  },
  {
    slug: "social-proof",
    matches(source) {
      return /\bSocialProof\b/.test(source)
    },
  },
  {
    slug: "testimonials-grid",
    matches(source) {
      return /\bTestimonials\b|\bTestimonialsGrid\b/.test(source)
    },
  },
  {
    slug: "whats-new-card",
    matches(source) {
      return /\bWhatsNewCard\b/.test(source)
    },
  },
  {
    slug: "release-history-dialog",
    matches(source) {
      return /\bReleaseHistoryDialog\b/.test(source)
    },
  },
  {
    slug: "single-pricing-card",
    matches(source) {
      return /\bToolPricingCard\b|\bToolPricingSection\b|\bSinglePricingCard\b/.test(
        source
      )
    },
  },
  {
    slug: "pricing-block",
    matches(source) {
      return /\bPricingTrust\b|\bHomePricing\b|\bPricing2\b|\bPricingBlock\b/.test(
        source
      )
    },
  },
  {
    slug: "provider-orbit",
    matches(source) {
      return /\bProviderOrbit\b/.test(source)
    },
  },
  {
    slug: "morphing-download-icon",
    matches(source) {
      return /\bMorphingDownloadIcon\b/.test(source)
    },
  },
  {
    slug: "founder-note",
    matches(source) {
      return /\bFounderNote\b/.test(source)
    },
  },
]

function resolveProjectDirectory(project) {
  return project.directories
    .map((directory) => path.join(projectsRoot, directory))
    .find((directory) => existsSync(path.join(directory, ".git")))
}

function listSourceFiles(projectDirectory) {
  const output = execFileSync("rg", ["--files"], {
    cwd: projectDirectory,
    encoding: "utf8",
  })

  return output
    .split("\n")
    .filter(Boolean)
    .filter((file) => sourceExtensions.has(path.extname(file)))
    .filter((file) => {
      const absolutePath = path.join(projectDirectory, file)
      return statSync(absolutePath).size <= 1_000_000
    })
}

function evidenceScore(file) {
  let score = 0
  if (
    /(?:GradientFAQ|Reveal|BrewCommand|TerminalCommand|MacbookPreview|MacbookMockup|StickyBuyBar|StickyProductCta|SocialProof|Testimonials|WhatsNewCard|ReleaseHistoryDialog|ToolPricingCard|SinglePricingCard|HomePricing|PricingTrust|PricingBlock|ProviderOrbit|MorphingDownloadIcon|FounderNote)\.[jt]sx?$/i.test(
      file
    )
  )
    score += 40
  if (/header/i.test(file)) score += 20
  if (/(^|\/)components?\//i.test(file)) score += 10
  if (/marketing/i.test(file)) score += 5
  if (/vendor|archive|backup/i.test(file)) score -= 50
  return score
}

function scanProject(project, projectDirectory) {
  const files = listSourceFiles(projectDirectory)
  const matches = new Map(componentSignatures.map(({ slug }) => [slug, []]))

  for (const file of files) {
    const source = readFileSync(path.join(projectDirectory, file), "utf8")
    for (const signature of componentSignatures) {
      if (signature.matches(source)) matches.get(signature.slug).push(file)
    }
  }

  return Object.fromEntries(
    [...matches].map(([slug, evidence]) => [
      slug,
      evidence.sort(
        (left, right) =>
          evidenceScore(right) - evidenceScore(left) ||
          left.localeCompare(right)
      )[0],
    ])
  )
}

const missingProjects = []
const results = Object.fromEntries(
  componentSignatures.map(({ slug }) => [slug, []])
)

for (const project of officialProjects) {
  const projectDirectory = resolveProjectDirectory(project)
  if (!projectDirectory) {
    missingProjects.push(
      `${project.name} (${project.directories.join(" or ")})`
    )
    continue
  }

  const matches = scanProject(project, projectDirectory)
  for (const { slug } of componentSignatures) {
    if (!matches[slug]) continue
    results[slug].push({
      name: project.name,
      href: project.url,
      iconSrc: project.iconSrc,
      evidence: `${path.basename(projectDirectory)}/${matches[slug]}`,
    })
  }
}

if (missingProjects.length > 0) {
  throw new Error(
    `Could not scan every official project:\n- ${missingProjects.join("\n- ")}\n` +
      `Set STARCK_PROJECTS_ROOT when the repositories are not siblings of STARCK UI.`
  )
}

const generated =
  `// Generated by scripts/update-component-provenance.mjs. Do not edit by hand.\n\n` +
  `type ComponentProvenance = {\n  name: string\n  href: string\n  iconSrc?: string\n  evidence: string\n}\n\n` +
  `const componentProvenance = ${JSON.stringify(results, null, 2)} as const satisfies Record<string, readonly ComponentProvenance[]>\n\n` +
  `function getComponentProvenance(slug: string): readonly ComponentProvenance[] {\n` +
  `  return componentProvenance[slug as keyof typeof componentProvenance] ?? []\n` +
  `}\n\n` +
  `export { componentProvenance, getComponentProvenance }\n` +
  `export type { ComponentProvenance }\n`

const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : ""

if (checkOnly) {
  if (current !== generated) {
    console.error(
      "Component provenance is stale. Run `pnpm provenance:update`, review the evidence, and commit the result before deploying."
    )
    process.exit(1)
  }
  console.log("Component provenance is current.")
} else if (current === generated) {
  console.log("Component provenance is already current.")
} else {
  writeFileSync(outputPath, generated)
  console.log(
    `Updated ${path.relative(repositoryRoot, outputPath)} from ${officialProjects.length} official projects.`
  )
}
