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
import verify from '../../actions/session/verify';
import resend from '../../actions/session/resend';
import {colors} from '../../utils/constants';
import selectors from '../../reducers/account/selectors';
import actions from '../../reducers/account/actions';

const Verify = ({navigation}) => {
  const {isFetching, response, account} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
    account: selectors.getAccount(state),
  }));
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [code, setCode] = useState('');
  const [disable, setDisable] = useState(false);

  const onSubmit = () => {
    if (code.length < 4) {
      Alert.alert('Verificar cuenta', 'El código no puede estar incompleto');
    } else {
      dispatch(verify({code, username: account.username}));
    }
  };

  const handleResend = () => {
    dispatch(resend({username: account.username}));
    setDisable(true);
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
      Alert.alert('Verificar cuenta', response.message);
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
          <Text style={styles.title}>Verificar cuenta</Text>
          <Text style={styles.text}>
            Te hemos envíado un código al correo electrónico en el momento que
            te registraste, revisa la carpeta de spam
          </Text>
          <TextInput
            style={styles.input}
            value={code}
            maxLength={5}
            onChangeText={setCode}
            placeholder="Código"
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
            <Text style={styles.buttonText}>Verificar</Text>
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
