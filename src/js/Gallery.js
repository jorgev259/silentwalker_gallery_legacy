import React from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { navigate } from 'hookrouter'
import Img from 'react-image'
import LazyLoad from 'react-lazyload'

class ImgBG extends React.Component {
  render () {
    const path = this.props.includeType
      ? `/img/thumbs/${this.props.game}/${this.props.device}/${this.props.type}/${this.props.image}`
      : `/img/thumbs/${this.props.game}/${this.props.device}/${this.props.image}`

    const name = path.split('/').pop().split('.').shift()
    return (

      <LazyLoad
        key={this.props.image}
        once
      >
        <Img
          alt={this.props.image}
          key={this.props.image}
          draggable='false'
          className={this.props.device}
          src={path}
          loader={<Img src={`/img/assets/loading_${this.props.device}.gif`} />}
          onLoad={this.props.loaded ? undefined : this.onLoadCallback}
          onClick={() => navigate(`/${this.props.game}/${this.props.device}${this.props.includeType ? `/${this.props.type}/` : '/'}${name}`)}
        />
      </LazyLoad>

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
  state = { modal: '' }
  toggleModal = url => {
    this.setState({ modal: url })
  }

  render () {
    return (
      <div className='flex-fill'>
        {this.props.modal ? <FullImg device={this.props.device} game={this.props.game} includeType={this.props.includeType} type={this.props.type} modal={this.props.modal} show={this.props.modal !== ''} toggle={this.toggleModal} /> : null}
        {this.props.images.map(e => <ImgBG toggle={this.toggleModal} includeType={this.props.includeType} type={this.props.type} key={e} image={e} game={this.props.game} device={this.props.device} />)}
      </div>
    )
  }
}
