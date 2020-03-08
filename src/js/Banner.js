
import React from 'react'
export default class Banner extends React.Component {
  render () {
    return (
      <>
        <img
          src='/img/assets/info_banner.png' style={{
            height: '350px'
          }}
        />
        <div style={{ height: '35px', width: '100%', justifyContent: 'space-evenly', display: 'flex', marginTop: '10px' }}>
          <a href='https://www.instagram.com/silentwalker___/'>
            <img
              src='/img/assets/insta.png' style={{
                height: '100%',
                width: 'auto'
              }}
            />
          </a>
          <a href='https://twitter.com/silentwalker__'>
            <img
              src='/img/assets/twitter.png' style={{
                height: '100%',
                width: 'auto'
              }}
            />
          </a>
        </div>
      </>
    )
  }
}
