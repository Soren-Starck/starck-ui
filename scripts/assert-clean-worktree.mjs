import { execFileSync } from "node:child_process"

const status = execFileSync("git", ["status", "--porcelain"], {
  encoding: "utf8",
}).trim()

if (status) {
  console.error(
    `Refusing to deploy an uncommitted worktree:\n${status}\nCommit and push the verified release state first.`
  )
  process.exit(1)
}

console.log("Release worktree is clean.")
