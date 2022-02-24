import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Touchable from '../../../components/Touchable';

// Extras
import {colors} from '../../../utils/constants';

const Box = ({item, onPress}) => {
  return (
    <Touchable style={styles.container} highlight onPress={onPress}>
      <>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.content}>
          <Text style={styles.text}>{item.description}</Text>
          <Icon name="book" color={colors.white} size={30} />
        </View>
      </>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 5,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize: 14,
    marginRight: 5,
    color: colors.white,
  },
  title: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default Box;
