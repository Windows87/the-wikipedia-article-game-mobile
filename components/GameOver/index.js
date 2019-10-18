import React from 'react';
import { View, Text } from 'react-native';
import LetsPlayItButton from '../LetsPlayItButton';

import styles from './styles';

const GameOver = ({ onExit, onTryAgain, highScore, score }) => ( 
  <View style={styles.gameOverContainer}>       
    <Text style={styles.gameOverText}>Game Over!</Text>
    <Text style={styles.gameOverHighScore}>High Score: { highScore }</Text>
    <Text style={styles.gameOverScore}>Score: { score }</Text>

    <LetsPlayItButton text="Main Page" onPress={onExit} /> 
    <LetsPlayItButton text="Try Again" onPress={onTryAgain} />
  </View>
);


export default GameOver;