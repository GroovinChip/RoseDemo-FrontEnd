import React from 'react'
import isEqual from 'lodash/isEqual'
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

// Define styles for components
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

// This component represents the title of the Dialog
// that will show Web Annotation data
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

// This component represents the content of the Dialog
// that will show Web Annotation data
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

// --------------------------------------------------------------------------------------------------------------------

// This component represents the entire custom Mirador plugin
class WebAnnotationsTranscriptionPopupButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text1: '',
      text2: '',
      open: false
    }
    this.fetchAnnotations = this.fetchAnnotations.bind(this)
  }

  // Call Homer Web Annotation endpoint from Eldarion
  // and store some data in the plugin state
  fetchAnnotations (canvases) {
    fetch(
      'https://explorehomer-atlas-dev3.herokuapp.com/wa/urn:cite2:hmt:msA.v1:12r/translation-alignment/0/text/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            text1: json.body[0].value,
            text2: json.body[1].value
          })
        })
      }
    })
  }

  // This function opens the Dialog
  openDialog () {
    this.setState({ open: true })
  }

  // This function closes the Dialog
  closeDialog () {
    this.setState({ open: false })
  }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    const { canvases } = this.props
    this.fetchAnnotations(canvases)
  }

  componentDidUpdate (prevProps) {
    // eslint-disable-next-line react/prop-types
    const { canvases } = this.props
    // eslint-disable-next-line react/prop-types
    const currentCanvasIds = canvases.map(canvas => canvas.id)
    // eslint-disable-next-line react/prop-types
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id)
    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      console.log('fetching')
      this.fetchAnnotations(canvases)
    }
  }

  // Render the actual Dialog
  render () {
    return (
      <div>
        <Button onClick={this.openDialog.bind(this)} className={styles.webAnnoButton} >View Web Annotations</Button>
        <Dialog open={this.state.open} onClose={this.closeDialog.bind(this)}>
          <DialogTitle id="customized-dialog-title" onClose={this.closeDialog.bind(this)}>Web Annotations</DialogTitle>
          <DialogContent>
            <Box>{this.state.text1}</Box>
            <Divider />
            <Box>{this.state.text2}</Box>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

// Hook into Mirador's state to get the canvases
function mapStateToProps (state, { windowId }) {
  return {
    canvases: getVisibleCanvases(state, { windowId: windowId }),
    config: state.config
  }
};

export default {
  name: 'WebAnnotationsTranscriptionPopupButton',
  target: 'WindowTopBarPluginMenu',
  mode: 'add',
  component: WebAnnotationsTranscriptionPopupButton,
  mapStateToProps: mapStateToProps
}
