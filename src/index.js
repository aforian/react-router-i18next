import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n';

// i18n.changeLanguage('zh-TW');

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
registerServiceWorker();
