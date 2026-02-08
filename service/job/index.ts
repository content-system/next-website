import { SearchResult } from "onecore"
import { DB, SearchRepository } from "query-core"
import { Job, JobFilter, jobModel, JobRepository, JobService } from "./job"
import { buildQuery } from "./query"
export * from "./job"

export class SqlJobRepository extends SearchRepository<Job, JobFilter> implements JobRepository {
  constructor(db: DB) {
    super(db, "jobs", jobModel, buildQuery)
  }
  async load(id: string): Promise<Job | null> {
    const query = `select * from jobs where slug = ${this.db.param(1)}`
    const jobs = await this.db.query<Job>(query, [id], this.map)
    return jobs && jobs.length > 0 ? jobs[0] : null
  }
}

export class JobUseCase implements JobService {
  constructor(private repository: JobRepository) {}
  search(filter: JobFilter, limit: number, page?: number, fields?: string[]): Promise<SearchResult<Job>> {
    return this.repository.search(filter, limit, page, fields)
  }
  load(id: string): Promise<Job | null> {
    return this.repository.load(id)
  }
}

export function useJobService(db: DB): JobService {
  const repository = new SqlJobRepository(db)
  return new JobUseCase(repository)
}
