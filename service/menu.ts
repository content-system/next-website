import { Category, MenuItem, toMenuItems } from "web-one"

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
