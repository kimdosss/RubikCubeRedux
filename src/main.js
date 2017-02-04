import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import Menu from './components/Menu/menu'
import CubePage from './components/CubePage/CubePage'

import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Menu} />

        <Route path='/cube/:cubeDim' component={CubePage} />
      </Route>

    </Router>
  </Provider>
)

ReactDOM.render(
	router,
	document.getElementById('root')

)
