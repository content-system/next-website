import { en as adminEN } from "./admin/en"
import { vi as adminVI } from "./admin/vi"
import { en as authenticationEN } from "./authentication/en"
import { vi as authenticationVI } from "./authentication/vi"
import { en as commonEN } from "./en"
import { vi as commonVI } from "./vi"

export interface Resource {
  resource(): StringMap
  value(key: string, param?: any): string
  format(f: string, ...args: any[]): string
}
export interface StringMap {
  [key: string]: string
}
export interface Resources {
  [key: string]: StringMap
}

const en: StringMap = {
  ...commonEN,
  ...authenticationEN,
  ...adminEN,
}
const vi: StringMap = {
  ...commonVI,
  ...authenticationVI,
  ...adminVI,
}

export const resources: Resources = {
  en: en,
  vi: vi,
}

export function getResource(lang?: string | null): StringMap {
  const l = lang ? lang : "en"
  const r = resources[l]
  return r ? r : resources["en"]
}

export function getLangByPath(path?: string | null): string {
  if (!path) {
    return "en"
  }
  return path === "/vi" || path.startsWith("/vi/") ? "vi" : "en"
}
export function getLang(record: Record<string, string | string[] | undefined>): string {
  const x = record["lang"]
  if (!x) {
    return "en"
  }
  if (Array.isArray(x)) {
    if (x.length > 0) {
      return getLangByString(x[x.length - 1])
    } else {
      return "en"
    }
  }
  return getLangByString(x)
}
function getLangByString(s?: string | null): string {
  if (!s) {
    return "en"
  }
  if (s !== "vi") {
    return "en"
  }
  return s
}
