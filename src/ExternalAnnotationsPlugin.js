// New plugin for highlight and click annotation functionality

// get entire redux store, subscribe it, look at every event and do things based on that? not a lot of existing functionality in Mirador right now to do this - experimental

// annotations can be selected in multiple ways

import React from 'react'
import isEqual from 'lodash/isEqual'
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases'
import { receiveAnnotation } from 'mirador/dist/es/src/state/actions/annotation'
import { selectAnnotation } from 'mirador/dist/es/src/state/actions/annotation'
import { highlightAnnotation } from 'mirador/dist/es/src/state/actions/annotation'

// This plugin will handle overriding what happens when a user highlights and selects an annotation.
// On selection, a popup window should appear displaying more information about that annotation.
class HighlightClickAnnotationsPlugin extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnnotationClick = this.handleAnnotationClick.bind(this);
  }

  // Called when plugin is loaded
  componentDidMount() {
    
  }

  // Called on plugin reload
  componentDidUpdate(prevProps) {
    
  }

  // Do something when an annotation is selected
  handleAnnotationClick(canvases) {
    
  }

  // Do something when an annotation is highlighted
  handleAnnotationHighlight(canvases) {
    
  }

  // Render target component
  render() {
    return (
      <this.props.TargetComponent {...this.props.targetProps}></this.props.TargetComponent>
    )
  }
}

// Retrieve  data from Mirador's state
function mapStateToProps(state, props) {
  return {
    canvases: getVisibleCanvases(state, { windowId: props.targetProps.windowId }),
    config: state.config,
  };
}

// Get access to Mirador functions
const mapDispatchToProps = {
  receiveAnnotation: receiveAnnotation,
  selectAnnotation: selectAnnotation,
  highlightAnnotation: highlightAnnotation
}

export default {
  name: "HighlightClickAnnotationsPlugin",
  target: "CanvasAnnotations",
  mode: "wrap",
  component: HighlightClickAnnotationsPlugin,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
}