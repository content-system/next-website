import { createLogger } from "logger-core"
import { Pool } from "pg"
import { PoolManager } from "pg-extension"
import { log } from "query-core"
import { useContext } from "../../service"

export const conf = {
  log: {
    db: true,
    level: "info",
    map: {
      time: "@timestamp",
      msg: "message",
    },
  },
  db: {
    connectionString: "postgres://postgres:abcd1234@localhost/cms",
  },
}

const logger = createLogger(conf.log)
const pool = new Pool(conf.db)
const db = log(new PoolManager(pool), conf.log.db, logger, "sql")
const ctx = useContext(db)

export default ctx
