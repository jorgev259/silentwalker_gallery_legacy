import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Gallery from './js/Gallery'
// import Info from './js/Info'

import { useRoutes } from 'hookrouter'

/* '/clanbanners': () => <App />,
  '/info': () => <App pageComponent={Info} />, */

const routes = {
  '/Destiny%201/:device': ({ device }) => (
    <App
      pageComponent={Gallery} device={device}
      game='Destiny 1'
    />
  ),
  '/Destiny%201/:device/:wallpaper': ({ device, wallpaper }) => (
    <App
      pageComponent={Gallery} device={device}
      game='Destiny 1' modal={decodeURIComponent(wallpaper)}
    />
  ),
  '/Destiny%202/:device/:type': ({ device, type }) => (
    <App
      pageComponent={Gallery} type={type} device={device}
      game='Destiny 2'
    />
  ),
  '/Destiny%202/:device/:type/:wallpaper': ({ device, type, wallpaper }) => (
    <App
      pageComponent={Gallery} type={type}
      game='Destiny 2' device={device}
      modal={decodeURIComponent(wallpaper)}
    />
  )
}

const Routing = () => {
  const routeResult = useRoutes(routes)
  return routeResult || (
    <script>{(
      window.location.href = '/Destiny%201/Desktop'
    )}
    </script>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'))
