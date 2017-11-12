import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
  },
  paragraph: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495E',
  },
  title: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 100,
    marginBottom: 130,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#34495E',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  buttons: {
    flex: 1,
    width: '100%',
    height: 70,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  emojiPicker: {
    height: '100%',
    paddingTop: Constants.statusBarHeight,
  }
});

export { styles }
