import React from 'react'
import { Navbar, NavbarText, NavItem, NavbarToggler, NavbarBrand, Nav, Form, Input, Collapse } from 'reactstrap'

export default class NavbarHeader extends React.Component {
  state={ collapsed: true }
  render () {
    return (
      <Navbar bg='dark' variant='dark' expand='sm'>

        <NavbarBrand href='#home'>
          <img
            src='img/assets/tricorn.png'
            className='d-inline-block align-top'
            alt='Tricorn Logo'
            style={{ height: '30px' }}
          />
        </NavbarBrand>
        <DeviceToggle handleDevice={this.onHandleDevice} className='d-sm-none' active={this.props.device === 'Mobile'} />

        <NavbarToggler aria-controls='basic-navbar-nav' onClick={() => this.setState({ collapsed: this.state.collapsed })} />
        <Collapse id='basic-navbar-nav' navbar isOpen={!this.state.collapsed}>
          <Nav className='mr-auto nav-pills' navbar>
            <NavDropdownHover title='Destiny 1' game={this.props.game} onClick={() => this.onHandleType('', 'Destiny 1')}>
              <NavDropdownHoverItem title='DOWNLOAD ALL' />
            </NavDropdownHover>

            <NavDropdownHover title='Destiny 2' game={this.props.game}>
              <NavDropdownHoverItem title='Emblems' currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='Seals' currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='Bonus' currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='DOWNLOAD ALL' />
            </NavDropdownHover>
            <NavItem>
              <DeviceToggle onHandleDevice={this.props.handleDevice} className='d-none d-sm-inline-block deviceRow' active={this.props.device === 'Mobile'} />
            </NavItem>
          </Nav>
          <Form inline>
            <Input type='text' placeholder='Search' className='mr-sm-2' onChange={this.props.onHandleFilter} />
          </Form>
        </Collapse>

      </Navbar>
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

class DeviceToggle extends React.Component {
  render () {
    return (
      <NavbarText className={this.props.className}>
        <img src='img/assets/laptop.png' alt='' />
        <button type='button' onClick={this.props.onHandleDevice} className={`btn btn-toggle ${this.props.active ? 'active' : null}`}>
          <div className='handle' />
        </button>
        <img src='img/assets/phone.png' alt='' />
      </NavbarText>
    )
  }
}
