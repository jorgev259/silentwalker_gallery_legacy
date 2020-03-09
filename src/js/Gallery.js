import React from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { navigate } from 'hookrouter'
import Img from 'react-image'
import LazyLoad from 'react-lazyload'
import $ from 'jquery'
import { viewportW } from 'verge'

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

          const name = path.split('/').pop().split('.').shift()
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
                loader={<Img src={`/img/assets/loading_${this.props.device}.gif`} />}
                onLoad={this.props.loaded ? undefined : this.onLoadCallback}
                onClick={() => navigate(`/${this.props.game}/${this.props.device}${this.props.includeType ? `/${this.props.type}/` : '/'}${name}`)}
              />
            </LazyLoad>

          )
        })}
      </div>
    )
  }
}

class FullImg extends React.Component {
  render () {
    const size = this.props.device === 'Desktop' ? 'lg' : 'sm'
    const path = this.props.includeType
      ? `/img/fullres/${this.props.game}/${this.props.device}/${this.props.type}/${this.props.modal}.jpg`
      : `/img/fullres/${this.props.game}/${this.props.device}/${this.props.modal}.jpg`

    const pathBase = this.props.includeType
      ? `/${this.props.game}/${this.props.device}/${this.props.type}`
      : `/${this.props.game}/${this.props.device}`

    return (
      <div className='bg-expand'>
        <Modal isOpen={this.props.show} toggle={() => navigate(pathBase)} id='modalIMG' size={size} centered>
          <ModalBody className='mb-0 p-0'>
            <Img
              alt={this.props.modal}
              style={{ width: '100%' }}
              draggable='false'
              src={path}
              loader={<Img src={`/img/assets/loading_${this.props.device}.gif`} />}
            />
          </ModalBody>
          <ModalFooter>
            <div className='mx-auto'>{this.props.modal}</div>
            <div className='mx-auto'>
              <a href={path} className='modal-btn btn-md text-center btn btn-outline-secondary' download>Download</a>
              <Button outline className='btn-md ml-2 text-center modal-btn' data-dismiss='modal' type='button' onClick={() => navigate(pathBase)}>Close</Button>
            </div>
          </ModalFooter>

        </Modal>
      </div>
    )
  }
}

export default class Gallery extends React.Component {
  state = { imgWidth: 0, scroll: 0, maxScroll: 0, modal: '' }
  toggleModal = url => {
    this.setState({ modal: url })
  }

  maxRow = Math.max(...this.props.images.map(e => e.length))

  componentDidMount () {
    window.addEventListener('resize', () => this.adjustWidth())
  }

  adjustWidth = (reset = false) => {
    if ($('.bgImg')[0]) {
      this.setState({
        scroll: reset ? 0 : this.state.scroll,
        imgWidth: $('.bgImg')[0].width,
        maxScroll: ($('.bgImg')[0].width * this.maxRow) - viewportW()
      }, this.props.handleInit)
    }
  }

  render () {
    return (
      <div className='flex-fill'>
        {this.props.modal ? <FullImg device={this.props.device} game={this.props.game} includeType={this.props.includeType} type={this.props.type} modal={this.props.modal} show={this.props.modal !== ''} toggle={this.toggleModal} /> : null}
        {this.props.images.map((e, i) => <ImgRow toggle={this.toggleModal} includeType={this.props.includeType} type={this.props.type} loaded={this.props.initialized} key={i} imgs={e} game={this.props.game} adjustWidth={this.adjustWidth} device={this.props.device} />)}
      </div>
    )
  }
}
