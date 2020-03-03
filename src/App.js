import React from 'react'
import Navbar from './js/Navbar'
import info from './js/bg.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import './css/toggle.css'
import { navigate } from 'hookrouter'

export default class App extends React.Component {
  state = { initialized: false, filter: '' }

  onInit = () => this.setState({ initialized: true })

  handleFilter = ev => {
    this.setState({ filter: ev.target.value, initialized: false })
  }

  render () {
    let includeType, sliced
    if (this.props.game) {
      if (!this.props.modal) {
        if (!info[this.props.game][this.props.device]) navigate(`/Destiny 1/${this.props.device}`)
        else if (!info[this.props.game][this.props.device][this.props.type]) navigate(`/Destiny 1/${this.props.device}`)
      }

      includeType = info[this.props.game][this.props.device][this.props.type] !== undefined
      const filter = e => e.toLowerCase().includes(this.state.filter.toLowerCase())

      let bgs = includeType
        ? info[this.props.game][this.props.device][this.props.type]
        : info[this.props.game][this.props.device]

      if (this.state.filter !== '') bgs = bgs.filter(filter)
      sliced = this.props.device === 'Desktop'
        ? [
          bgs.slice(0, Math.ceil(bgs.length / 3)),
          bgs.slice(Math.ceil(bgs.length / 3), Math.ceil(bgs.length / 3) * 2),
          bgs.slice(Math.ceil(bgs.length / 3) * 2, bgs.length)
        ]
        : [
          bgs.slice(0, Math.ceil(bgs.length / 2)),
          bgs.slice(Math.ceil(bgs.length / 2), bgs.length)
        ]
    }

    return (
      <>
        <Navbar handleDevice={this.onHandleDevice} onHandleType={this.handleType} device={this.props.device} game={this.props.game} type={this.props.type} onHandleFilter={this.handleFilter} />

        <this.props.pageComponent modal={this.props.modal} filter={this.state.filter} includeType={includeType} type={this.props.type} game={this.props.game} device={this.props.device} initialized={this.state.initialized} handleInit={this.onInit} images={sliced} />

        <footer className='footer'>
          <div className='container-fluid'>
            <div className='row '>
              <div className='d-flex justify-content-center align-items-center'>
                <img className='logo-img' src='/img/assets/logo.png' />
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
