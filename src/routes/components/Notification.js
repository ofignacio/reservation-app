// Principal libraries
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import Touchable from '../../components/Touchable';

// Extras
import {colors} from '../../utils/constants';

const Notification = ({navigation}) => {
  const handlePress = () => navigation.navigate('Notifications');

  return (
    <Touchable style={styles.button} highlight onPress={handlePress}>
      <Icon name="notifications" color={colors.blue} size={24} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default Notification;
