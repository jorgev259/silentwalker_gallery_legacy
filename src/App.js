import React from 'react'
import Navbar from './js/Navbar'
import info from './js/bg.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import './css/toggle.css'
import { navigate } from 'hookrouter'

export default class App extends React.Component {
  state = { filter: '', device: this.props.device || 'Desktop' }

  setDevice = device => this.setState({ device: device })

  handleFilter = ev => {
    this.setState({ filter: ev.target.value, initialized: false })
  }

  render () {
    let includeType, bgs
    if (this.props.game) {
      if (!this.props.modal) {
        if (!info[this.props.game][this.state.device]) navigate(`/Destiny 2/${this.state.device}/Emblems`)
        else if (!info[this.props.game][this.state.device][this.props.type]) navigate(`/Destiny 2/${this.state.device}/Emblems`)
      }

      includeType = info[this.props.game][this.state.device][this.props.type] !== undefined
      const filter = e => e.toLowerCase().includes(this.state.filter.toLowerCase())

      bgs = includeType
        ? info[this.props.game][this.state.device][this.props.type]
        : info[this.props.game][this.state.device]

      if (this.state.filter !== '') bgs = bgs.filter(filter)
    }

    return (
      <>
        <Navbar setDevice={this.setDevice} device={this.state.device} game={this.props.game} type={this.props.type} onHandleFilter={this.handleFilter} />

        <this.props.pageComponent modal={this.props.modal} filter={this.state.filter} includeType={includeType} type={this.props.type} game={this.props.game} device={this.state.device} initialized={this.state.initialized} handleInit={this.onInit} images={bgs} />

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
        }
      </>
    )
  }
}
