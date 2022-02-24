// Principal libraries
import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import Home from '../screens/home/Home';
import AdminHome from '../screens/admin/home/Home';
import AdminNotification from '../screens/admin/notifications/Notifications';
import AdminUser from '../screens/admin/users/Users';
import AdminClasses from '../screens/admin/classes/Classes';
import AdminCreateClass from '../screens/admin/classes/create/Create';
import AdminCreateMasiveClass from '../screens/admin/classes/createAll/CreateMasive';
import AdminShowClasses from '../screens/admin/classes/view/View';
import AdminShowDetailClasses from '../screens/admin/classes/view/components/Detail';
import AdminModifyShowClasses from '../screens/admin/classes/modify/View';
import AdminModifyShowDetailClasses from '../screens/admin/classes/modify/components/Modify';
import Right from './components/Notification';
import Register from '../screens/register/Register';
import Notification from '../screens/notification/Notification';
import Success from '../screens/book/components/Success';
import Book from '../screens/book/Book';
import Classes from '../screens/classes/Classes';
import Login from '../screens/login/Login';
import Verify from '../screens/verify/Verify';
import VerifyCodePass from '../screens/recover/Verify';
import Detail from '../screens/detail/Detail';
import Left from './components/Left';

// Extras
import selectors from '../reducers/account/selectors';
import Recover from '../screens/recover/Recover';

const Stack = createStackNavigator();

const PrivateRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerRight: () => <Right navigation={navigation} />,
      })}>
      <Stack.Screen
        name="Area"
        component={Home}
        options={{title: 'Sucursales', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Classes"
        component={Classes}
        options={{title: 'Agenda', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{title: 'Reserva', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={{title: 'Notificaciones', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{title: 'Detalle de notificación', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

const LoginRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Registro', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{title: 'Verificar cuenta', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Recover"
        component={Recover}
        options={{title: 'Recuperar contraseña', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="RecoverPass"
        component={VerifyCodePass}
        options={{title: 'Recuperar contraseña', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

const VerifyRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => <Left navigation={navigation} />,
      })}>
      <Stack.Screen
        name="VerifyRoute"
        component={Verify}
        options={{title: 'Verificar cuenta', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

const AdminRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={AdminHome}
        options={{title: 'Opciones', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Users"
        component={AdminUser}
        options={{title: 'Usuarios', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Classes"
        component={AdminClasses}
        options={{title: 'Opciones', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Create"
        component={AdminCreateClass}
        options={{title: 'Crear clase', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ViewModifyClass"
        component={AdminModifyShowClasses}
        options={{title: 'Ver clase', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ModifyClass"
        component={AdminModifyShowDetailClasses}
        options={{title: 'Modificar clase', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="CreateAll"
        component={AdminCreateMasiveClass}
        options={{title: 'Crear clases masivas', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Show"
        component={AdminShowClasses}
        options={{title: 'Ver agenda', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DetailBook"
        component={AdminShowDetailClasses}
        options={{title: 'Detalle de clase', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Notifications"
        component={AdminNotification}
        options={{title: 'Notificaciones', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  const {login, account} = useSelector(state => ({
    login: selectors.isLogged(state),
    account: selectors.getAccount(state),
  }));

  if (login && !account.verified) {
    return (
      <NavigationContainer>
        <VerifyRoute />
      </NavigationContainer>
    );
  } else if (login && account.admin) {
    return (
      <NavigationContainer>
        <AdminRoute />
      </NavigationContainer>
    );
  } else if (login) {
    return (
      <NavigationContainer>
        <PrivateRoute />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <LoginRoute />
    </NavigationContainer>
  );
};

export default Router;
