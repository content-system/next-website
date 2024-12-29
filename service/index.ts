import { DB } from "query-core"
import { ArticleService, useArticleService } from "./article"
import { ContactService, useContactService } from "./contact"
import { useJobService } from "./job"
import { JobService } from "./job/job"

export interface ApplicationContext {
  article: ArticleService
  job: JobService
  contact: ContactService
}
export function useContext(db: DB): ApplicationContext {
  const job = useJobService(db)
  const article = useArticleService(db)
  const contact = useContactService(db)

  return { article, job, contact }
}
