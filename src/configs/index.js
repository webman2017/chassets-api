const models = require("./../models")

module.exports = {
  server: {
    PORT: 9143,
  },
  db: models,
  secret: 'hubexpress'
}
