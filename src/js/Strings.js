const urlToString = {
  destiny1: 'Destiny 1',
  destiny2: 'Destiny 2',
  desktop: 'Desktop',
  mobile: 'Mobile',
  emblems: 'Emblems',
  seals: 'Seals',
  bonus: 'Bonus'
}

const stringToUrl = {}
Object.keys(urlToString).forEach(url => {
  stringToUrl[urlToString[url]] = url
})

export { stringToUrl, urlToString }
