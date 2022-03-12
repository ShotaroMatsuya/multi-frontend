import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'; // imported history from a library called history not react-rotuer-dom
import App from './App';

// Mount fn to start up the app

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  // we then create a memory history object and we tell the memory history object that whenever the URL changes, whenever the path changes , we wanted to automatically call the onNavigate func.
  if (onNavigate) {
    // only run this from container app (Not Development)
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      // get current memory history
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        // update container's Browser History by marketing's current memory history
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function

export { mount };
