// Principal libraries
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

// Components
import Box from './components/Box';
import Touchable from '../../components/Touchable';

// Extras
import get from '../../actions/classes/get';
import selectors from '../../reducers/classes/selectors';
import {colors, DAYS, TYPES} from '../../utils/constants';
import {DBToDay, jsCoreDateCreator} from '../../utils/date';

const Classes = ({route, navigation}) => {
  const {classes, isFetching, nowDate} = useSelector(state => ({
    classes: selectors.getClasses(state),
    nowDate: selectors.getDate(state),
    isFetching: selectors.isFetching(state),
  }));
  const {neighborhood, hasType} = route.params;
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState();
  const [type, setType] = useState(TYPES[0]);

  // console.log('classes', classes);
  // console.log('nowDate', nowDate);
  console.log('dates', dates);
  // console.log('date', date);

  const handleChange = value => () => setDate(value);

  const handleClick = item => navigation.navigate('Book', {item});

  const handleType = value => () => setType(value);

  const renderItem = ({item}) => (
    <Box key={item.id} item={item} onClick={handleClick} />
  );

  const renderHeader = () => (
    <View style={styles.containerHeader}>
      <View style={styles.headerContent}>
        {dates.map(({label, value}) => (
          <Touchable
            onPress={handleChange(value)}
            highlight
            key={label}
            style={[
              styles.button,
              {
                backgroundColor:
                  date && value.getDay() === date.getDay()
                    ? colors.blue
                    : colors.white,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    date && value.getDay() === date.getDay()
                      ? colors.white
                      : colors.black,
                },
              ]}>
              {label}
            </Text>
          </Touchable>
        ))}
      </View>
      {hasType && (
        <View style={styles.headerContent}>
          {TYPES.map(label => (
            <Touchable
              highlight
              onPress={handleType(label)}
              key={label}
              style={[
                styles.button,
                {
                  backgroundColor:
                    label === type ? colors.blueVariant : colors.white,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: label === type ? colors.white : colors.black,
                  },
                ]}>
                {label}
              </Text>
            </Touchable>
          ))}
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContent}>
      <Text style={styles.buttonText}>No hay clases para esta fecha</Text>
    </View>
  );

  useEffect(() => {
    dispatch(get({neighborhood}));
  }, []);

  useEffect(() => {
    if (nowDate) {
      let dt;
      if (typeof nowDate === 'string')
        dt = new Date(nowDate.replace(/-/g, '/'));
      else dt = new Date(nowDate);
      console.log(dt.getDay());
      const array = [
        ...DAYS.slice(dt.getDay(), DAYS.length),
        ...DAYS.slice(0, dt.getDay()),
      ].map((item, index) => {
        let realDate = new Date(dt);
        realDate.setDate(realDate.getDate() + index);
        return {label: item, value: realDate};
      });
      setDate(dt);
      setDates(array);
    }
  }, [nowDate]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.content}>
        {isFetching ? (
          <ActivityIndicator size={40} />
        ) : (
          <FlatList
            style={styles.list}
            numColumns={3}
            ListEmptyComponent={renderEmpty}
            data={
              date &&
              classes.filter(
                item =>
                  (new Date(item.date.replace(/-/g, '/')).getDate() ===
                    date.getDate() &&
                    DBToDay(item.date) === date.getDay() &&
                    hasType &&
                    type === item.type) ||
                  (new Date(item.date.replace(/-/g, '/')).getDate() ===
                    date.getDate() &&
                    DBToDay(item.date) === date.getDay() &&
                    !hasType),
              )
            }
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerHeader: {
    marginVertical: 20,
  },
  logo: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    flex: 1,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' ? 10 : 12,
  },
  list: {
    width: '100%',
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Classes;
