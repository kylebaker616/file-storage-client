/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { showUploads } from '../api/files'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'

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

  render () {
	 const cardContainerLayout = {
	    display: 'flex',
	    justifyContent: 'center',
	    flexFlow: 'row wrap'
	  }
	  const { uploads } = this.state
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
	  if (uploads === null) {
	    return 'Loading...'
	  }

	  let uploadsJsx
	  if (uploads.length === 0) {
	    uploadsJsx = 'Loading...'
	  } else {
	    // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
	    // .map gives us back a new array that we can display
	    uploadsJsx = uploads.map((upload) => (
	      <Card key={upload.id} style={{ width: '18rem' }}>
	        <Card.Img
	          variant='top'
	          style={{ objectFit: 'cover' }}
	          src={upload.url}
	          height='161'
	        />
	        <Card.Body>
	          <Card.Title>{upload.createdAt}</Card.Title>
	          {/* <Card.Text>{movie.description}</Card.Text> */}
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
