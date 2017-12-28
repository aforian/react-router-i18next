import React from 'react'
import PropTypes from 'prop-types'

const Hoc = (Component,state) => class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <p>
          Hoc
        </p>
      </div>
    )
  }
}

export default Hoc;