/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { findRequester, acceptRequest, removeRequest } from '../../api/friends'
import { Button } from 'react-bootstrap'

class Requests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requests: ''
    }
  }

  componentDidMount () {
    const { user } = this.props
    // console.log(user)
    const allRequests = []
    const requests = user.requests
    requests.forEach((request) => {
    //   console.log(request)
      findRequester(request.sender, user)
        .then((res) => {
          //   console.log(res)
          allRequests.push(res)
        })
        .then(() =>
          this.setState({
            requests: allRequests
          })
        )
    })
  }

	onClick = (event) => {
	  event.preventDefault()
	  const wantedFriend = event.target.attributes.getNamedItem('data-user').value
	  //   console.log(wantedFriend)
	  //   addFriend(wantedFriend, this.props.user).then((res) => console.log(res))
	  acceptRequest(wantedFriend, this.props.user)
	    // .then((res) => console.log(res))
	    .then(() => this.props.user.requests.forEach((one) => {
	      if (one.sender === wantedFriend) {
	        let requestId = null
	        requestId = one._id
	        removeRequest(requestId, this.props.user)
	          .then((res) => {
	            this.setState({
	              requests: res.data.user.requests
	            })
	            console.log(res)
	          })
	      }
	    }))
	}

	render () {
	  const { requests } = this.state
	  let requestsJsx
	  if (requests.length === 0) {
	    requestsJsx = 'No requests'
	  } else {
	    requestsJsx = requests.map((request) => (
	      <div key={request.id}>
	        {request.data.user.username}
	        {console.log(request)}
	        <Button
	          type='submit'
	          data-user={request.data.user._id}
	          onClick={this.onClick}>
						Add Friend
	        </Button>
	      </div>
	    ))
	  }
	  return <div>{requestsJsx}</div>
	}
}
export default withRouter(Requests)
