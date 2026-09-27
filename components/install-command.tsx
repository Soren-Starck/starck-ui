import { CopyButton } from "@/components/copy-button"
import { getInstallCommand } from "@/lib/install-command"

function InstallCommand({ slug }: { slug: string }) {
  const command = getInstallCommand(slug)

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border bg-muted/55 p-2 pl-4">
      <code className="min-w-0 flex-1 overflow-x-auto py-1 font-mono text-xs whitespace-nowrap">
        {command}
      </code>
      <CopyButton value={command} />
    </div>
  )
}

export { InstallCommand }
