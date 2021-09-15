import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { upload } from '../api/files'
import FormData from 'form-data'
// function UploadFile (props) {
//   const handleChange = (event) => {
//     console.log(event.target.files)
//   }

//   render()
//   return (
//     <Fragment>
//       <Form.Group controlId='formFile' className='mb-3'>
//         <Form.Label>Upload file here</Form.Label>
//         <Form.Control type='file' onchange={this.handleChange}/>
//         <Button variant='primary' type='submit'>Submit</Button>
//       </Form.Group>
//     </Fragment>
//   )
// }
// export default withRouter(UploadFile)
// import React from 'react'

function UploadFile () {
  const [selected, setSelected] = useState(null)
  const handleChange = (event) => {
    console.log(event.target.files)
    setSelected(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hello', event.target)
    const data = new FormData()
    // upload is the key that the api is expecting, value is the selected file set in state
    data.append('upload', selected)
    upload(data)
      .then(console.log)
      .catch(console.error)
  }

  return (
    <Fragment>
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
