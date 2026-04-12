import { createLogger, Logger } from "logger-core"
import { config } from "../config"

export const globalForDB = globalThis as unknown as {
  logger?: Logger
}
export function getLogger(): Logger {
  console.log("enter get Logger")
  return createLogger(config.log)
}
export const logger = globalForDB.logger ?? getLogger()

if (process.env.NODE_ENV !== "production") {
  globalForDB.logger = logger
}

export function toString(v: any): string {
  if (typeof v === "string") {
    return v
  } else {
    return JSON.stringify(v)
  }
}
