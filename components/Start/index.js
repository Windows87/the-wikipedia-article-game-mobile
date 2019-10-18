import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import LetsPlayItButton from '../LetsPlayItButton';

import logo from '../../src/logo.png';
import styles from './styles';

const Game = ({ backgroundImage, onStartGame }) => ( 
  <View style={styles.blackTransparentContainer}>
    <Image style={styles.logo} resizeMode="contain" source={logo} />
    <Text style={styles.description}>How much you can hit which Wikipedia article is most viewed just by its photos and names?</Text>
          
    { !backgroundImage ? <LetsPlayItButton text="Wait.." onPress={() => {}} /> : null }
    { backgroundImage ? <LetsPlayItButton text="Let's Play It!" onPress={onStartGame} /> : null }
  
  	<TouchableOpacity style={styles.link} onPress={() => Linking.openURL('https://windows87.github.io/')}>
  	  <Text style={styles.description}>Made by Yuri Faria</Text>
  	</TouchableOpacity>
  </View>
);


export default Game;