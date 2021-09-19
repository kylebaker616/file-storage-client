/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { findFriend } from '../../api/friends'

class AddFriends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipient: '',
      recipientName: '',
      foundUser: ''
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
	  console.log(this.state.recipient, 'BBB', this.props.user)
	  console.log('AAAAA')
	  event.preventDefault()
	  //   this.setState({ recipientName: this.state.recipient })
	  findFriend(this.state, this.props.user)
	    .then((response) => {
	      console.log(response)
	      this.setState({
	        foundUser: response.data.user
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

	render () {
	  const potentialFriend = this.state.recipient
	  console.log(potentialFriend)
	  return (
	    <>
	      <Form id="find-friend" onSubmit={this.onSearch}>
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
	    </>
	  )
	}
}
export default withRouter(AddFriends)
