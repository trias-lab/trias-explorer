import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Main from './components/Main'
import './styles/main.less'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
}

render(Main);

if (module.hot) {
    module.hot.accept('./components/Main', () => render(require('./components/Main').default));
}