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
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

// Components
import Touchable from '../../../components/Touchable';

// Extras
import get from '../../../actions/users/get';
import modify from '../../../actions/users/modify';
import pass from '../../../actions/users/pass';
import {colors} from '../../../utils/constants';
import selectors from '../../../reducers/users/selectors';
import actions from '../../../reducers/users/actions';

const Users = ({navigation}) => {
  const {isFetching, response, user} = useSelector(state => ({
    isFetching: selectors.isFetching(state),
    response: selectors.getResponse(state),
    user: selectors.getUser(state),
  }));
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [values, setValues] = useState({
    verified: false,
    active: false,
    admin: false,
    name: '',
    email: '',
    phone: '',
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handleSearch = () => {
    if (username.length < 4) {
      Alert.alert('Usuarios', 'El usuario no puede estar incompleto');
    } else {
      dispatch(get({username}));
      Keyboard.dismiss();
    }
  };

  const handleReset = () => {
    if (username.length < 4) {
      Alert.alert('Usuarios', 'El usuario no puede estar incompleto');
    } else {
      dispatch(pass({username}, Alert));
    }
  };

  useEffect(() => {
    if (response.isError && response.message) {
      Alert.alert('Usuarios', response.message);
      dispatch(actions.clear());
    }
  }, [response]);

  useEffect(() => {
    if (Object.keys(user).length) {
      setValues({
        admin: !!user.admin,
        active: !!user.active,
        verified: !!user.verified,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(actions.getUsersSuccess({}));
    };
  }, []);

  const handleChange = field => () => {
    dispatch(modify({username, [field]: !values[field]}));
    setValues({...values, [field]: !values[field]});
  };

  const onChange = field => value => setValues({...values, [field]: value});

  const handleEmailRef = () => emailRef.current.focus();

  const handlePhoneRef = () => phoneRef.current.focus();

  const handleSubmit = () => {
    dispatch(modify({username, ...values}, Alert));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Buscar usuario</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={username}
            maxLength={80}
            onChangeText={setUsername}
            placeholder="Cédula / Correo"
            returnKeyType="done"
            autoCapitalize="none"
            onSubmitEditing={handleSearch}
          />
          <Touchable style={styles.button} highlight onPress={handleSearch}>
            <Icon name="search" color={colors.white} size={24} />
          </Touchable>
        </View>
        {isFetching ? (
          <ActivityIndicator color={colors.blue} size={30} />
        ) : Object.keys(user).length ? (
          <>
            <View style={styles.row}>
              <TextInput
                ref={nameRef}
                style={styles.input}
                value={values.name}
                maxLength={50}
                onChangeText={onChange('name')}
                placeholder="Nombre"
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={handleEmailRef}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                ref={emailRef}
                style={styles.input}
                value={values.email}
                maxLength={80}
                onChangeText={onChange('email')}
                placeholder="Correo"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={handlePhoneRef}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                ref={phoneRef}
                style={styles.input}
                value={values.phone}
                maxLength={9}
                onChangeText={onChange('phone')}
                placeholder="Celular"
                keyboardType="numeric"
                returnKeyType="done"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.line}>
                <CheckBox
                  value={values.verified}
                  onValueChange={handleChange('verified')}
                />
                <Text style={styles.checkText}>Correo verificado</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.line}>
                <CheckBox
                  value={values.active}
                  onValueChange={handleChange('active')}
                />
                <Text style={styles.checkText}>Usuario activo</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.line}>
                <CheckBox
                  value={values.admin}
                  onValueChange={handleChange('admin')}
                />
                <Text style={styles.checkText}>Usuario administrador</Text>
              </View>
            </View>
            <Touchable style={styles.button} highlight onPress={handleSubmit}>
              <Text style={styles.buttonText}>Editar usuario</Text>
            </Touchable>
            <View style={styles.divider} />
            <Touchable
              style={[styles.button, {backgroundColor: colors.red}]}
              highlight
              onPress={handleReset}>
              <Text style={styles.buttonText}>Restablecer contraseña</Text>
            </Touchable>
            <Text>La contraseña se restablecerá a "bethel"</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    flex: 1,
    marginRight: 5,
  },
  button: {
    padding: 10,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  flex: {
    flex: 1,
  },
  black: {
    fontWeight: 'bold',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '90%',
    marginVertical: 10,
    backgroundColor: colors.black,
  },
  checkText: {
    fontSize: 14,
    color: colors.black,
    marginHorizontal: 5,
  },
});

export default Users;
