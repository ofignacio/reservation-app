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
import reserve from '../../actions/book/reserve';

const Book = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const {item} = route.params;

  const handleClick = () => {
    dispatch(reserve({idClass: item.id}, navigation));
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${DBDateToLetterUy(item.date)} a las ${DBDateToTimeJs(
        item.date,
      )}`,
    });
  }, []);

  useEffect(() => {
    if (response.isError) {
      Alert.alert('Problema al agendar', response.message);
      dispatch(actions.clear());
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Confirmar reserva</Text>
        <Text style={styles.underlined}>
          Debes de estar seguro/a, cada reserva es un compromiso
        </Text>
        <View style={styles.flex}>
          <Text style={styles.text}>
            Reservar <Text style={styles.mark}>1 cupo</Text> para el día{' '}
            <Text style={styles.mark}>{DBDateToLetterUy(item.date)}</Text> a las{' '}
            <Text style={styles.mark}>{DBDateToTimeJs(item.date)}</Text>{' '}
            {item.type && (
              <>
                para la clase de <Text style={styles.mark}>{item.type}</Text>
              </>
            )}
          </Text>
        </View>
      </View>
      <Touchable style={styles.button} onPress={handleClick} highlight>
        {isFetching ? (
          <ActivityIndicator color={colors.white} size={30} />
        ) : (
          <Text style={styles.buttonText}>Reservar</Text>
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

export default Book;
