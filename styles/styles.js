import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'whitesmoke'
  },
  navbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ADA8BEDD',
    height: Constants.statusBarHeight + 50
  },
  title: {
    paddingTop: Constants.statusBarHeight,
    color: '#000000BB',
    fontSize: 26,
    fontFamily: 'DancingScript-Bold'
  },
  paragraph: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000BB'
  },
  saved: {
    paddingLeft: 10,
    width: '100%',
    fontSize: 15,
    textAlign: 'left',
    backgroundColor: 'transparent',
    color: 'whitesmoke'
  },
  header: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 100,
    marginBottom: 100,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#000000BB'
  },
  camera: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  cameraView: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  picture: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  buttons: {
    flex: 1,
    width: '100%',
    height: 70,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  emojiPicker: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export { styles };
