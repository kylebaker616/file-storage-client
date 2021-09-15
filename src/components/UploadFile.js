import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UploadFile extends Component {
  render () {
    return (
      <Fragment>
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Upload file here</Form.Label>
          <Form.Control type='file' />
          <Button variant='primary' type='submit'>Submit</Button>
        </Form.Group>
      </Fragment>
    )
  }
}
export default withRouter(UploadFile)
