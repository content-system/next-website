import { Authenticator, initializeStatus, SqlAuthTemplateConfig, User, useUserRepository } from "authen-service"
import { compare } from "bcryptjs"
import { StringMap } from "onecore"
import { Pool } from "pg"
import { PoolManager } from "pg-extension"
import { DB } from "query-core"
import { config } from "../config"
import { ArticleService, useArticleService } from "./article"
import { ContactService, useContactService } from "./contact"
import { ContentService, useContentService } from "./content"
import { useJobService } from "./job"
import { JobService } from "./job/job"
import { MenuItemLoader } from "./menu"

export interface ApplicationContext {
  authenticator: Authenticator<User, string>
  menu: MenuItemLoader
  content: ContentService
  article: ArticleService
  job: JobService
  contact: ContactService
}

export function useContext(db: DB, auth: SqlAuthTemplateConfig, map: StringMap): ApplicationContext {
  const status = initializeStatus(auth.status)
  const userRepository = useUserRepository<string, SqlAuthTemplateConfig>(db, auth, map)
  const authenticator = new Authenticator(status, compare, auth.account, userRepository, undefined, auth.lockedMinutes, auth.maxPasswordFailed)

  const menu = new MenuItemLoader(db.query, "select id, name, path, resource_key as resource, icon, sequence, type, parent from categories where status = 'A'")
  
  const content = useContentService(db)
  const article = useArticleService(db)
  const job = useJobService(db)
  const contact = useContactService(db)

  return { authenticator, menu, content, article, job, contact }
}

const cfg = config

const pool = new Pool(cfg.db)
const db = new PoolManager(pool)
export const ctx = useContext(db, cfg.auth, cfg.map)
