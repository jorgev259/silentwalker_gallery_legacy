const glob = require('glob')
const write = require('write-json-file')
const items = {}

glob.sync('./public/img/fullres/**/*', { nodir: true }).forEach(e => {
  const data = e.replace('./public/img/fullres/', '').split('/')
  if (data.length === 3) {
    const [game, device, name] = data
    if (!items[game]) items[game] = {}
    if (!items[game][device]) items[game][device] = []
    items[game][device].push(name)
  } else {
    const [game, device, type, name] = data
    if (!items[game]) items[game] = {}
    if (!items[game][device]) items[game][device] = {}
    if (!items[game][device][type]) items[game][device][type] = []
    items[game][device][type].push(name)
  }
})

write('./src/js/bg.json', items)
