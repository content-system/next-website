import { db } from "@lib/db"
import { SearchResult } from "onecore"
import { DB } from "query-core"
import { Job, JobFilter, JobRepository, JobService } from "./job"
import { SqlJobRepository } from "./repository"
export * from "./job"

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

let jobService: JobService | undefined
export function getJobService(): JobService {
  if (!jobService) {
    jobService = useJobService(db)
  }
  return jobService
}
