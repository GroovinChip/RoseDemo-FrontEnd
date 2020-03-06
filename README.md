# Annotation Interoperability Demo Application
This repository houses a ReactJS plugin for version 3 of [Mirador](https://projectmirador.org). It is deployed to https://rosetest.library.jhu.edu/anniop/. The purpose of the plugin is to fetch and display data from Web Annotation resources that are associated with the manuscript images in the viewer.

## Files of note
- src/WebAnnotationsPlugin.js: the code for the plugin itself
- src/index.js: contains our custom configuration for Mirador

## Useful resources
- [Mirador codebase](https://github.com/ProjectMirador/mirador)
- [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki)
- [ReactJS website](https://reactjs.org/)
- [Redux website](https://redux.js.org/)

## How this plugin works
This plugin accesses the Mirador Redux state to get the available canvases from a manifest. In order to get the Web Annotations associated with a given canvas, the plugin will do the following:
1. Take the iiif/iff3 endpoint for the given canvas and reconstruct it to the Web Annotation endpoint for that canvas
2. Call that endpoint and create an AnnotationPage object from the results
3. Add the AnnotationPage object to Mirador's state via a Redux action that Mirador provides
4. The Web Annotations contained in the AnnotationPage object will be subsequently be displayed in the Mirador annotations sidebar panel. 
The annotations that can be viewed for a given canvas will always be correct because the plugin ensures that the correct canvasId is accessed from Mirador's state.

## Development notes
- It is important to make sure that state is being mapped correctly to and from Mirador in order to truly make use of Mirador's built in functionality. This is done through `mapStateToProps` and `mapDispatchToProps`.
- This project uses Mirador as a dependency. Stay abreast of Mirador updates through NPM.