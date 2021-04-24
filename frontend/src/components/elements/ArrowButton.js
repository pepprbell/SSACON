import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  requireNativeComponent,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ArrowButton({onHandlePress}) {
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      activeOpacity={0.7}
      style={[styles.container]}>
      <FontAwesome5
        style={styles.arrowIcon}
        name={'angle-left'}
        color="white"
      />
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 1280

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: windowWidth * 0.25,
    height: windowHeight * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: windowWidth * 0.0078125,
    paddingVertical: windowHeight * 0.0130208,
  },
  arrowIcon: {
    color: 'blue',
    fontSize: windowWidth * 0.1,
  },
});

export default ArrowButton;
