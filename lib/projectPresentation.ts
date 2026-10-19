import type { Project } from '@/types/portfolio'

export function getProjectKind(project: Project) {
  return project.projectType || (/\b(?:rest(?:ful)?\s+api|backend\s+api)\b/i.test(project.description) ? 'backend-api' : 'web-app')
}

export function getProjectKindLabel(project: Project) {
  return getProjectKind(project) === 'backend-api' ? 'Backend API' : 'Web application'
}

function parseLink(value?: string | null) {
  if (!value) return null
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url : null
  } catch {
    return null
  }
}

export function getProjectLinks(project: Project) {
  const legacy = parseLink(project.url)
  const sourceHosts = ['github.com', 'gitlab.com', 'bitbucket.org']
  const legacyIsSource = legacy && sourceHosts.some((host) => legacy.hostname === host || legacy.hostname.endsWith(`.${host}`))
  const source = parseLink(project.repositoryUrl) || (legacyIsSource ? legacy : null)
  const demo = parseLink(project.demoUrl) || (legacy && !legacyIsSource ? legacy : null)
  const docs = parseLink(project.apiDocsUrl)
  const candidates = [
    { kind: 'source' as const, label: source?.hostname === 'github.com' ? 'GitHub' : 'Source code', url: source },
    { kind: 'demo' as const, label: 'Live demo', url: demo },
    { kind: 'docs' as const, label: 'API docs', url: docs },
  ]
  const seen = new Set<string>()
  return candidates.flatMap(({ kind, label, url }) => {
    if (!url || seen.has(url.href)) return []
    seen.add(url.href)
    return [{ kind, label, href: url.href }]
  })
}
