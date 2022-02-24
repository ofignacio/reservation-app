// Principal libraries
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Alert,
} from 'react-native';

// Extras
import selectors from '../../../../../reducers/classes/selectors';
import search from '../../../../../actions/classes/search';
import {colors} from '../../../../../utils/constants';
import {
  DBDateToLetterUy,
  DBDateToTimeJs,
  DBDateToFullUyJs,
} from '../../../../../utils/date';
import Touchable from '../../../../../components/Touchable';
import removeAction from '../../../../../actions/classes/remove';

const Detail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {myClass, isFetching} = useSelector(state => ({
    myClass: selectors.getClass(state),
    isFetching: selectors.isFetching(state),
  }));

  const {
    item: {id, date},
  } = route.params;

  const handleRemove = username => () =>
    Alert.alert(
      `Desagendar a ${username}`,
      '¿Estas seguro que quieres desagendarlo?',
      [
        {
          text: 'Si',
          onPress: () =>
            dispatch(removeAction({idUser: username, idClass: id})),
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );

  useEffect(() => {
    dispatch(search({idClass: id}));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `${DBDateToLetterUy(date)} a las ${DBDateToTimeJs(date)}`,
    });
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.content} key={item.username}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          {item.username} - {item.name}
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.text}>{item.phone}</Text>
          <Text style={styles.text}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>
          <Text style={styles.mark}>Fecha de reserva: </Text>
          {DBDateToFullUyJs(item.created)}
        </Text>
      </View>
      <Touchable
        style={[styles.footer, {backgroundColor: colors.red}]}
        onPress={handleRemove(item.username)}>
        <Text style={styles.text}>Quitar</Text>
      </Touchable>
    </View>
  );

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator color={colors.blue} size={30} />
      ) : (
        <>
          <Text style={styles.title}>Personas agendadas para la clase:</Text>

          <FlatList
            style={styles.list}
            data={myClass}
            renderItem={renderItem}
            keyExtractor={item => item.username}
          />
          <Text style={styles.title}>Total: {myClass.length}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.blue,
  },
  content: {
    width: '100%',
    backgroundColor: colors.blueVariant,
    marginVertical: 15,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list: {
    width: '100%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.gold,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  mark: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    opacity: 0.8,
    paddingVertical: 3,
  },
  textFooter: {
    fontSize: 14,
    color: colors.black,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 3,
  },
  textHeader: {
    fontSize: 14,
    color: colors.black,
  },
});

export default Detail;
