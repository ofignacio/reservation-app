// Principal libraries
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from 'react-native';

// Components
import Box from './components/Box';
import Touchable from '../../components/Touchable';

// Extras
import selectors from '../../reducers/notification/selectors';
import get from '../../actions/notification/get';
import {colors} from '../../utils/constants';

const Notification = ({navigation}) => {
  const dispatch = useDispatch();
  const {notifications, isFetching} = useSelector(state => ({
    notifications: selectors.getNotifications(state),
    isFetching: selectors.isFetching(state),
  }));

  useEffect(() => {
    dispatch(get());
  }, []);

  const handlePress = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'Area'}],
    });

  const handleDetail = item => () => {
    if (item.idClass) {
      navigation.navigate('Detail', item);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isFetching ? (
          <ActivityIndicator color={colors.blue} size={30} />
        ) : (
          <>
            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={require('../../assets/logo.png')}
              />
            </View>
            {notifications.map(item => (
              <Box key={item.id} item={item} onPress={handleDetail(item)} />
            ))}
          </>
        )}
      </ScrollView>
      <Touchable style={styles.button} highlight onPress={handlePress}>
        <Text style={styles.buttonText}>Inicio</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    height: 100,
  },
  button: {
    paddingVertical: 15,
    backgroundColor: colors.blueVariant2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Notification;
