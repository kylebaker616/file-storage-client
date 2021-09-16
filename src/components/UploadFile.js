import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { uploadFile } from '../api/files'
import { FormData } from 'formdata-node'

function UploadFile () {
  const [selected, setSelected] = useState({})
  const [upload, setUpload] = useState({})
  const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    console.log(event.target.files)
    setSelected(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    console.log('hello', event.target)
    const data = new FormData()
    // upload is the key that the api is expecting, value is the selected file set in state
    data.set('upload', selected)
    console.log(data, 'ooo')
    uploadFile(data)
      .then(res => setUpload(res.data.uploadDoc))
      .then(() => setLoading(false))
      .catch(console.error + 'oops')
  }

  return (
    <Fragment>
      {/* ternary operator displays the image that was just uploaded by setUploaded after the axios call */}
      {upload.url ? (<img className="display-image" alt={upload.url} src={upload.url}/>) : '' }
      {loading ? (<img alt="loading gif" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"/>) : ''}
      <form onSubmit={handleSubmit}>
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Upload file here</Form.Label>
          <Form.Control type='file' onChange={handleChange} />
          <Button variant='primary' type="submit">Submit
          </Button>
        </Form.Group>
      </form>
    </Fragment>
  )
}
export default withRouter(UploadFile)
