import React, { useState } from 'react'
import style from '../css/Popup.module.scss'
import className from 'classnames'
import Button from 'reactstrap/lib/Button'
import classNames from 'classnames'
import cookie from 'cookie-cutter'

export default function Popup(){
  const [show, setShow] = useState( cookie.get('donateSkip')  != undefined ? cookie.get('donateSkip') : true)

  function donateSkip(){
    setShow(false)
    cookie.set('donateSkip', false)
  }

  return show ? (
    <div className={className(style.root, 'mx-auto')}>
      <div className={className(style.pop, 'mx-auto p-3')}>
        Help me to mantain the site ad-free by donating through
        <Button color='primary' className={classNames('donate', style['btn-primary'])} href='https://paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WH26ZAAT9WRYU'>Paypal</Button> or <a href='https://www.buymeacoffee.com/silentwalker' target='_blank'><img height='36' style={{border:'0px',height:'36px'}} src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
        <Button color='primary' className={classNames('donate mx-2', style.donate)} onClick={donateSkip}>Understood</Button>
      </div>
    </div>
  ) : null
}