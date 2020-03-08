import React from 'react'
import { NavLink, Navbar, NavbarText, NavItem, NavbarToggler, NavbarBrand, Nav, Form, Input, Collapse } from 'reactstrap'
import { navigate } from 'hookrouter'

export default class NavbarHeader extends React.Component {
  state={ collapsed: true }
  render () {
    return (
      <Navbar dark bg='dark' variant='dark' expand='sm'>

        <NavbarBrand href='#home'>
          <img
            src='/img/assets/tricorn.png'
            className='d-inline-block align-top'
            alt='Tricorn Logo'
            style={{ height: '30px' }}
          />
        </NavbarBrand>
        <DeviceToggle toggle={this.props.toggle} game={this.props.game} device={this.props.device} type={this.props.type} onHandleDevice={this.props.handleDevice} className='d-sm-none' active={this.props.device === 'Mobile'} />

        <NavbarToggler onClick={() => this.setState({ collapsed: !this.state.collapsed })} />
        <Collapse id='basic-navbar-nav' navbar isOpen={!this.state.collapsed}>
          <Nav className='mr-auto nav-pills' navbar>
            <NavDropdownHover title='Destiny 1' game={this.props.game} url={`/Destiny 1/${this.props.device || 'Desktop'}`}>
              <NavDropdownHoverItem title='DOWNLOAD ALL' />
            </NavDropdownHover>

            <NavDropdownHover title='Destiny 2' game={this.props.game} url={`/Destiny 2/${this.props.device || 'Desktop'}/Emblems`}>
              <NavDropdownHoverItem title='Emblems' url={`/Destiny 2/${this.props.device || 'Desktop'}/Emblems`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='Seals' url={`/Destiny 2/${this.props.device || 'Desktop'}/Seals`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='Bonus' url={`/Destiny 2/${this.props.device || 'Desktop'}/Bonus`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem title='DOWNLOAD ALL' />
            </NavDropdownHover>
            <NavItem>
              <NavLink onClick={() => navigate('/clanbanners')}>CLAN BANNERS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('/info')}>INFO</NavLink>
            </NavItem>
            <NavItem>
              <DeviceToggle toggle={this.props.toggle} game={this.props.game} device={this.props.device} type={this.props.type} onHandleDevice={this.props.handleDevice} className='d-none d-sm-inline-block deviceRow' active={this.props.device === 'Mobile'} />
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
      <a className={`dropdown-item ${this.props.game === this.props.currentGame && this.props.type === this.props.title ? 'current' : ''}`} onClick={() => navigate(this.props.url)}>{this.props.title}</a>
    )
  }
}

class NavDropdownHover extends React.Component {
    state = { show: false }

    checkMedia = () => { return window.matchMedia('(min-width: 768px)').matches }

    handleHover= () => { if (this.checkMedia()) this.setState({ show: true }) }
    handleLeave = () => { if (this.checkMedia()) this.setState({ show: false }) }

    handleClick= () => {
      if (this.props.url) navigate(this.props.url)
    }
    // handleClickOff = () => { if (!this.checkMedia()) this.setState({ show: false }) }

    render () {
      return (
        <div onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover} className={`dropdown nav-item ${this.props.game === this.props.title ? 'current' : ''} ${this.state.show || !this.checkMedia() ? 'show' : ''}`}>
          <a aria-haspopup='true' onClick={this.handleClick} aria-expanded={this.state.show} className='dropdown-toggle nav-link' role='button'>{this.props.title}</a>
          <div aria-labelledby='' className={`dropdown-menu ${this.state.show || !this.checkMedia() ? 'show' : ''}`}>{this.props.children}</div>
        </div>
      )
    }
}

class DeviceToggle extends React.Component {
  handleToggle = () => {
    const device = this.props.device === 'Desktop' ? 'Mobile' : 'Desktop'
    if (this.props.type) navigate(`/${this.props.game}/${device}/${this.props.type}`)
    else navigate(`/${this.props.game}/${device}`)
  }

  render () {
    return this.props.toggle !== false ? (
      <NavbarText className={this.props.className}>
        <img src='/img/assets/laptop.png' alt='' />
        <button type='button' onClick={this.handleToggle} className={`btn btn-toggle ${this.props.active ? 'active' : null}`}>
          <div className='handle' />
        </button>
        <img src='/img/assets/phone.png' alt='' />
      </NavbarText>
    ) : null
  }
}
