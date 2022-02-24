// Principal libraries
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Components
import Router from './src/routes/Router';

// Extras
import {store, persistor} from './src/store';
import {initialize} from './src/utils/notifications';

const App = () => {
  useEffect(() => {
    initialize();
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Router />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
