import { Dimensions } from 'react-native';

const win = Dimensions.get('window');

const styles = {
  game: {
  	flex: 1
  },

  imageButton: {
  	flex: 1,
  	backgroundColor: 'white'
  },

  image: {
  	flex: 1
  },

  imageView: {
  	flex: 1,
  	backgroundColor: 'rgba(0, 0, 0, 0.8)',
  	alignItems: 'center',
  	justifyContent: 'center'
  },

  imageText: {
  	fontFamily: 'RussoOne-Regular',
  	textAlign: 'center',
  	color: 'white',
  	fontSize: 28,
  	margin: 8
  },

  imageViewsText: {
  	fontFamily: 'RussoOne-Regular',
  	textAlign: 'center',
  	color: 'white',
  	fontSize: 20,
  	margin: 8  	
  },

  vsContainer: {
  	width: 90,
  	height: 90,
  	borderRadius: 360,
  	backgroundColor: '#f44336',
  	padding: 2,
  	alignItems: 'center',
  	justifyContent: 'center',
  	position: 'absolute',
  	alignSelf: 'center',
  	top: win.height * 0.5 - 45,
  },

  vsText: {
    color: 'white',
    fontFamily: 'RussoOne-Regular',
    fontSize: 50
  }
}

export default styles;