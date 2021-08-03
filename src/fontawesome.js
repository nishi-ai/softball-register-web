// Creating an Icon Library
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
// create a library from multiple icons from the different packages
import { 
  faCode,
  faHighlighter,
  faCopy,
  faLink,
  faClipboardCheck,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithubAlt,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

// and import into index.js!

library.add(
  faCode,
  faHighlighter,
  // more icons go here
  faGithubAlt,
  faLinkedin,
  faCopy,
  faLink,
  faClipboardCheck,
  faLeaf
);