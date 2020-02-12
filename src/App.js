import React from 'react'
import Gallery from './js/Gallery'
import Navbar from './js/Navbar'
import info from './js/bg.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import './css/toggle.css'

export default class App extends React.Component {
  state = { game: 'Destiny 1', device: 'Desktop', type: '', initialized: false, filter: '' }

  onInit = () => this.setState({ initialized: true })
  onHandleDevice = () => {
    if (this.state.device === 'Desktop') this.setState({ device: 'Mobile', initialized: false })
    else this.setState({ device: 'Desktop', initialized: false })
  }

  handleType = (type, game) => {
    this.setState({ type: type, game: game, initialized: false })
  }

  handleFilter = ev => {
    this.setState({ filter: ev.target.value, initialized: false })
  }

  render () {
    const includeType = info[this.state.game][this.state.device][this.state.type] !== undefined
    const filter = e => e.toLowerCase().includes(this.state.filter.toLowerCase())

    let bgs = includeType
      ? info[this.state.game][this.state.device][this.state.type]
      : info[this.state.game][this.state.device]

    if (this.state.filter !== '') bgs = bgs.filter(filter)
    const sliced = this.state.device === 'Desktop'
      ? [
        bgs.slice(0, Math.ceil(bgs.length / 3)),
        bgs.slice(Math.ceil(bgs.length / 3), Math.ceil(bgs.length / 3) * 2),
        bgs.slice(Math.ceil(bgs.length / 3) * 2, bgs.length)
      ]
      : [
        bgs.slice(0, Math.ceil(bgs.length / 2)),
        bgs.slice(Math.ceil(bgs.length / 2), bgs.length)
      ]

    return (
      <>
        <Navbar handleDevice={this.onHandleDevice} onHandleType={this.handleType} device={this.state.device} game={this.state.game} type={this.state.type} onHandleFilter={this.handleFilter} />

        <Gallery filter={this.state.filter} includeType={includeType} type={this.state.type} game={this.state.game} device={this.state.device} initialized={this.state.initialized} handleInit={this.onInit} images={sliced} />
        {/* <footer className='footer'>
          <div className='col-md-4' style={{ textAlign: 'left' }}>

            <span className='text-muted'>GENERAL INFO</span>

          </div>

          <div className='col-md-4' style={{ textAlign: 'center' }}>
            <span className='text-muted'>Part 2</span>

          </div>

          <div className='col-md-4' style={{ textAlign: 'right' }}>

            <span className='text-muted'>WEBSITE POWERED BY @CHITOWARLOCK </span>

          </div>
    </footer> */}
        <footer className='footer'>
          <div className='container-fluid'>
            <div className='row '>
              <div className='d-flex justify-content-center align-items-center'>
                <img className='logo-img' src='img/assets/logo.png' />
              </div>
              <div className='d-none d-sm-block ml-auto' style={{ fontSize: '13.5px' }}>
                WEBSITE POWERED BY @CHITOWARLOCK
              </div>
              <div className='d-block d-sm-none ml-auto' style={{ fontSize: '10px' }}>WEBSITE BY @CHITOWARLOCK</div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}
