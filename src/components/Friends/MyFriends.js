/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { findRequester } from '../../api/friends'
import { showFriendUploads, pinFile } from '../../api/files'
// import fileDownload from 'js-file-download'
import { Button, Card } from 'react-bootstrap'

// import AuthenticatedRoute from '.././AuthenticatedRoute/AuthenticatedRoute'
// import FriendProfile from './FriendProfile'

class Requests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friends: '',
      viewFriend: '',
      uploads: [],
      friendFound: false
    }
  }

  componentDidMount () {
    const { user } = this.props
    // console.log(user)
    const allFriends = []
    const friends = user.friends
    // console.log(friends)
    friends.forEach((friend) => {
      //   console.log(request)
      findRequester(friend.potentialFriend, user)
        .then((res) => {
          //   console.log(res)
          allFriends.push(res)
        })
        .then(() =>
          this.setState({
            friends: allFriends
          })
        )
    })
  }

  onClick = (event) => {
    event.preventDefault()
    const profile = event.target.attributes.getNamedItem('data-user').value
    this.setState({
      viewFriend: profile
    })
    console.log(this.state.viewFriend)
    showFriendUploads(this.state.viewFriend).then((response) => {
      console.log(response)
      this.setState({
        uploads: response.data.uploads,
        friendFound: true
      })
    })
  }

  render () {
	  const { friends, friendFound } = this.state
	  let friendsJsx
	  if (friends.length === 0) {
	    friendsJsx = 'No friends'
	  } else if (friendFound === true) {
      friendsJsx = ''
    } else {
	    friendsJsx = friends.map((friend) => (
	      <div key={friend.id}>
	        {friend.data.user.username}
	        {/* {console.log(friend)} */}
	        <Button
	          type='success'
	          data-user={friend.data.user._id}
            onClick={this.onClick}
	          >
	           View Uploads
	        </Button>
	      </div>
	    ))
	  }

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
      } else {
        upload.thumbnail =
						'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
        upload.folder = 'files'
      }
    })
    // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
    if (uploads === null) {
      return ''
    }

    let uploadsJsx
    if (uploads.length === 0) {
      uploadsJsx = ''
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
              variant='success'
              onClick={() => {
                pinFile(upload, this.props.user)
                  .then(console.log('this file be pinned'))
              }}>
							Pin file
            </Button>
            {/* <Button
              variant='danger'
              onClick={() => {
                fileDownload(upload.url)
              }}>
								Download file
            </Button> */}
            {/* <a href={upload.url} download={upload.url}>
								Down
            </a> */}
          </Card.Body>
        </Card>
      ))
    }
	  return (
      <div>
        {friendsJsx}
        <div style={cardContainerLayout}>{uploadsJsx}</div>
      </div>
    )
  }
}
export default withRouter(Requests)
