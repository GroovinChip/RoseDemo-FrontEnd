import ReactDOM from "react-dom";
import React from "react";
import Mirador from "./Mirador";
import WebAnnotationsPlugin from "./WebAnnotationsPlugin";
import HighlightClickAnnotationsPlugin from "./ExternalAnnotationsPlugin";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Mirador config={{ 
    id: "mirador", 
    windows: [{ 
        manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif3/rose/SeldenSupra57/manifest', 
        canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif3/rose/SeldenSupra57/1r/canvas',
        thumbnailNavigationPosition: 'far-bottom'
      },
    ],
    window: {
      defaultSidebarPanelWidth: 400,
    },
    manifests: {
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/CoxMacro/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce195/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce332/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/LudwigXV7/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Morgan948/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Walters143/manifest': {},
      'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest': {}
    },
    themes:{
       dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#3F51B5',
            },
            secondary: {
              main: '#536dfe',
            }
          }
       },
       light: {
        palette: {
          type: 'light',
          primary: {
            main: '#3F51B5',
          },
          secondary: {
            main: '#536dfe',
          }
        }
     }  
    },
    // selectedTheme: 'dark',
    }} plugins={[WebAnnotationsPlugin, HighlightClickAnnotationsPlugin]} />,
  document.getElementById("root")
);
