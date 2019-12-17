import React, { Component } from 'react'
import mirador from 'mirador/dist/es/src/index'

class Mirador extends Component {
  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    const { config, plugins } = this.props
    mirador.viewer(config, plugins)
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const { config } = this.props
    // eslint-disable-next-line react/prop-types
    return <div id={config.id} />
  }
}

export default Mirador
