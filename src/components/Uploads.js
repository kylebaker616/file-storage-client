/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { showUploads, deleteFile } from '../api/files'
import { withRouter } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

class Uploads extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploads: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    showUploads(user)
      .then((response) => {
        console.log(response)
        this.setState({
          uploads: response.data.uploads
        })
      })
      .catch(console.error)
  }

	handleClick = (event) => {
	  const { user, msgAlert, history } = this.props
	  event.preventDefault()
	  const uploadDataId = event.target.attributes.getNamedItem('data-id').value
	  const uploadDataKey = event.target.attributes.getNamedItem('data-key').value
	  console.log(uploadDataKey)
	  deleteFile(uploadDataId, uploadDataKey, user)
	    .then(() =>
	      msgAlert({
	        heading: 'Deleted',
	        message: 'File deleted',
	        variant: 'success'
	      })
	    )
	    .then(() => history.push('/uploads'))
	    .then(() =>
	      showUploads(user).then((response) => {
	        this.setState({
	          uploads: response.data.uploads
	        })
	      })
	    )
	    .catch((err) =>
	      msgAlert({
	        heading: 'Deletion failed',
	        message: 'Unable to delete file' + err.message,
	        variant: 'danger'
	      })
	    )
	}

	render () {
	  const cardContainerLayout = {
	    display: 'flex',
	    justifyContent: 'center',
	    flexFlow: 'row wrap'
	  }
	  const { uploads } = this.state
	  uploads.forEach((upload) => {
	    if (
	      upload.mimetype === 'image/jpeg' ||
				upload.mimetype === 'image/png' ||
				upload.mimetype === 'image.jpg'
	    ) {
	      upload.thumbnail = upload.url
	    } else {
	      upload.thumbnail =
					'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
	    }
	  })
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
	  if (uploads === null) {
	    return 'Loading...'
	  }

	  let uploadsJsx
	  if (uploads.length === 0) {
	    uploadsJsx = 'Loading...'
	  } else {
	    uploadsJsx = uploads.map((upload) => (
	      <Card key={upload.id} style={{ width: '18rem' }}>
	        <Card.Img
	          variant='top'
	          style={{ objectFit: 'cover' }}
	          src={upload.thumbnail}
	          height='161'
	        />
	        <Card.Body>
	          <Card.Title>{upload.createdAt}</Card.Title>
	          {/* <Card.Text>{movie.description}</Card.Text> */}
	          <Button
	            variant='danger'
	            data-id={upload._id}
	            data-key={upload.key}
	            onClick={this.handleClick}>
							Delete file
	          </Button>
	        </Card.Body>
	      </Card>
	    ))
	  }

	  return (
	    <>
	      <div className='text' style={{ textAlign: 'center' }}>
	        <h4>
	          <strong>Your Files</strong>
	        </h4>
	      </div>
	      <div style={cardContainerLayout}>{uploadsJsx}</div>
	    </>
	  )
	}
}
export default withRouter(Uploads)
