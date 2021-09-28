/* eslint-disable no-tabs */

import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1
          style={{
            margin: 'auto',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '30%',
            fontSize: '20vh'
          }}
          className='Home'>
					File Storage
        </h1>
        <h3
          style={{
            margin: 'auto',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '30%',
            fontSize: '4vh'
          }}
          className='Home'> Sign up to store your files and connect with friends.
        </h3>
      </div>
    )
  }
}
