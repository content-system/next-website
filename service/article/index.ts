import { SearchResult } from "onecore"
import { DB } from "query-core"
import { Article, ArticleFilter, ArticleRepository, ArticleService } from "./article"
import { SqlArticleRepository } from "./repository"
export * from "./article"

export class ArticleUseCase implements ArticleService {
  constructor(private repository: ArticleRepository) {
  }
  search(filter: ArticleFilter, limit: number, page?: number, fields?: string[]): Promise<SearchResult<Article>> {
    return this.repository.search(filter, limit, page, fields)
  }
  load(id: string, userId?: string): Promise<Article | null> {
    return this.repository.load(id, userId)
  }
}

export function useArticleService(db: DB): ArticleService {
  const repository = new SqlArticleRepository(db)
  return new ArticleUseCase(repository)
}
