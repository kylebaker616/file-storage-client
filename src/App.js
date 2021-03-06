/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import UploadFile from './components/UploadFile'
import Uploads from './components/Uploads'
import AddFriends from './components/Friends/AddFriends'
import Requests from './components/Friends/Requests'
import MyFriends from './components/Friends/MyFriends'
import Home from './components/Home'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      friends: ''
    }
  }

  setUser = (user) => this.setState({ user })
  setFriends = (friends) => this.setState({ friends })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className='container'>
          <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            exact
            path='/upload'
            user={user}
            render={() => <UploadFile msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            exact
            path='/uploads'
            user={user}
            render={() => <Uploads msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            path='/add'
            user={user}
            render={() => <AddFriends msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            path='/requests'
            user={user}
            render={() => (
              <Requests
                msgAlert={this.msgAlert}
                user={user}
                setUser={this.setUser}
              />
            )}
          />
          <AuthenticatedRoute
            path='/friends'
            user={user}
            render={() => (
              <MyFriends user={user} setFriends={this.setFriends} />
            )}
          />
          <Route
            exact
            path='/'
            user={user}
            render={() => (
              <Home />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
