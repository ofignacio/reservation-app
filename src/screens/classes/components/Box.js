// Principal libraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utils/constants';

// Extras
import {DBDateToTimeJs} from '../../../utils/date';
import Touchable from '../../../components/Touchable';

const Box = ({item, onClick}) => {
  const handleClick = () => onClick(item);

  return (
    <Touchable highlight style={styles.container} onPress={handleClick}>
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{DBDateToTimeJs(item.date)}</Text>
        </View>
        <View style={styles.content}>
          {item.name ? (
            <Text style={styles.title}>{item.name}</Text>
          ) : item.type ? (
            <Text style={styles.title}>{item.type}</Text>
          ) : null}
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>
            {item.quantity}/{item.quota}
          </Text>
        </View>
      </>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
    margin: 10,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.blue,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    color: colors.black,
  },
  text: {
    fontSize: 14,
    color: colors.black,
  },
});

export default Box;
