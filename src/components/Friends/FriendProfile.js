/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { showUploads, showFriendUploads, deleteFile } from '../../api/files'
import { withRouter } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import fileDownload from 'js-file-download'

class FriendProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploads: []
    }
  }

  componentDidMount () {
    const { friend } = this.props
    console.log('EEEE')
    console.log(this.props)
    showFriendUploads(friend)
      .then((response) => {
        console.log(response)
        this.setState({
          uploads: response.data.uploads
        })
      })
      .catch(console.error)
  }

	handleClick = (event) => {
	  const { friend, user, msgAlert, history } = this.props
	  event.preventDefault()
	  const uploadDataId = event.target.attributes.getNamedItem('data-id').value
	  const uploadDataKey = event.target.attributes.getNamedItem('data-key').value
	  //   console.log(uploadDataKey)
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
	      showUploads(friend).then((response) => {
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

	handleSave = (url) => {
	  console.log(url)
	  //   FileSaver.saveAs(url)
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
	      upload.folder = 'images'
	    } else if (upload.mimetype === 'application/pdf') {
	      upload.thumbnail =
					'https://cdn.pixabay.com/photo/2018/05/08/18/46/pdf-3383632_1280.png'
	      upload.folder = 'pdf'
	    } else if (upload.mimetype === 'audio/wav') {
	      upload.thumbnail =
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCAarv1DhZSLjDF_-f30f5cmkKWLAq0_Ox2A&usqp=CAU'
	      upload.folder = 'audio'
	    } else {
	      upload.thumbnail =
					'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
	      upload.folder = 'other'
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
	      <Card
	        className={upload.folder}
	        key={upload.id}
	        style={{ width: '18rem' }}>
	        <Card.Img
	          variant='top'
	          style={{ objectFit: 'cover' }}
	          src={upload.thumbnail}
	          height='161'
	        />
	        <Card.Body>
	          <Card.Title>{upload.createdAt}</Card.Title>

	          <Button
	            variant='success'
	            onClick={() => {
	              const win = window.open(upload.url, '_blank')
	              win.focus()
	            }}>
							Download file
	          </Button>
	          <Button
	            variant='danger'
	            onClick={() => {
	              fileDownload(upload.url)
	            }}>
							Download file
	          </Button>
	          <a href={upload.url} download={upload.url}>
							Down
	          </a>
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
	      <div style={cardContainerLayout}>{uploadsJsx}AAA</div>
	    </>
	  )
	}
}
export default withRouter(FriendProfile)
