/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './navigationConfig';
import {name as appName} from './app.json';
import { ApplicationProvider, Layout, Text,IconRegistry} from '@ui-kitten/components';
import { mapping, light as lightTheme ,dark} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {Root} from 'native-base'
import _data_ from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'


const AppRoot = ()=> (
  <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
       
        <Provider store={_data_.store}>

        <PersistGate loading={null} persistor={_data_.persistor}>
    
        <Root>
            <App/>
        </Root>

        </PersistGate>

      </Provider>
  </ApplicationProvider>

)

AppRegistry.registerComponent(appName, () => AppRoot);
