import React from 'react'
import Img from 'react-image'
import LazyLoad from 'react-lazyload'
import $ from 'jquery'
import { viewportW } from 'verge'
import { Swipeable } from 'react-swipeable'

class ImgRow extends React.Component {
  onLoadCallback = () => {
    this.props.adjustWidth(true)
  }

  render () {
    return (
      <div className={`img-row ${this.props.device}`}>

        {this.props.imgs.map(e => {
          const path = this.props.includeType
            ? `/img/thumbs/${this.props.game}/${this.props.device}/${this.props.type}/${e}`
            : `/img/thumbs/${this.props.game}/${this.props.device}/${e}`

          return (
            <LazyLoad
              key={e}
              once
            >
              <Img
                alt={e}
                key={e}
                draggable='false'
                className='bgImg'
                src={path}
                loader={<Img src='/img/assets/loading.gif' />}
                onLoad={this.props.loaded ? undefined : this.onLoadCallback}
              />
            </LazyLoad>
          )
        })}
      </div>
    )
  }
}

export default class Gallery extends React.Component {
  state = { imgWidth: 0, scroll: 0, maxScroll: 0 }
  maxRow = Math.max(...this.props.images.map(e => e.length))

  componentDidMount () {
    window.addEventListener('resize', () => this.adjustWidth())
  }

  adjustWidth = (reset = false) => this.setState({
    scroll: reset ? 0 : this.state.scroll,
    imgWidth: $('.bgImg')[0].width,
    maxScroll: ($('.bgImg')[0].width * this.maxRow) - viewportW()
  }, this.props.handleInit)

  adjustScroll = direction => this.setState({ scroll: this.state.scroll + direction })
  handleScroll = ev => this.setState({ scroll: ev.dir === 'Right' ? -1 : 1 })

  render () {
    const currentScroll = Math.min(this.state.scroll * this.state.imgWidth, this.state.maxScroll)
    const displayLeft = this.state.scroll === 0 ? 'none' : 'flex'
    const displayRight = currentScroll >= this.state.maxScroll ? 'none' : 'flex'

    return (
      <>
        <div id='scrollLeft' style={{ display: displayLeft }} onClick={() => this.adjustScroll(-1)}>
          <img
            src='/img/assets/arrow.png'
            className='d-block m-auto'
            alt='left arrow'
          />
        </div>
        <div id='scrollRight' style={{ display: displayRight }} onClick={() => this.adjustScroll(1)}>
          <img
            src='/img/assets/arrow.png'
            className='d-block m-auto'
            alt='right arrow'
          />
        </div>
        <Swipeable preventDefaultTouchmoveEvent onSwiped={this.handleScroll} className='flex-fill' style={{ transform: `translateX(-${currentScroll}px)` }}>
          {this.props.images.map((e, i) => <ImgRow includeType={this.props.includeType} type={this.props.type} loaded={this.props.initialized} key={i} imgs={e} game={this.props.game} adjustWidth={this.adjustWidth} device={this.props.device} />)}
        </Swipeable>
      </>
    )
  }
}
