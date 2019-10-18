import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const ratio = win.width / 563;

const styles = {
  blackTransparentContainer: {
  	flex: 1,
  	backgroundColor: 'rgba(0, 0, 0, 0.8)',
  	alignItems: 'center',
  	justifyContent: 'center'
  },

  logo: {
  	width: '80%',
  	height: 276 * ratio
  },

  description: {
    color: 'white',
    fontFamily: 'RussoOne-Regular',
    marginHorizontal: 20,
    marginVertical: 12,
    fontSize: 18,
    textAlign: 'center'
  },

  link: {
    position: 'absolute',
    bottom: 8
  }
}

export default styles;