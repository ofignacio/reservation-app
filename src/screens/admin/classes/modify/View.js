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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Components
import Box from '../../../classes/components/Box';
import Touchable from '../../../../components/Touchable';

// Extras
import get from '../../../../actions/classes/get';
import selectors from '../../../../reducers/classes/selectors';
import {colors, DAYS, TYPES} from '../../../../utils/constants';
import {
  DBDateToLetterUy,
  DBDateToTimeJs,
} from '../../../../../server/src/utils/date';
import {jsDateToDB} from '../../../../utils/date';

const ViewClass = ({navigation}) => {
  const {classes, isFetching, nowDate} = useSelector(state => ({
    classes: selectors.getClasses(state),
    nowDate: selectors.getDate(state),
    isFetching: selectors.isFetching(state),
  }));
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState();
  const [type, setType] = useState(TYPES[0]);
  const [neighborhood, setNeighborhood] = useState('MALVIN');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [text, setText] = useState({
    start: 'Fecha de inicio',
  });
  const [values, setValues] = useState({
    start: new Date(),
  });

  const handleChange = value => () => setDate(value);

  const handleClick = item => navigation.navigate('ModifyClass', {item});

  const handleType = value => () => setType(value);

  const handleNeighborhood = value => () => setNeighborhood(value);

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
      <View style={styles.headerContent}>
        {['MALVIN', 'CARRASCO'].map(label => (
          <Touchable
            highlight
            onPress={handleNeighborhood(label)}
            key={label}
            style={[
              styles.button,
              {
                backgroundColor:
                  label === neighborhood ? colors.blueVariant2 : colors.white,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: label === neighborhood ? colors.white : colors.black,
                },
              ]}>
              {label}
            </Text>
          </Touchable>
        ))}
      </View>
      {neighborhood === 'CARRASCO' && (
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
      <Text style={styles.buttonText}>No hay reservas para esta fecha</Text>
    </View>
  );

  const handleStartDate = () => setShowStartDate(!showStartDate);

  const handleEndDate = () => setShowEndDate(!showEndDate);

  const onChangeDate = field => (event, selectedDate) => {
    const currentDate = selectedDate || values[field];
    setShowStartDate(false);
    setValues({...values, [field]: currentDate});
  };

  useEffect(() => {
    dispatch(get({start: jsDateToDB(new Date())}));
  }, []);

  useEffect(() => {
    setText({
      start: `${DBDateToLetterUy(values.start)}`,
    });
    dispatch(
      get({
        start: jsDateToDB(values.start),
      }),
    );
  }, [values.start]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isFetching ? (
          <ActivityIndicator size={40} />
        ) : (
          <>
            <Text style={styles.text}>
              Elige una fecha para ver las clases y reservas de ese día:
            </Text>
            <Touchable style={styles.buttonInput} onPress={handleStartDate}>
              <Text style={styles.buttonInputText}>{text.start}</Text>
            </Touchable>
            {showStartDate && (
              <DateTimePicker
                style={styles.date}
                value={values.start}
                mode="date"
                display="calendar"
                onChange={onChangeDate('start')}
              />
            )}
            <FlatList
              style={styles.list}
              numColumns={3}
              ListEmptyComponent={renderEmpty}
              data={classes.filter(
                item =>
                  (item.area === neighborhood && item.type === type) ||
                  (item.area === neighborhood && !item.type),
              )}
              renderItem={renderItem}
              ListHeaderComponent={renderHeader}
            />
          </>
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
    fontSize: 14,
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
  buttonInput: {
    width: '80%',
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInputText: {
    fontSize: 16,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: colors.blue,
    marginHorizontal: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ViewClass;
