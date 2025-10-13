import fs from 'fs'
import path from 'path'

const routesDir = path.resolve(process.cwd(), 'src', 'routes')
const outFile = path.resolve(process.cwd(), 'src', 'routeTree.gen.ts')

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let items = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) items = items.concat(scan(full))
    else if (/\.tsx?$/.test(e.name)) items.push(path.relative(path.resolve(process.cwd(), 'src'), full).replace(/\\/g, '/'))
  }
  return items
}

const files = fs.existsSync(routesDir) ? scan(routesDir) : []

const exports = files.map((f, i) => `// ${f}\n`).join('\n')

const content = `// Generated route tree (minimal)
// Files scanned: ${files.length}
export const routeFiles = ${JSON.stringify(files, null, 2)} as const

// Minimal routeTree stub so the app can import a routeTree during codegen
export const routeTree: any = {
  files: routeFiles,
}
`

fs.writeFileSync(outFile, content)
console.log('Wrote', outFile)
