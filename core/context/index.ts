import { createLogger } from "logger-core"
import { Pool } from "pg"
import { PoolManager } from "pg-extension"
import { log } from "query-core"
import { config } from "../../config"
import { useContext } from "../../service"

const cfg = config

const logger = createLogger(cfg.log)
const pool = new Pool(cfg.db)
const db = log(new PoolManager(pool), cfg.log.db, logger, "sql")
const ctx = useContext(db)

export default ctx
