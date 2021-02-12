import React from 'react'
import { Modal, ModalBody, ModalFooter, Button, Container, Col, Row } from 'reactstrap'
import { navigate } from 'hookrouter'
import Img from 'react-image'
import LazyLoad from 'react-lazyload'
import { stringToUrl } from './Strings'
import classnames from 'classnames'
import styles from '../css/gallery.module.scss'

function FullImg (props) {
  const size = props.device === 'Desktop' ? 'lg' : 'sm'
  const path = props.includeType
    ? `/img/fullres/${props.game}/${props.device}/${props.type}/${props.modal}.jpg`
    : `/img/fullres/${props.game}/${props.device}/${props.modal}.jpg`

  const pathBase = props.includeType
    ? `/${stringToUrl[props.game]}/${stringToUrl[props.device]}/${stringToUrl[props.type]}`
    : `/${stringToUrl[props.game]}/${stringToUrl[props.device]}`

  return (
    <div className='bg-expand'>
      <Modal isOpen={props.show} toggle={() => navigate(pathBase)} id='modalIMG' size={size} centered>
        <ModalBody className='mb-0 p-0'>
          <LazyLoad key={props.modal} once>
            <Img
              alt={props.modal}
              key={props.modal}
              style={{ width: '100%' }}
              draggable='false'
              className={props.device}
              src={path}
              loader={<Img src={`/img/assets/loading_${props.device}.gif`} />}
            />
          </LazyLoad>
        </ModalBody>
        <ModalFooter>
          <div className='mx-auto'>{props.modal}</div>
          <div className='mx-auto'>
            <a href={path} className='modal-btn btn-md text-center btn btn-outline-secondary' download>Download</a>
            <Button outline className='btn-md ml-2 text-center modal-btn' data-dismiss='modal' type='button' onClick={() => navigate(pathBase)}>Close</Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

function Thumb (props) {
  const path = props.includeType
    ? `/img/thumbs/${props.game}/${props.device}/${props.type}/${props.image}`
    : `/img/thumbs/${props.game}/${props.device}/${props.image}`

  const name = path.split('/').pop().split('.').shift()

  return (
    <Col xs={props.device === 'Desktop' ? 12 : 6} sm={props.device === 'Desktop' ? 6 : 4} md={props.device === 'Desktop' ? 3 : 2} className={classnames(styles.thumb, styles[props.device], 'px-0')} onClick={() => navigate(`/${stringToUrl[props.game]}/${stringToUrl[props.device]}${props.includeType ? `/${stringToUrl[props.type]}/` : '/'}${name}`)}>
      <div style={{ backgroundImage: `url("${path}")` }} />
    </Col>
  )
}

export default function Gallery (props) {
  return (
    <Container className='flex-fill content px-0' fluid>
      {props.modal && <FullImg device={props.device} game={props.game} includeType={props.includeType} type={props.type} show={props.modal !== ''} modal={props.modal} />}
      <Col>
        <Row>
          {props.images.map(i => <Thumb key={i} image={i} device={props.device} game={props.game} includeType={props.includeType} type={props.type} modal={props.modal} />)}
        </Row>
      </Col>
    </Container>
  )
}
