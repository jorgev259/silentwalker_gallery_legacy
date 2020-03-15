import React from 'react'
import { NavLink, Navbar, NavbarText, NavItem, NavbarToggler, NavbarBrand, Nav, Form, Input, Collapse } from 'reactstrap'
import { navigate as navigateUrl } from 'hookrouter'
import { stringToUrl } from './Strings'

export default class NavbarHeader extends React.Component {
  state={ collapsed: true }

  driveURL = {
    Destiny1: {
      Mobile: 'https://drive.google.com/drive/folders/1d4FLAlJ1Thn3lx3M-PFOrDCbebNAbAGB',
      Desktop: 'https://drive.google.com/drive/folders/1drejXFUS5JIKP2WgqqdM0wSa0kY60cuI'
    },
    Destiny2: {
      Mobile: 'https://drive.google.com/drive/folders/1ZG-3BjxfRiEMq8so0h8G5B2bqXeFx1oK',
      Desktop: 'https://drive.google.com/drive/folders/1__8jBXGy14tL12ciEoqBepwxWeqJaD_7'
    }
  }

  navigate = url => {
    this.setState({ collapsed: true }, () => navigateUrl(url))
  }

  render () {
    return (
      <Navbar fixed='top' dark bg='dark' variant='dark' expand='sm'>

        <NavbarBrand href='#home'>
          <img
            src='/img/assets/tricorn.png'
            className='d-inline-block align-top'
            alt='Tricorn Logo'
            style={{ height: '30px' }}
          />
        </NavbarBrand>
        <DeviceToggle setDevice={this.props.setDevice} navigate={this.navigate} game={this.props.game} device={this.props.device} type={this.props.type} className='d-sm-none' active={this.props.device === 'Mobile'} />
        <SortToggle setSort={this.props.setSort} sort={this.props.sort} className='d-sm-none' active={this.props.sort === 'New'} />

        <NavbarToggler onClick={() => this.setState({ collapsed: !this.state.collapsed })} />
        <Collapse id='basic-navbar-nav' navbar isOpen={!this.state.collapsed}>
          <Form inline className='d-flex d-md-none'>
            <Input type='text' placeholder='Search' className='mr-sm-2' onChange={this.props.onHandleFilter} />
          </Form>

          <Nav className='mr-auto nav-pills' navbar>
            <NavDropdownHover navigate={this.navigate} title='Destiny 1' game={this.props.game} url={`/destiny1/${stringToUrl[this.props.device || 'Desktop']}`}>
              <a className='dropdown-item' href={this.driveURL.Destiny1[this.props.device]} target='_blank' rel='noopener noreferrer'>DOWNLOAD ALL</a>
            </NavDropdownHover>

            <NavDropdownHover navigate={this.navigate} title='Destiny 2' game={this.props.game} url={`/destiny2/${stringToUrl[this.props.device || 'Desktop']}/emblems`}>
              <NavDropdownHoverItem navigate={this.navigate} title='Emblems' url={`/destiny2/${stringToUrl[this.props.device || 'Desktop']}/emblems`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem navigate={this.navigate} title='Seals' url={`/destiny2/${stringToUrl[this.props.device || 'Desktop']}/seals`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <NavDropdownHoverItem navigate={this.navigate} title='Bonus' url={`/destiny2/${stringToUrl[this.props.device || 'Desktop']}/bonus`} currentGame={this.props.game} game='Destiny 2' type={this.props.type} onHandleType={this.props.onHandleType} />
              <a className='dropdown-item' href={this.driveURL.Destiny2[this.props.device]} rel='noopener noreferrer' target='_blank'>DOWNLOAD ALL</a>
            </NavDropdownHover>
            <NavItem>
              <NavLink onClick={() => this.navigate('/clanbanners')}>CLAN BANNERS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => this.navigate('/info')}>INFO</NavLink>
            </NavItem>
            <NavItem>
              <DeviceToggle setDevice={this.props.setDevice} navigate={this.navigate} game={this.props.game} device={this.props.device} type={this.props.type} onHandleDevice={this.props.handleDevice} className='d-none d-sm-inline-block deviceRow' active={this.props.device === 'Mobile'} />
            </NavItem>
            <NavItem>
              <SortToggle setSort={this.props.setSort} sort={this.props.sort} className='d-none d-sm-inline-block deviceRow' active={this.props.sort === 'New'} />
            </NavItem>
          </Nav>

          <Form inline className='d-none d-md-flex'>
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
      <a className={`dropdown-item ${this.props.game === this.props.currentGame && this.props.type === this.props.title ? 'current' : ''}`} onClick={() => this.props.navigate(this.props.url)}>{this.props.title}</a>
    )
  }
}

class NavDropdownHover extends React.Component {
    state = { show: false }

    checkMedia = () => { return window.matchMedia('(min-width: 768px)').matches }

    handleHover= () => { if (this.checkMedia()) this.setState({ show: true }) }
    handleLeave = () => { if (this.checkMedia()) this.setState({ show: false }) }

    handleClick= () => {
      if (this.props.url) this.props.navigate(this.props.url)
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
    if (this.props.game) {
      if (this.props.type) this.props.navigate(`/${stringToUrl[this.props.game]}/${stringToUrl[device]}/${stringToUrl[this.props.type]}`)
      else this.props.navigate(`/${stringToUrl[this.props.game]}/${stringToUrl[device]}`)
    }
    this.props.setDevice(device)
  }

  render () {
    return (
      <NavbarText className={this.props.className}>
        <img src='/img/assets/laptop.png' alt='' />
        <button type='button' onClick={this.handleToggle} className={`btn btn-toggle ${this.props.active ? 'active' : null}`}>
          <div className='handle' />
        </button>
        <img src='/img/assets/phone.png' alt='' />
      </NavbarText>
    )
  }
}

class SortToggle extends React.Component {
  handleToggle = () => {
    const sort = this.props.sort === 'Name' ? 'New' : 'Name'
    this.props.setSort(sort)
  }

  render () {
    return (
      <NavbarText className={this.props.className}>
        <img src='/img/assets/name.png' style={{height:'25px'}} alt='' />
        <button type='button' onClick={this.handleToggle} className={`btn btn-toggle ${this.props.active ? 'active' : null}`}>
          <div className='handle' />
        </button>
        <img src='/img/assets/clock.png' style={{height:'25px'}} alt='' />
      </NavbarText>
    )
  }
}
