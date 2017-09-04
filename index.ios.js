import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import Spinner from 'react-native-loading-spinner-overlay';

import reducers from './src/reducers'
import App from './src/App';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

export default class startupapp extends Component {
  constructor(props) {
    super(props);
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true })
    })
  }


  render() {
    if (!this.state.rehydrated) { return <Spinner visible={true} textContent={"Carregando..."} textStyle={{color: '#FFF'}} /> }
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('startupapp', () => startupapp);
