import { SearchResult } from "onecore"
import { DB, SearchRepository } from "query-core"
import { Article, ArticleFilter, articleModel, ArticleRepository, ArticleService } from "./article"
import { buildQuery } from "./query"
export * from "./article"

export class SqlArticleRepository extends SearchRepository<Article, ArticleFilter> implements ArticleRepository {
  constructor(db: DB) {
    super(db.query, "articles", articleModel, db.driver, buildQuery)
  }
  async load(id: string, userId?: string): Promise<Article | null> {
    const params = []
    let query: string
    if (userId && userId.length > 0) {
      query = `select a.*, sa.saved_at 
        from articles a 
        left join saved_articles sa 
          on sa.id = a.id and sa.user_id = ${this.param(1)} where a.slug = ${this.param(2)}`
      params.push(userId)
    } else {
      query = `select a.* from articles a where a.slug = ${this.param(1)}`
    }
    params.push(id)
    const articles = await this.query<Article>(query, params, this.map)
    return articles && articles.length > 0 ? articles[0] : null
  }
}

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
