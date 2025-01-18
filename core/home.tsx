import { Groups, Item } from "reactx-groups"

export interface StringMap {
  [key: string]: string
}

const items: Item[] = [
  {
    name: "Home",
    resource: "home",
    path: "/",
    icon: "home",
  },
  {
    name: "Works",
    resource: "works",
    path: "/works",
    icon: "assignments",
  },
  {
    name: "Services",
    resource: "services",
    path: "/services",
    icon: "settings",
  },
  {
    name: "News",
    resource: "news",
    path: "/news",
    icon: "assignments",
  },
  {
    name: "Careers",
    resource: "careers",
    path: "/careers",
    icon: "pie_chart",
  },
  {
    name: "contact",
    resource: "contact",
    path: "/contact",
    icon: "contacts",
  },
  {
    name: "About",
    resource: "about",
    path: "/about",
    icon: "assignments",
    children: [
      {
        name: "Milestones",
        resource: "milestones",
        path: "/milestones",
        icon: "local_atm",
      },
      {
        name: "Companies",
        resource: "companies",
        path: "/companies",
        icon: "zoom_in",
      },
      {
        name: "Leadership",
        resource: "leadership",
        path: "/leadership",
        icon: "public",
      },
    ],
  },
]
export default function HomePage() {
  return (
    <Groups
      title="Home"
      groups={items}
      className="view-container menu"
      groupClass="row group hr-height-1"
      headerClass="col s12 m12"
      subClass="col s6 m6 l3 xl2 group-span"
    />
  )
}
