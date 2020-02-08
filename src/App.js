import React from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import Gallery from './js/Gallery'
import info from './js/bg.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import './css/toggle.css'

class DeviceToggle extends React.Component {
  render () {
    return (
      <Navbar.Text className={this.props.className}>
        <img src='/img/assets/laptop.png' alt='' />
        <button type='button' onClick={this.props.handleDevice} className={`btn btn-toggle ${this.props.active ? 'active' : null}`}>
          <div className='handle' />
        </button>
        <img src='/img/assets/phone.png' alt='' />
      </Navbar.Text>
    )
  }
}

class NavDropdownHover extends React.Component {
  state = { show: false }

  checkMedia = () => { return window.matchMedia('(min-width: 768px)').matches }

  handleHover= () => { if (this.checkMedia()) this.setState({ show: true }) }
  handleLeave = () => { if (this.checkMedia()) this.setState({ show: false }) }

  handleClick= () => { if (!this.checkMedia()) this.setState({ show: true }) }
  handleClickOff = () => { if (!this.checkMedia()) this.setState({ show: false }) }

  render () {
    return (
      <div onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover} className={`dropdown nav-item ${this.props.game === this.props.title ? 'current' : ''} ${this.state.show ? 'show' : ''}`}>
        <a aria-haspopup='true' onClick={this.props.onClick} aria-expanded={this.state.show} className='dropdown-toggle nav-link' role='button'>{this.props.title}</a>
        <div aria-labelledby='' className={`dropdown-menu ${this.state.show ? 'show' : ''}`}>{this.props.children}</div>
      </div>
    )
  }
}
class NavDropdownHoverItem extends React.Component {
  render () {
    return (
      <a className={`dropdown-item ${this.props.game === this.props.currentGame && this.props.type === this.props.title ? 'current' : ''}`} onClick={() => this.props.onHandleType(this.props.title, this.props.game)}>{this.props.title}</a>
    )
  }
}

export default class App extends React.Component {
  state = { game: 'Destiny 1', device: 'Desktop', type: '', initialized: false }

  onInit = () => this.setState({ initialized: true })
  onHandleDevice = () => {
    if (this.state.device === 'Desktop') this.setState({ device: 'Mobile', initialized: false })
    else this.setState({ device: 'Desktop', initialized: false })
  }

  handleType = (type, game) => {
    this.setState({ type: type, game: game, initialized: false })
  }

  render () {
    const includeType = info[this.state.game][this.state.device][this.state.type] !== undefined
    const bgs = includeType
      ? info[this.state.game][this.state.device][this.state.type]
      : info[this.state.game][this.state.device]
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
        <div>
          <Navbar bg='dark' variant='dark' expand='sm'>

            <Navbar.Brand href='#home'>
              <img
                src='/img/assets/tricorn.png'
                className='d-inline-block align-top'
                alt='Tricorn Logo'
                style={{ height: '30px' }}
              />
            </Navbar.Brand>
            <DeviceToggle handleDevice={this.onHandleDevice} className='d-sm-none' active={this.state.device === 'Mobile'} />

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto nav-pills'>
                <NavDropdownHover title='Destiny 1' game={this.state.game} onClick={() => this.handleType('', 'Destiny 1')}>
                  <NavDropdownHoverItem title='DOWNLOAD ALL' />
                </NavDropdownHover>

                <NavDropdownHover title='Destiny 2' game={this.state.game}>
                  <NavDropdownHoverItem title='Emblems' currentGame={this.state.game} game='Destiny 2' type={this.state.type} onHandleType={this.handleType} />
                  <NavDropdownHoverItem title='Seals' currentGame={this.state.game} game='Destiny 2' type={this.state.type} onHandleType={this.handleType} />
                  <NavDropdownHoverItem title='Bonus' currentGame={this.state.game} game='Destiny 2' type={this.state.type} onHandleType={this.handleType} />
                  <NavDropdownHoverItem title='DOWNLOAD ALL' />
                </NavDropdownHover>
                <Nav.Item>
                  <DeviceToggle handleDevice={this.onHandleDevice} className='d-none d-sm-inline-block deviceRow' active={this.state.device === 'Mobile'} />
                </Nav.Item>
              </Nav>
              <Form inline>
                <FormControl type='text' placeholder='Search' className='mr-sm-2' />
              </Form>
            </Navbar.Collapse>

          </Navbar>

        </div>

        <Gallery includeType={includeType} type={this.state.type} game={this.state.game} device={this.state.device} initialized={this.state.initialized} handleInit={this.onInit} images={sliced} />
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
              <div className='col-4 fitty'>
                <div className='fitty'>GENERAL INFO</div>
              </div>
              <div className='col-4 fitty'>
                <div className='fitty'>Part 1</div>
              </div>
              <div className='col-4'>
                <div className='fitty'>WEBSITE POWERED BY @CHITOWARLOCK</div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}
