// https://github.com/michael-ciniawsky/postcss-load-config
var salad = require('postcss-salad')(require('./salad.config.json'));
module.exports = {
  "plugins":[salad]
}
