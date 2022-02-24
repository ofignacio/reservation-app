// Principal libraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components
import Touchable from '../../../components/Touchable';

// Extras
import {colors} from '../../../utils/constants';

const Home = ({navigation: {navigate}}) => {
  const handleCreate = () => navigate('Create');
  const handleModify = () => navigate('ViewModifyClass');
  const handleCreateAll = () => navigate('CreateAll');
  const handleShow = () => navigate('Show');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione una opción</Text>
      <View style={styles.content}>
        <Touchable highlight style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear clase</Text>
        </Touchable>
        <Touchable highlight style={styles.button} onPress={handleModify}>
          <Text style={styles.buttonText}>Modificar clases</Text>
        </Touchable>
        <Touchable highlight style={styles.button} onPress={handleCreateAll}>
          <Text style={styles.buttonText}>Crear clases masivas</Text>
        </Touchable>
        <Touchable highlight style={styles.button} onPress={handleShow}>
          <Text style={styles.buttonText}>Ver agenda</Text>
        </Touchable>
      </View>
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
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.white,
  },
});

export default Home;
