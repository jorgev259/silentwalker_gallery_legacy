import React, { useState } from 'react'
import Navbar from './js/Navbar'
import info from './js/bg.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import './css/toggle.css'
import { stringToUrl } from './js/Strings'
import { navigate } from 'hookrouter'

export default function App (props) {
  const [filter, setFilter] = useState('')
  const [device, setDevice] = useState(props.device || 'Desktop')
  const [sort, setSort] = useState('New')
  const [initialized, setInitialized] = useState(false)

  function handleFilter (ev) {
    setFilter(ev.target.value)
    setInitialized(false)
  }

  let bgs = []
  let includeType

  if (props.game) {
    includeType = info[props.game][device] && props.type
    if (!includeType && !info[props.game][device]) navigate(`/destiny2/${stringToUrl[device]}/emblems`)
    if (includeType && !info[props.game][device][props.type]) navigate(`/destiny2/${stringToUrl[device]}/emblems`)

    bgs = includeType
      ? info[props.game][device][props.type]
      : info[props.game][device]

    if (filter !== '') bgs = bgs.filter(e => e[1].toLowerCase().includes(filter.toLowerCase()))
  }
  bgs = sort === 'New'
    ? bgs.sort((a, b) => a[0] - b[0]).reverse()
    : bgs.sort(function (a, b) {
      if (a[1] < b[1]) return -1
      if (a[1] > b[1]) return 1
      return 0
    })
  bgs = bgs.map(e => e[1])

  return (
    <>
      <Navbar setSort={setSort} sort={sort} setDevice={setDevice} device={device} game={props.game} type={props.type} onHandleFilter={handleFilter} />

      <props.pageComponent modal={props.modal} filter={filter} includeType={includeType} type={props.type} game={props.game} device={device} initialized={initialized} images={bgs} />

      <footer className='footer'>
        <div className='container-fluid'>
          <div className='row '>
            <div className='d-flex justify-content-center align-items-center'>
              <img className='logo-img' alt='logo' src='/img/assets/logo.png' />
            </div>
            <div className='d-none d-sm-block ml-auto' style={{ fontSize: '13.5px' }}>
              WEBSITE POWERED BY <a href='https://twitter.com/ChitoWarlock'>@CHITOWARLOCK</a>
            </div>
            <div className='d-block d-sm-none ml-auto' style={{ fontSize: '10px' }}>WEBSITE BY <a href='https://twitter.com/ChitoWarlock'>@CHITOWARLOCK</a></div>
          </div>
        </div>
      </footer>
    </>
  )
}
