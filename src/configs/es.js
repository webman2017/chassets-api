const { Client } = require('@elastic/elasticsearch')
const client = new Client({
   node: ['http://18.143.21.191:9200', 'http://18.143.21.191:9300'],
})

module.exports = client
