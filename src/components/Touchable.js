// Principal libraries
import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
  View,
} from 'react-native';

// Extras
import {colors} from '../utils/constants';

const Touchable = ({
  style,
  onPress = () => {},
  children,
  disabled,
  highlight = false,
  underlayColor = colors.blueVariant2,
  styleDisabled = {backgroundColor: colors.gray},
}) => {
  const isAndroid = Platform.OS === 'android';
  if (isAndroid)
    return (
      <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
        <View style={[style, disabled ? styleDisabled : null]}>{children}</View>
      </TouchableNativeFeedback>
    );
  if (highlight)
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        underlayColor={underlayColor}
        style={[style, disabled ? styleDisabled : null]}>
        {children}
      </TouchableHighlight>
    );
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, disabled ? styleDisabled : null]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
