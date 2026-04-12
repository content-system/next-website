import { DB } from "onecore"
import { Pool } from "pg"
import { PoolManager } from "pg-extension"

const globalForDB = globalThis as unknown as {
  pgPool?: Pool
  db?: DB
}

export const pool = globalForDB.pgPool ?? new Pool({ connectionString: "postgres://postgres:abcd1234@localhost/cms", max: 10 })
export const db = globalForDB.db ?? new PoolManager(new Pool({ connectionString: "postgres://postgres:abcd1234@localhost/cms", max: 10 }))

if (process.env.NODE_ENV !== "production") {
  globalForDB.pgPool = pool
  globalForDB.db = db
}
