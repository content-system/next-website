export class resources {
  static limits = [12, 24, 60, 100, 120, 180, 300, 600]
  static page = "page"
  static limit = "limit"
  static defaultLimit = 12
}
export function removePage(obj: any): string {
  const arr: string[] = []
  const keys = Object.keys(obj)
  for (const k of keys) {
    if (k !== resources.page) {
      const v = obj[k]
      arr.push("" + k + "=" + v)
      console.log("key " + k + ": " + v)
    }
  }
  return arr.length === 0 ? "" : arr.join("&")
}
export type SearchParams = {
  q?: string
  page?: string
  limit?: string
}
export function getDateFormat(profile?: string): string {
  return "M/D/YYYY"
}
export function getPage(page?: string): number {
  return getNumber(page, 1)
}
export function getNumber(num?: string, defaultNum?: number): number {
  if (!num) {
    if (defaultNum && defaultNum > 0) {
      return defaultNum
    } else {
      return 12
    }
  } else {
    if (!isNaN(num as any)) {
      const i = parseInt(num, 10)
      return i > 0 ? i : 12
    } else {
      return 12
    }
  }
}
export function printObject(obj: any): void {
  const keys = Object.keys(obj)
  for (const k of keys) {
    const v = obj[k]
    console.log("key " + k + ": " + v)
  }
}
export function clone(obj: any): any {
  if (!obj) {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }
  if (typeof obj !== "object") {
    return obj
  }
  if (Array.isArray(obj)) {
    const arr = []
    for (const sub of obj) {
      const c = clone(sub)
      arr.push(c)
    }
    return arr
  }
  const x: any = {}
  const keys = Object.keys(obj)
  for (const k of keys) {
    const v = obj[k]
    if (v instanceof Date) {
      x[k] = new Date(v.getTime())
    } else {
      switch (typeof v) {
        case "object":
          x[k] = clone(v)
          break
        default:
          x[k] = v
          break
      }
    }
  }
  return x
}

export function datetimeToString(date: Date | string = ""): string {
  const d2 = typeof date !== "string" ? date : new Date(date)
  const year = d2.getFullYear()
  const month = String(d2.getMonth() + 1).padStart(2, "0")
  const day = String(d2.getDate()).padStart(2, "0")
  const hours = String(d2.getHours()).padStart(2, "0")
  const minutes = String(d2.getMinutes()).padStart(2, "0")
  const seconds = String(d2.getSeconds()).padStart(2, "0")
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export function formatDate(d: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!d) {
    return ""
  }
  let format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY"
  if (upper) {
    format = format.toUpperCase()
  }
  let arr = ["", "", ""]
  const items = format.split(/\/|\.| |-/)
  let iday = items.indexOf("D")
  let im = items.indexOf("M")
  let iyear = items.indexOf("YYYY")
  let fm = full ? full : false
  let fd = full ? full : false
  let fy = true
  if (iday === -1) {
    iday = items.indexOf("DD")
    fd = true
  }
  if (im === -1) {
    im = items.indexOf("MM")
    fm = true
  }
  if (iyear === -1) {
    iyear = items.indexOf("YY")
    fy = full ? full : false
  }
  arr[iday] = getD(d.getDate(), fd)
  arr[im] = getD(d.getMonth() + 1, fm)
  arr[iyear] = getYear(d.getFullYear(), fy)
  const s = detectSeparator(format)
  const e = detectLastSeparator(format)
  const l = items.length === 4 ? format[format.length - 1] : ""
  return arr[0] + s + arr[1] + e + arr[2] + l
}
function detectSeparator(format: string): string {
  const len = format.length
  for (let i = 0; i < len; i++) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function detectLastSeparator(format: string): string {
  const len = format.length - 3
  for (let i = len; i > -0; i--) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
export function getYear(y: number, full?: boolean): string {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString()
  }
  const s = y.toString()
  return s.substring(s.length - 2)
}
function getD(n: number, fu: boolean): string {
  return fu ? pad(n) : n.toString()
}
export function formatDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return ""
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatTime(date)
}
export function formatLongDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return ""
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}
export function formatFullDateTime(date: Date | null | undefined, dateFormat?: string, s?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return ""
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatFullTime(date, s)
}
export function formatTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes())
}
export function formatLongTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
}
export function formatFullTime(d: Date, s?: string): string {
  const se = s && s.length > 0 ? s : "."
  return formatLongTime(d) + se + pad3(d.getMilliseconds())
}
export function dateToString(d: Date, milli?: boolean): string {
  const s = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  if (milli) {
    return s + pad3(d.getMilliseconds())
  }
  return s
}
function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString()
}
function pad3(n: number): string {
  if (n >= 100) {
    return n.toString()
  }
  return n < 10 ? "00" + n : "0" + n.toString()
}
