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
import verify from '../../actions/recover/verify';
import resend from '../../actions/session/resend';
import {colors} from '../../utils/constants';
import selectors from '../../reducers/account/selectors';
import actions from '../../reducers/account/actions';

const Verify = ({navigation, route}) => {
  const {isFetching, response} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
  }));
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [disable, setDisable] = useState(false);

  const codeRef = useRef();
  const passRef = useRef();
  const repeatPassRef = useRef();

  const {email} = route.params;

  const onSubmit = () => {
    if (code.length < 4) {
      Alert.alert(
        'Recuperar contraseña',
        'El código no puede estar incompleto',
      );
    } else if (pass !== repeatPass) {
      Alert.alert('Recuperar contraseña', 'Las contraseñas no coinciden');
    } else {
      dispatch(verify({code, password: pass, email}, navigation));
    }
  };

  const handleResend = () => {
    dispatch(resend({username: email}));
    setDisable(true);
  };

  const handleKeyboard = () => {
    scrollRef.current.scrollToEnd({animated: true});
  };

  const handlePassRef = () => passRef.current.focus();

  const handleRepeatPassRef = () => repeatPassRef.current.focus();

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
        <View style={styles.content}>
          <Text style={styles.title}>Recuperar contraseña</Text>
          <Text style={styles.text}>
            Te hemos envíado un código al correo electrónico, revisa la carpeta
            de spam
          </Text>
          <TextInput
            ref={codeRef}
            style={styles.input}
            value={code}
            maxLength={5}
            onChangeText={setCode}
            placeholder="Código"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handlePassRef}
          />
          <TextInput
            ref={passRef}
            style={styles.input}
            value={pass}
            maxLength={30}
            onChangeText={setPass}
            secureTextEntry
            placeholder="Contraseña nueva"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={handleRepeatPassRef}
          />
          <TextInput
            ref={repeatPassRef}
            style={styles.input}
            value={repeatPass}
            maxLength={30}
            onChangeText={setRepeatPass}
            secureTextEntry
            placeholder="Repetir contraseña nueva"
            returnKeyType="done"
            autoCapitalize="none"
            onSubmitEditing={onSubmit}
          />
          <Touchable
            highlight
            style={styles.buttonResend}
            onPress={handleResend}
            disabled={disable}>
            <Text style={styles.buttonResendText}>
              Enviar código nuevamente
            </Text>
          </Touchable>
        </View>
        <Touchable highlight style={styles.button} onPress={onSubmit}>
          {isFetching ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={styles.buttonText}>Cambiar contraseña</Text>
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
  buttonResendText: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonResend: {
    width: '60%',
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
  },
});

export default Verify;
