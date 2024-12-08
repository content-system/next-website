import { Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { Job, JobFilter, jobModel, JobRepository, JobService } from "./job"
export * from "../job"

export class SqlJobRepository extends Repository<Job, string> implements JobRepository {
  constructor(db: DB) {
    super(db, "jobs", jobModel)
  }
}
export class JobManager extends Manager<Job, string, JobFilter> implements JobService {
  constructor(search: Search<Job, JobFilter>, repository: JobRepository) {
    super(search, repository)
  }
}

export function useJobService(db: DB): JobService {
  const builder = new SearchBuilder<Job, JobFilter>(db.query, "jobs", jobModel, db.driver)
  const repository = new SqlJobRepository(db)
  return new JobManager(builder.search, repository)
}
