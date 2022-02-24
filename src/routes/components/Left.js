// Principal libraries
import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import Touchable from '../../components/Touchable';

// Extras
import {colors} from '../../utils/constants';
import actions from '../../reducers/account/actions';

const Left = () => {
  const dispatch = useDispatch();
  const handlePress = () => dispatch(actions.logout());

  return (
    <Touchable style={styles.button} highlight onPress={handlePress}>
      <Icon name="ios-exit-outline" color={colors.blue} size={24} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default Left;
