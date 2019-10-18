import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const LetsPlayIt = ({ onPress, text }) => (
  <TouchableOpacity style={styles.letsPlayItButton} onPress={onPress}>
    <Text style={styles.letsPlayItButtonText}>{ text }</Text>
  </TouchableOpacity>
);


export default LetsPlayIt;