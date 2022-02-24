// Principal libraries
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

// Components
import Touchable from '../../../components/Touchable';

// Extras
import {colors} from '../../../utils/constants';
import actions from '../../../reducers/account/actions';

const Home = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const handleUsers = () => navigate('Users');
  const handleClasses = () => navigate('Classes');
  const handleNotifications = () => navigate('Notifications');

  const handleLogout = () => dispatch(actions.logout());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué desea hacer?</Text>
      <View style={styles.content}>
        <Touchable highlight style={styles.button} onPress={handleUsers}>
          <Text style={styles.buttonText}>Usuarios</Text>
        </Touchable>
        <Touchable highlight style={styles.button} onPress={handleClasses}>
          <Text style={styles.buttonText}>Clases</Text>
        </Touchable>
        <Touchable
          highlight
          style={styles.button}
          onPress={handleNotifications}>
          <Text style={styles.buttonText}>Notificaciones</Text>
        </Touchable>
      </View>
      <Touchable highlight style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.logout}>Salir de la cuenta</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    paddingVertical: 10,
    fontSize: 24,
    color: colors.black,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: 250,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Platform.OS === 'android' ? 10 : 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.white,
  },
  buttonLogout: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default Home;
