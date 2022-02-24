import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';

// Components
import Touchable from '../../components/Touchable';

// Extras
import register from '../../actions/session/register';
import {colors} from '../../utils/constants';
import selectors from '../../reducers/account/selectors';
import actions from '../../reducers/account/actions';
import {validate_ci, random_ci} from '../../utils/ci';

const Register = ({navigation, route}) => {
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const scrollRef = useRef();
  const {params = {}} = route;
  const [values, setValues] = useState({
    username: params.username,
    email: '',
    name: '',
    password: params.password,
    repeatPassword: params.password,
    phone: '',
    type: 'CI',
  });

  const [wrongCi, setWrongCi] = useState(false);

  const onChange = value => text => setValues({...values, [value]: text});

  const onSubmit = () => {
    if (
      values.email.length < 4 ||
      values.name.length === 0 ||
      values.password.length < 4
    ) {
      Alert.alert(
        'Crear cuenta',
        'El correo, nombre o contraseña están incompletos',
      );
    } else if (values.password !== values.repeatPassword) {
      Alert.alert('Crear cuenta', 'Las contraseñas no coinciden');
    } else {
      if (values.username) {
        dispatch(register(values, navigation));
      } else {
        dispatch(
          register(
            {...values, username: random_ci(), phone: '123456789'},
            navigation,
          ),
        );
      }
    }
  };

  const handleNext = () => {
    if (
      (values.type === 'CI' && validate_ci(values.username)) ||
      values.type === 'OTHER'
    ) {
      setWrongCi(false);
      emailRef.current.focus();
    } else {
      setWrongCi(true);
    }
  };

  const handleNextEmail = () => nameRef.current.focus();

  const handleNextName = () => phoneRef.current.focus();

  const handleNextPhone = () => passwordRef.current.focus();

  const handleNextPassword = () => repeatPasswordRef.current.focus();

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
      Alert.alert('Crear cuenta', response.message);
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
        <View style={styles.logo}>
          <Image
            style={styles.image}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Picker
            selectedValue={values.type}
            style={styles.picker}
            onValueChange={onChange('type')}>
            <Picker.Item label="Cédula" value="CI" />
            <Picker.Item label="Pasaporte / Otros" value="OTHER" />
          </Picker>
          <TextInput
            style={styles.input}
            value={values.username}
            maxLength={values.type === 'CI' ? 8 : 20}
            onChangeText={onChange('username')}
            placeholder={
              values.type === 'CI'
                ? 'Cédula (Opcional)'
                : 'Pasaporte (Opcional)'
            }
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNext}
          />
          <TextInput
            ref={emailRef}
            style={styles.input}
            value={values.email}
            maxLength={40}
            onChangeText={onChange('email')}
            placeholder="Correo"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNextEmail}
          />
          <TextInput
            ref={nameRef}
            style={styles.input}
            value={values.name}
            maxLength={20}
            onChangeText={onChange('name')}
            placeholder="Nombre"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNextName}
          />
          <TextInput
            ref={phoneRef}
            style={styles.input}
            value={values.phone}
            maxLength={9}
            onChangeText={onChange('phone')}
            placeholder="Celular (Opcional)"
            keyboardType="numeric"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNextPhone}
          />
          <TextInput
            ref={passwordRef}
            secureTextEntry
            maxLength={15}
            style={styles.input}
            value={values.password}
            onChangeText={onChange('password')}
            placeholder="Contraseña"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleNextPassword}
          />
          <TextInput
            ref={repeatPasswordRef}
            secureTextEntry
            maxLength={15}
            style={styles.input}
            value={values.repeatPassword}
            onChangeText={onChange('repeatPassword')}
            placeholder="Repetir contraseña"
            returnKeyType="done"
            autoCapitalize="none"
            onSubmitEditing={onSubmit}
          />
        </View>
        <Touchable highlight style={styles.button} onPress={onSubmit}>
          {isFetching ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={styles.buttonText}>Registrarme</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    marginVertical: 15,
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
  picker: {
    width: '80%',
    marginVertical: 5,
    fontSize: 16,
  },
});

export default Register;
