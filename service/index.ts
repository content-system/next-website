import { Authenticator, initializeStatus, SqlAuthTemplateConfig, User, useUserRepository } from "authen-service"
import { compare } from "bcrypt"
import { generateToken } from "jsonwebtoken-plus"
import { StringMap } from "onecore"
import { DB } from "query-core"
import { ArticleService, useArticleService } from "./article"
import { ContactService, useContactService } from "./contact"
import { useJobService } from "./job"
import { JobService } from "./job/job"

export interface ApplicationContext {
  article: ArticleService
  job: JobService
  contact: ContactService
  authenticator: Authenticator<User, string>
}
export function useContext(db: DB, auth: SqlAuthTemplateConfig, map: StringMap): ApplicationContext {
  const job = useJobService(db)
  const article = useArticleService(db)
  const contact = useContactService(db)

  const status = initializeStatus(auth.status)
  const userRepository = useUserRepository<string, SqlAuthTemplateConfig>(db, auth, map)
  const authenticator = new Authenticator(
    status,
    compare,
    generateToken,
    auth.token,
    auth.payload,
    auth.account,
    userRepository,
    undefined,
    auth.lockedMinutes,
    auth.maxPasswordFailed,
  )
  return { article, job, contact, authenticator }
}
