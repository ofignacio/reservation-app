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

// Components
import Touchable from '../../../components/Touchable';

// Extras
import create from '../../../actions/notification/create';
import {colors} from '../../../utils/constants';
import selectors from '../../../reducers/notification/selectors';
import actions from '../../../reducers/notification/actions';

const Notifications = ({navigation}) => {
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const scrollRef = useRef();
  const [values, setValues] = useState({
    username: '',
    title: '',
    description: '',
  });

  const onChange = value => text => setValues({...values, [value]: text});

  const onSubmit = () => {
    if (
      values.username.length < 4 ||
      values.title.length < 4 ||
      values.description.length < 4
    ) {
      Alert.alert('Enviar notificación', 'Los campos no son validos');
    } else {
      dispatch(create(values, navigation));
    }
  };

  const handleNext = () => titleRef.current.focus();

  const handleNextTitle = () => descriptionRef.current.focus();

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
      Alert.alert('Enviar notificación', response.message);
      dispatch(actions.clear());
    }
  }, [response]);

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
          <Text style={styles.title}>Enviar notificación</Text>
          <TextInput
            style={styles.input}
            value={values.username}
            maxLength={20}
            onChangeText={onChange('username')}
            placeholder="Cédula / Otro"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNext}
          />
          <TextInput
            ref={titleRef}
            style={styles.input}
            value={values.title}
            maxLength={40}
            onChangeText={onChange('title')}
            placeholder="Título"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNextTitle}
          />
          <TextInput
            ref={descriptionRef}
            style={[styles.input, styles.textarea]}
            value={values.name}
            maxLength={200}
            onChangeText={onChange('description')}
            placeholder="Descripción"
            returnKeyType="done"
            autoCapitalize="none"
            multiline
            onSubmitEditing={onSubmit}
          />
        </View>
        <Touchable highlight style={styles.button} onPress={onSubmit}>
          {isFetching ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
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
    marginVertical: 40,
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
  textarea: {
    height: 100,
    textAlignVertical: 'to',
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
});

export default Notifications;
