import React from "react";
import isEqual from 'lodash/isEqual';
import mirador from 'mirador/dist/es/src/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// This component represents the entire custom Mirador plugin
class WebAnnotationsTranscriptionPopupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '', open: false };
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  // This function loops through all the canvases and contructs and calls a new URL
  // that points to our Web Annotation endpoint. If there are no 
  // annotations for a given canvas, we display a message stating so.
  fetchAnnotations(canvases) {
    canvases.forEach(canvas => {
      if (canvas) {
        var iiifUrl = canvas.id;
        var url;
        // Check if the endpoint for the current canvas is a iiif or iiif3 endpoint
        if (iiifUrl.includes('iiif3')) {
          console.log('This is a iiif3 endpoint');
          try {
            url = new URL(canvas.id.replace('iiif3', 'wa'));
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('This is a iiif endpoint');
          try {
            url = new URL(canvas.id.replace('iiif', 'wa'));
          } catch (e) {
            console.log(e);
          }
        }
        // Get Web Annotations with reconstructed URL
        fetch(url, {
          method: 'GET',
        }).then(res => res.json())
          .then((results) => {          
            if (results.body != undefined) {
              this.setState({
                body: results.body[0].value
              });
            } else { // Handle case where results has no body      
              this.setState({
                body: 'No annotations available'
              });
            }
        }, (error) => {
          console.log(error);
          this.setState({
            body: 'No annotations available'
          });
        });
      }
    });
  }

  openDialog() {
    this.setState({ open: true });
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;
    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);
    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      console.log('fetching');
      this.fetchAnnotations(canvases);
    }
  }

  // Turn the Web Annotation's transcription into viewable HTML
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.openDialog.bind(this)}>Open dialog</Button>
          <Dialog open={this.state.open} onEnter={console.log('Hey.')}>
          <DialogTitle>Hello CodeSandbox</DialogTitle>
          <DialogContent>Start editing to see some magic happen!</DialogContent>
        </Dialog>
      </React.Fragment>
      // <div>
      //   <iframe src='https://mirador_plugin.codemagic.app/#/' Style={"border: 0;"}></iframe>
      // </div>
      //<div Style={"margin-right: 116px; margin-left: 16px;"}  dangerouslySetInnerHTML={{__html: this.state.body}} />
        
    );
  }
} 

// Hook into Mirador's state to get the canvases
function mapStateToProps(state, { windowId }) {
  return {
    canvases: mirador.selectors.getVisibleCanvases(state, { windowId: windowId }),
    config: state.config,
  };
};

export default {
  name: "WebAnnotationsTranscriptionPopupButton",
  target: "WindowTopBarPluginMenu",
  mode: "add",
  component: WebAnnotationsTranscriptionPopupButton,
  mapStateToProps: mapStateToProps,
};
