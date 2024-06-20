import React from 'react'
import { Container } from 'react-bootstrap'
import { errorImgUrl } from '../../assets/imageUrl'

function NoPageFound() {

  return (
    <Container className='m-5 p-5 text-center'>
        <img className='w-25 px-1' src={errorImgUrl} />
        <h2>Oops, You're Redirect the Wrong Page!</h2>
    </Container>
  )
}

export default NoPageFound