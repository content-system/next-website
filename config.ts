export const config = {
  port: 3000,
  log: {
    level: "info",
    map: {
      time: "@timestamp",
      msg: "message",
    },
  },
  db: {
    url: "postgres://postgres:abcd1234@localhost/cms",
    max: 10,
  },
}

export const env = {
  prd: {
    log: {
      level: "error",
    },
  },
}
