import { spawn } from 'node:child_process'

const api = spawn(process.execPath, ['server/index.js'], { stdio: 'inherit' })
const web = spawn(process.execPath, ['node_modules/vite/bin/vite.js', ...process.argv.slice(2)], { stdio: 'inherit' })
let stopping = false

function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of [api, web]) {
    if (child.exitCode === null) child.kill()
  }
  process.exitCode = code
}

for (const child of [api, web]) {
  child.on('error', error => {
    console.error(error)
    stop(1)
  })
  child.on('exit', (code, signal) => {
    if (!stopping) stop(code ?? (signal ? 1 : 0))
  })
}

process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
