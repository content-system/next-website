import { Attribute, Attributes } from "onecore"

export function printObject(obj: any): void {
  const keys = Object.keys(obj)
  for (const k of keys) {
    const v = obj[k]
    console.log("key " + k + ": " + v)
  }
}
export function fromFormData<T>(formData: FormData, attrs: Attributes, includeUndefine?: boolean, includeErrorForNumbers?: boolean): T {
  const obj = {} as any
  const keys = formData.keys()
  for (const key of keys) {
    const attr: Attribute = attrs[key]
    const v = formData.get(key)
    if (attr) {
      obj[key] = v
      if (v && typeof v === "string") {
        if (attr.type === "number" || attr.type === "integer") {
          if (!isNaN(v as any)) {
            obj[key] = parseFloat(v)
          }
        } else if (attr.type === "datetime" || attr.type === "date") {
          const d = new Date(v)
          if (d.toString() !== "Invalid Date") {
            obj[key] = d
          }
        } else if (attr.type === "boolean") {
          obj[key] = v === "true"
        } else if (attr.type === "strings") {
          obj[key] = v.split(",")
        } else if (attr.type === "integers" || attr.type === "numbers") {
          const s = v.split(",")
          const nums = []
          for (let i = 0; i < s.length; i++) {
            if (!isNaN(s[i] as any)) {
              const num = parseFloat(s[i])
              nums.push(num)
            } else if (includeErrorForNumbers) {
              nums.push(s[i])
            }
          }
          obj[key] = nums
        }
      }
    } else if (includeUndefine) {
      obj[key] = v
    }
  }
  return obj
}
