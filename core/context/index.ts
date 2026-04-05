import { Pool } from "pg"
import { PoolManager } from "pg-extension"
import { config } from "../../config"
import { useContext } from "../../service"

const cfg = config

const pool = new Pool(cfg.db)
const db = new PoolManager(pool)
const ctx = useContext(db, cfg.auth, cfg.map)

export default ctx
