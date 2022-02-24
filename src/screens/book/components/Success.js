// Principal libraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components
import Touchable from '../../../components/Touchable';

// Extras
import {colors} from '../../../utils/constants';

const Success = ({navigation}) => {
  const handlePress = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'Notifications'}],
    });
  const handle = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'Area'}],
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se confirmó su reserva</Text>

      <Touchable style={styles.button} onPress={handlePress} highlight>
        <Text style={styles.buttonText}>Mis notificaciones</Text>
      </Touchable>

      <Touchable style={styles.button} onPress={handle} highlight>
        <Text style={styles.buttonText}>Sucursales</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 26,
    color: colors.gold,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: colors.blueVariant,
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  underlined: {
    color: colors.white,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 24,
    color: colors.white,
    marginVertical: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  mark: {
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Success;
