import { DB } from "query-core"
import { ArticleService, useArticleService } from "./article"
import { useJobService } from "./job"
import { JobService } from "./job/job"

export interface ApplicationContext {
  article: ArticleService
  job: JobService
}
export function useContext(db: DB): ApplicationContext {
  const job = useJobService(db)
  const article = useArticleService(db)

  return { article, job }
}
