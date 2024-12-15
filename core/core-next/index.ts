export function printObject(obj: any): void {
  const keys = Object.keys(obj)
  for (const k of keys) {
    const v = obj[k]
    console.log("key " + k + ": " + v)
  }
}
