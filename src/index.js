// Not required if we are using only JSX not useState or other React specific code
// This is because we set preset-react preset in babel config to have runtime set to 'automatic'
// import React from 'react';
import { render } from 'react-dom';
import Layout from './components/layout';
import './styles/index.css'
import './favicons'

render(<Layout />, document.getElementById('root'));