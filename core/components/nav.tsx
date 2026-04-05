import Link from 'next/link'

export interface MenuItem {
  id: string
  name: string
  path: string
  resource?: string
  icon?: string
  sequence?: number
  type?: string
  children?: MenuItem[]
}

const menus: MenuItem[] = [{ "id": "home", "name": "Home", "path": "/", "resource": "home", "icon": "home", "sequence": 1, "type": "content" }, { "id": "services", "name": "Services", "path": "/services", "resource": "services", "icon": "settings", "sequence": 2, "type": "content" }, { "id": "news", "name": "News", "path": "/news", "resource": "news", "icon": "credit_card", "sequence": 3, "type": "" }, { "id": "careers", "name": "Careers", "path": "/careers", "resource": "careers", "icon": "work", "sequence": 4, "type": "" }, { "id": "contact", "name": "Contact", "path": "/contact", "resource": "contact", "icon": "mail", "sequence": 5, "type": "" }, { "id": "about", "name": "About", "path": "/about", "resource": "about", "icon": "assignment", "sequence": 6, "type": "", "children": [{ "id": "milestones", "name": "Milestones", "path": "/milestones", "resource": "milestones", "icon": "public", "sequence": 1, "type": "content" }, { "id": "companies", "name": "Companies", "path": "/companies", "resource": "companies", "icon": "account_balance", "sequence": 2, "type": "content" }, { "id": "leadership", "name": "Leadership", "path": "/leadership", "resource": "leadership", "icon": "person", "sequence": 3, "type": "content" }] }]
export function Nav() {
  return (
    <nav id="sysNav" className="expanded-all">
      <ul>
        {menus.map((m) => (
          <li key={m.id}>
            <Link href={m.path} className="menu-item" prefetch={false}>
              <i className="material-icons">{m.icon}</i>
              <span>{m.name}</span>
            </Link>  
          </li>
        ))}
      </ul>
    </nav>
  )
}
