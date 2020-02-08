const gm = require('gm')
const fs = require('fs-extra')

const glob = require('glob')

var thumbs = glob.sync('./public/img/thumbs/**/*', { nodir: true })
var files = glob.sync('./public/img/fullres/**/*', { nodir: true }).filter(e => !thumbs.includes(e.replace('/fullres/', '/thumbs/')))
console.log(`Files found: ${files.length}`)
runLoop()

function runLoop () {
  if (files.length === 0) process.exit()
  var file = files.shift()
  var fileArray = file.split('/')

  fileArray.pop()
  var dir = fileArray.join('/').replace('/fullres/', '/thumbs/')

  fs.ensureDirSync(dir)

  gm(file)
    .resize(null, 400) // This will resize the height while maintaining the aspect ratio
    .quality(50)
    .write(file.replace('/fullres/', '/thumbs/'), (err) => {
      if (err) {
        console.log(err)
        console.log(`File '${file}': Failed\nRemaining files: ${files.length}`)
      } else {
        console.log(`File '${file}': Succesful\nRemaining files: ${files.length}`)
      }

      runLoop()
    })
}
