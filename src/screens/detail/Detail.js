// Principal libraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Touchable from '../../components/Touchable';

// Extras
import {colors} from '../../utils/constants';
import {DBDateToTimeJs, DBDateToLetterUy} from '../../utils/date';
import selectors from '../../reducers/book/selectors';
import actions from '../../reducers/book/actions';
import drop from '../../actions/book/delete';

const Detail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const {idClass, title, description} = route.params;

  const handleClick = () => {
    dispatch(drop({idClass: idClass}, navigation));
  };

  useEffect(() => {
    if (response.message) {
      Alert.alert('Desagendarse', response.message);
      dispatch(actions.clear());
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.flex}>
          <Text style={styles.text}>{description}</Text>
        </View>
        <Text style={styles.underlined}>
          Puedes desagendarte <Text style={styles.mark}>30 minutos</Text> antes
          de la clase, en caso de no hacerlo y{' '}
          <Text style={styles.mark}>no</Text> asistir puede haber una suspensión
          de tu cuenta.
        </Text>
      </View>
      <Touchable style={styles.button} onPress={handleClick} highlight>
        {isFetching ? (
          <ActivityIndicator color={colors.white} size={30} />
        ) : (
          <Text style={styles.buttonText}>Desagendarme</Text>
        )}
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
  },
  title: {
    fontSize: 26,
    color: colors.gold,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: colors.blueVariant,
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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

export default Detail;
