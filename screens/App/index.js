import React, { Component } from 'react';
import { StatusBar, ImageBackground, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LetsPlayItButton from '../../components/LetsPlayItButton';

import GameOver from '../../components/GameOver';
import Start from '../../components/Start';
import Game from '../../components/Game';

import { generateTwoRandomArticles } from '../../utils/generateRandomArticles';
import styles from './styles';

class App extends Component {
  state = {
  	score: 0,
    highScore: 0,
  	backgroundImage: null,
  	started: false,
    gameOver: false,
  	articles: []
  }

  componentDidMount() {
  	this.getArticles();
    this.setHighScore();
  }

  setHighScore = async () => {
    const highScore = await AsyncStorage.getItem('highScore') || 0;
    this.setState({ highScore });
  }

  getArticles = async () => {
  	try {
  	  const articles = await generateTwoRandomArticles();
  	  
  	  if(!this.state.backgroundImage)
  	  	this.setState({ backgroundImage: articles[0].image });

  	  this.setState({ articles });
  	} catch(error) {
  	  ToastAndroid.show('Error in get articles. Trying again in 3 seconds.', ToastAndroid.SHORT);
  	  setTimeout(this.getArticles(), 5000);
  	}
  }

  updateScore = async () => {
    const score = this.state.score + 1;
    const highScore = await AsyncStorage.getItem('highScore') || 0;

    this.setState({ score });

    if(score > highScore) {
      await AsyncStorage.setItem('highScore', score.toString());
      this.setState({ highScore: score });
    }
  }

  startGame = () => {
  	this.setState({ started: true });
  }

  onGameOver = () => {
    this.setState({ gameOver: true });
  }

  onTryAgain = () => {
    this.setState({ gameOver: false });
  }

  onGameOverExit = () => {
    this.setState({ gameOver: false, started: false, score: 0 });
  }

  render() {
  	const { backgroundImage, articles, started, gameOver, score, highScore } = this.state;

    return (
      <ImageBackground source={backgroundImage && !started ? { uri: backgroundImage } : null} style={styles.bigContainer}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        { !started ? <Start backgroundImage={backgroundImage} onStartGame={this.startGame} /> : null }
        { started ? <Game articles={articles} updateScore={this.updateScore} newRound={this.getArticles} onGameOver={this.onGameOver} /> : null }
        { gameOver ? <GameOver onExit={this.onGameOverExit} onTryAgain={this.onTryAgain} score={score} highScore={highScore} /> : null  }
      </ImageBackground>
    );
  }
}

export default App;