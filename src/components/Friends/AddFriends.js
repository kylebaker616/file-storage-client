/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { findFriend, addFriend } from '../../api/friends'

class AddFriends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipient: '',
      //   recipientName: '',
      foundUser: '',
      userFound: false
    }
  }

	//   componentDidMount () {
	//     const { user } = this.props
	//     showUploads(user)
	//       .then((response) => {
	//         console.log(response)
	//         this.setState({
	//           uploads: response.data.uploads
	//         })
	//       })
	//       .catch(console.error)
	//   }
	handleChange = (event) =>
	  this.setState({
	    [event.target.name]: event.target.value
	  })

	onSearch = (event) => {
	//   console.log(this.state.recipient, 'BBB', this.props.user)
	//   console.log('AAAAA')
	  console.log(this.props.user)
	  event.preventDefault()
	  this.setState({ recipientName: this.state.recipient })
	  findFriend(this.state, this.props.user)
	    .then((response) => {
	      console.log(response)
	      this.setState({
	        foundUser: response.data.user,
	        recipient: '',
	        userFound: true
	      })
	    })
	    .catch((error) => {
	      this.setState({ recipient: '' })
	      this.props.msgAlert({
	        heading: 'Sorry, we could not find: ' + this.state.recipientName,
	        message: error.message,
	        variant: 'danger'
	      })
	    })
	}

    onClick = (event) => {
      event.preventDefault()
      const wantedFriend = event.target.attributes.getNamedItem('data-user').value
      console.log(wantedFriend)
      addFriend(wantedFriend, this.props.user)
        .then(res => console.log(res))
        .then(() => {
          this.props.msgAlert({
	        heading: 'Request sent',
	        message: 'Friend request sent',
	        variant: 'success'
	      })
	    })
    }

    render () {
      //   const potentialFriend = this.state.recipient
      //   console.log(potentialFriend, 'aa')
	  return (
	    <>
	      <Form id='find-friend' onSubmit={this.onSearch}>
	        <Row>
	          <Col xs={7}>
	            <Form.Control
	              required
	              type='text'
	              name='recipient'
	              value={this.state.recipient}
	              placeholder='Find a friend'
	              onChange={this.handleChange}
	            />
	          </Col>
	          <Col xs='auto' className='my-1'>
	            <Button type='submit'>Submit</Button>
	          </Col>
	        </Row>
	      </Form>
	      {this.state.userFound
	        ? (
	        <div>{this.state.foundUser.username} <Button type='submit' data-user={this.state.foundUser._id} onClick={this.onClick} >Add Friend</Button></div>
	      )
	        : (
	        ''
	      )}
	    </>
	  )
    }
}
export default withRouter(AddFriends)
