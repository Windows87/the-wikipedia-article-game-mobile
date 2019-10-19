import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCo from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const VsElement = () => (
  <View style={styles.vsContainer}>
    <Text style={styles.vsText}>VS</Text>
  </View>
);

const CorrectElement = () => (
  <View style={[styles.vsContainer, { backgroundColor: '#4caf50' }]}>
    <Icon name="check" size={70} color="white" />
  </View>
);

const WrongElement = () => (
  <View style={[styles.vsContainer, { backgroundColor: '#F44336' }]}>
    <Icon name="close" size={70} color="white" />
  </View>
);

const EqualElement = () => (
  <View style={[styles.vsContainer, { backgroundColor: '#3f51b5' }]}>
    <IconCo name="equal" size={70} color="white" />
  </View>
);

const LoadingElement = () => (
  <View style={[styles.vsContainer, { backgroundColor: '#4caf50' }]}>
    <ActivityIndicator size={70} color="#ffffff" />
  </View>
);

const ImageButton = ({article, showViews, articlesViews, articleNumber, onPress}) => (
  <TouchableOpacity style={styles.imageButton} onPress={() => onPress(article, articleNumber)}>
    <ImageBackground style={styles.image} source={{ uri: article.image }}>
      <View style={styles.imageView}>
        <Text style={styles.imageText}>{ article.title }</Text>
        { showViews ? <Text style={styles.imageViewsText}>{ articlesViews } views in last month</Text> : null }
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

class Game extends Component { 
  state = {
  	articles: this.props.articles,
    articlesViews: [0, 0],
    alreadyClicked: false,
    
    showViews: false,

    loading: false,
    correct: false,
    equal: false,
    wrong: false,
    gameOver: false
  }

  UNSAFE_componentWillReceiveProps({ articles }) {
    if(articles[0].title !== this.state.articles[0].title)
      this.setState({ loading: false, alreadyClicked: false, correct: false, equal: false, wrong: false, showViews: false, articlesViews: [0, 0], articles });
  }

  compareArticlesViews = (selectedArticle, articleNumber) => {
    const { articles, alreadyClicked, roundWaitingTime } = this.state;

    if(alreadyClicked)
      return;

    this.setAlreadyClicked();

    let victorious = -1;

    if (articles[0].views > articles[1].views) {
      victorious = 0;
    } else {
      victorious = 1;
    }

    this.showViews(articles);

    if(victorious === articleNumber) {
      this.setCorrect();
      this.props.updateScore();
    } else if(victorious === -1) {
      this.setEqual();
    } else {
      this.setWrong();
      this.setState({ gameOver: true });
    }
  }

  onGameOver = () => {
    this.setState({ gameOver: false });
    this.props.onGameOver();
    this.newRound();
  }

  newRound = () => {
    this.setState({ loading: true });
    this.props.newRound();
  }

  setAlreadyClicked = () => {
    this.setState({ alreadyClicked: true });
  }

  setCorrect = () => {
    this.setState({ correct: true });
  }

  setEqual = () => {
    this.setState({ equal: true });
  }

  setWrong = () => {
    this.setState({ wrong: true });
  }

  showViews = () => {
    let { articles, articlesViews } = this.state;

    this.setState({ showViews: true });

    setTimeout(() => {
      if(articles[0].views > articlesViews[0]) {
        if(articles[0].views - articlesViews[0] >= 1000) {
          articlesViews[0] += 1000;
        } else if (articles[0].views - articlesViews[0] >= 100) {
          articlesViews[0] += 100;
        } else if (articles[0].views - articlesViews[0] >= 10) {
          articlesViews[0]+= 10;
        } else {
          articlesViews[0]++;
        }
      }

      if(articles[1].views > articlesViews[1]) {
        if(articles[1].views - articlesViews[1] >= 1000) {
          articlesViews[1] += 1000;
        } else if (articles[1].views - articlesViews[1] >= 100) {
          articlesViews[1] += 100;
        } else if (articles[1].views - articlesViews[1] >= 10) {
          articlesViews[1]+= 10;
        } else {
          articlesViews[1]++;
        }
      }

      this.setState({ articlesViews });

      if(articles[0].views > articlesViews[0] || articles[1].views > articlesViews[1]) { 
        this.showViews();
      } else {
        if(this.state.gameOver)
          this.onGameOver();
        else
          this.newRound();
      }
    }, 10);
  }

  render() {
  	const { articles, showViews, articlesViews, correct, equal, wrong, loading } = this.state;

    return (
      <View style={styles.game}>
        <ImageButton article={articles[0]} showViews={showViews} articleNumber={0} articlesViews={articlesViews[0]} onPress={this.compareArticlesViews} />
        <ImageButton article={articles[1]} showViews={showViews} articleNumber={1} articlesViews={articlesViews[1]} onPress={this.compareArticlesViews} />
        
        { !loading && !correct && !equal && !wrong ? <VsElement /> : null }
        { correct ? <CorrectElement /> : null }
        { equal ? <EqualElement /> : null }
        { wrong ? <WrongElement /> : null }
        { loading ? <LoadingElement /> : null }        
      </View>
    );
  }
};


export default Game;
