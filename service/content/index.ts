import { DB } from "query-core"
import { Content, ContentRepository, ContentService } from "./content"
export * from "./content"

export class SqlContentRepository implements ContentRepository {
  constructor(protected db: DB) {}
  async load(id: string, lang: string): Promise<Content | null> {
    const sql = `select id, lang, body from contents where id = ${this.db.param(1)} and lang = ${this.db.param(2)}`
    const contents = await this.db.query<Content>(sql, [id, lang])
    return contents.length === 0 ? null : contents[0]
  }
}

export class ContentUseCase implements ContentService {
  constructor(protected repository: ContentRepository) {}
  async load(id: string, lang: string): Promise<Content | null> {
    const content = await this.repository.load(id, lang)
    if (!content) {
      return this.repository.load(id, "en")
    }
    return content
  }
}

export function useContentService(db: DB): ContentService {
  const repository = new SqlContentRepository(db)
  return new ContentUseCase(repository)
}
