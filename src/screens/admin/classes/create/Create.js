import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';

// Components
import Touchable from '../../../../components/Touchable';

// Extras
import create from '../../../../actions/classes/create';
import {colors} from '../../../../utils/constants';
import selectors from '../../../../reducers/classes/selectors';
import actions from '../../../../reducers/classes/actions';
import {
  DBDateToLetterUy,
  DBDateToTimeJs,
  jsDateWithTimeToDB,
} from '../../../../utils/date';

const Create = ({navigation}) => {
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const dispatch = useDispatch();
  const quotaRef = useRef();
  const nameRef = useRef();
  const scrollRef = useRef();
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [text, setText] = useState({
    date: 'Fecha de clase',
    time: 'Hora de clase',
  });
  const [values, setValues] = useState({
    date: new Date(),
    time: new Date(),
    quota: '',
    area: 'MALVIN',
    type: 'SPINNING',
    name: '',
  });

  const onChange = field => value => setValues({...values, [field]: value});

  const onChangeDate = field => (event, selectedDate) => {
    const currentDate = selectedDate || values[field];
    if (field === 'date') setShowDate(false);
    else setShowTime(false);
    setValues({...values, [field]: currentDate});
  };

  const onSubmit = () => {
    if (!values.date || values.quota.length === 0 || values.area.length < 4) {
      Alert.alert('Crear clase', 'Los campos no son validos');
    } else {
      dispatch(
        create(
          {
            ...values,
            type: values.area === 'CARRASCO' ? values.type : '',
            date: jsDateWithTimeToDB(values.date, values.time),
          },
          navigation,
        ),
      );
    }
  };

  const handleNext = () => nameRef.current.focus();

  // const handleNextArea = () => areaRef.current.focus();

  // const handleNextType = () => typeRef.current.focus();

  const handleDate = () => setShowDate(!showDate);

  const handleTime = () => setShowTime(!showTime);

  const handleKeyboard = () => {
    scrollRef.current.scrollToEnd({animated: true});
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboard);
    return () => {
      Keyboard.removeListener('keyboardDidShow', handleKeyboard);
    };
  }, []);

  useEffect(() => {
    if (response.isError && response.message) {
      Alert.alert('Crear clase', response.message);
      dispatch(actions.clear());
    }
  }, [response]);

  useEffect(() => {
    setText({
      date: `${DBDateToLetterUy(values.date)}`,
      time: `${DBDateToTimeJs(values.time)}`,
    });
  }, [values.date, values.time]);

  return (
    <KeyboardAvoidingView
      style={styles.keyContent}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 60}
      enabled={Platform.OS === 'ios' ? true : false}>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>Crear una clase nueva</Text>
          <Text style={styles.text}>
            Elige la fecha y la hora de cuando estará disponible la clase.
          </Text>
          <View style={styles.row}>
            <Touchable style={styles.buttonInput} onPress={handleDate}>
              <Text style={styles.buttonInputText}>{text.date}</Text>
            </Touchable>
            <Touchable style={styles.buttonInput} onPress={handleTime}>
              <Text style={styles.buttonInputText}>{text.time}</Text>
            </Touchable>
          </View>
          <TextInput
            ref={quotaRef}
            style={styles.input}
            value={values.quota}
            maxLength={3}
            onChangeText={onChange('quota')}
            placeholder="Cupos"
            keyboardType="numeric"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNext}
          />
          <TextInput
            ref={nameRef}
            style={styles.input}
            value={values.name}
            maxLength={40}
            onChangeText={onChange('name')}
            placeholder="Nombre de clase (Opcional)"
            returnKeyType="next"
            autoCapitalize="none"
            // onSubmitEditing={handleNextArea}
          />
          <Picker
            selectedValue={values.area}
            style={styles.picker}
            onValueChange={onChange('area')}>
            <Picker.Item label="Malvín" value="MALVIN" />
            <Picker.Item label="Carrasco" value="CARRASCO" />
          </Picker>
          {values.area === 'CARRASCO' && (
            <Picker
              selectedValue={values.type}
              style={styles.picker}
              onValueChange={onChange('type')}>
              <Picker.Item label="Spinning" value="SPINNING" />
              <Picker.Item label="Fitness" value="FITNESS" />
            </Picker>
          )}
          {showDate && (
            <DateTimePicker
              style={styles.date}
              value={values.date}
              mode="date"
              display="calendar"
              onChange={onChangeDate('date')}
            />
          )}
          {showTime && (
            <DateTimePicker
              style={styles.date}
              value={values.time}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onChangeDate('time')}
            />
          )}
        </View>
        <Touchable highlight style={styles.button} onPress={onSubmit}>
          {isFetching ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={styles.buttonText}>Crear</Text>
          )}
        </Touchable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 100,
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonInput: {
    width: '80%',
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonInputText: {
    fontSize: 16,
    color: colors.black,
  },
  picker: {
    width: '80%',
    marginVertical: 5,
    fontSize: 16,
  },
  row: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 20,
    width: '80%',
  },
  date: {
    width: '100%',
  },
});

export default Create;
