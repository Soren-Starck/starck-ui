function getInstallCommand(slug: string) {
  return `pnpm dlx shadcn@latest add @starck/${slug}`
}

export { getInstallCommand }
