// Principal libraries
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

// Components
import Touchable from '../../components/Touchable';

// Extras
import {colors} from '../../utils/constants';
import selectors from '../../reducers/account/selectors';
import actions from '../../reducers/account/actions';
import resendAction from '../../actions/session/resend';

const Recover = ({navigation, route}) => {
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const {params = {}} = route;
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [values, setValues] = useState({
    email: params.email,
  });

  const onChange = value => text => setValues({...values, [value]: text});

  const onSubmit = () => {
    if (values.email.length < 4) {
      Alert.alert('Recuperar contraseña', 'El usuario esta incompleto');
    } else {
      dispatch(resendAction({username: values.email}));
      navigation.navigate('RecoverPass', {email: values.email});
    }
  };

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
      Alert.alert('Recuperar contraseña', response.message);
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
          <Text style={styles.title}>Enviar código de verificación</Text>
          <TextInput
            style={[styles.input]}
            value={values.email}
            onChangeText={onChange('email')}
            placeholder="Correo"
            maxLength={80}
            returnKeyType="done"
            autoCapitalize="none"
            onSubmitEditing={onSubmit}
          />
        </View>
        <Touchable highlight style={styles.button} onPress={onSubmit}>
          {isFetching ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={styles.buttonText}>Recuperar contraseña</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegisterText: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    padding: 10,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  buttonRecover: {
    padding: 10,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  picker: {
    width: '80%',
    marginVertical: 5,
    fontSize: 16,
  },
});

export default Recover;
