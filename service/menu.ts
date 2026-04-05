export interface MenuItem {
  id: string
  name: string
  path: string
  resource?: string
  icon?: string
  sequence?: number
  prefetch?: boolean
  type?: string
  children?: MenuItem[]
}
export interface Category {
  id: string
  name: string
  path: string
  resource?: string
  icon?: string
  sequence?: number
  prefetch?: boolean
  type?: string
  parent?: string
  children?: MenuItem[]
}
export class MenuItemLoader {
  constructor(private query: <T>(sql: string, args?: any[]) => Promise<T[]>, private sql: string) {
    this.load = this.load.bind(this)
  }
  load(): Promise<MenuItem[]> {
    return this.query<Category>(this.sql).then((categories) => {
      return toMenuItems(categories)
    })
  }
}
export function rebuildPath(items: MenuItem[], lang: string) {
  for (const item of items) {
    item.path = item.type === "content" ? `/${lang}${item.path}` : `${item.path}?lang=${lang}`
    const children = item.children
    if (children && children.length > 0) {
      rebuildPath(children, lang)
    }
  }
}

export function sub(n1?: number, n2?: number): number {
  if (!n1 && !n2) {
    return 0
  } else if (n1 && n2) {
    return n1 - n2
  } else if (n1) {
    return n1
  } else if (n2) {
    return -n2
  }
  return 0
}
function subMenuItem(p1: MenuItem, p2: MenuItem): number {
  return sub(p1.sequence, p2.sequence)
}
export function toMenuItems(m: Category[]): MenuItem[] {
  const ps: Category[] = getRoot(m)
  for (const p of ps) {
    getChildren(p, m)
  }
  return ps.sort(subMenuItem)
}
function getRoot(ms: Category[]): Category[] {
  const ps: Category[] = []
  for (const m of ms) {
    if (!m.parent || m.parent.length === 0) {
      delete m.parent
      ps.push(m)
    }
  }
  return ps.sort(subMenuItem)
}
function getChildren(m: Category, all: Category[]) {
  const children: MenuItem[] = []
  for (const s of all) {
    if (s.parent === m.id) {
      delete s.parent
      children.push(s)
      getChildren(s, all)
    }
  }
  if (children.length > 0) {
    children.sort(subMenuItem)
    m.children = children
  }
}
