import * as React from "react"

import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  ComponentEntry,
  ComponentGuide,
  ComponentProp,
} from "@/lib/components"
import { splitInlineCode } from "@/lib/inline-code"

function InlineText({ text }: { text: string }) {
  return (
    <>
      {splitInlineCode(text).map((part, index) =>
        part.code ? (
          <code
            key={index}
            className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
          >
            {part.text}
          </code>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        )
      )}
    </>
  )
}

function DocsSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-20">
      <h2 id={id} className="text-lg font-medium">
        {title}
      </h2>
      {children}
    </section>
  )
}

function DocsList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/30"
          />
          <span>
            <InlineText text={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

// Code literals such as "expand", 600, false or [] render in monospace.
const literalDefault = /^(".*"|-?[\d.]+|true|false|\[\])$/

function PropsTable({ props }: { props: readonly ComponentProp[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="pr-4">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="pl-4 align-top font-mono text-xs">
                {prop.name}
              </TableCell>
              <TableCell className="max-w-56 min-w-36 align-top font-mono text-xs leading-5 whitespace-normal text-muted-foreground">
                {prop.type}
              </TableCell>
              <TableCell className="max-w-48 min-w-24 align-top text-xs leading-5 break-words whitespace-normal text-muted-foreground">
                {prop.required ? (
                  "Required"
                ) : prop.default ? (
                  literalDefault.test(prop.default) ? (
                    <span className="font-mono">{prop.default}</span>
                  ) : (
                    <InlineText text={prop.default} />
                  )
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="min-w-64 pr-4 align-top leading-6 whitespace-normal text-muted-foreground">
                <InlineText text={prop.description} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function GuideSection({ guide }: { guide: ComponentGuide }) {
  return (
    <DocsSection id="how-it-works" title={guide.title}>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        <InlineText text={guide.intro} />
      </p>
      <ol className="mt-6 space-y-5">
        {guide.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded-full border font-mono text-xs text-muted-foreground"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                <InlineText text={step.body} />
              </p>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="mt-8 text-sm font-medium">{guide.codeTitle}</h3>
      <pre className="mt-3 overflow-x-auto rounded-xl border bg-muted/55 p-5 font-mono text-xs leading-5">
        <code>{guide.code}</code>
      </pre>
      {guide.note ? (
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
          <InlineText text={guide.note} />
        </p>
      ) : null}
    </DocsSection>
  )
}

function ComponentDocs({ component }: { component: ComponentEntry }) {
  return (
    <>
      <Separator className="my-12" />
      <div className="space-y-12">
        <DocsSection id="when-to-use" title="When to use it">
          <DocsList items={component.useCases} />
        </DocsSection>
        <DocsSection id="behavior" title="Behavior">
          <DocsList items={component.behaviors} />
        </DocsSection>
        {component.guide ? <GuideSection guide={component.guide} /> : null}
        <DocsSection id="props" title="Props">
          <PropsTable props={component.props} />
        </DocsSection>
        <DocsSection id="accessibility" title="Accessibility">
          <DocsList items={component.accessibility} />
        </DocsSection>
        <DocsSection id="faq" title="FAQ">
          <div className="mt-4 divide-y rounded-xl border">
            {component.faqs.map((faq) => (
              <div key={faq.question} className="p-5">
                <h3 className="text-sm font-medium">
                  <InlineText text={faq.question} />
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  <InlineText text={faq.answer} />
                </p>
              </div>
            ))}
          </div>
        </DocsSection>
      </div>
    </>
  )
}

export { ComponentDocs, InlineText }
