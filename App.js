import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  CameraRoll,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.0
import { styles } from './styles/styles';
import { Camera, Permissions, Constants, Font } from 'expo';
import EmojiPicker from 'react-native-snap-emoji';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    cameraRollURI: null,
    fontLoaded: false,
    showEmojiPicker: false,
    savedFadeInit: new Animated.Value(0)
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'DancingScript-Bold': require('./assets/fonts/DancingScript-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  takePic = async () => {
    if (this.camera) {
      this.setState({
        photo: await this.camera.takePictureAsync(),
        showEmojiPicker: false,
      });
    }
  };

  savePic = async () => {
    this.animateFade(1, 150);
    let savedPic = await CameraRoll.saveToCameraRoll(this.state.photo.uri, 'photo');
    this.setState({
      cameraRollUri: savedPic
    });
  };

  animateFade = (toValue, duration, delay) => {
    Animated.timing(
      this.state.savedFadeInit,
      {
        toValue,
        duration,
        delay
      }
    ).start(
      toValue === 1 ? this.final : null
    );
  };

  final = () => {
    this.animateFade(0, 300, 500);
  };

  closePic = () => {
    this.setState({
      photo: null,
      cameraRollUri: null,
      showEmojiPicker: false
    });
  };

  showEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  }

  renderRevoked = () => {
    return (
      <View>
        <Text style={styles.header}>
          Oops!
        </Text>
        <Text style={styles.paragraph}>
          Glitter needs your permission to use the 📷
        </Text>
        <Text style={styles.paragraph}>
          Please allow access to the camera in settings ⚙️
        </Text>
      </View>
    );
  };

  renderPic = (photo) => {
    return (
      <Image
        style={styles.picture}
        source={{uri: photo.uri}}/>
    );
  };

  renderPicCameraView = () => {
    return (
      <View style={styles.cameraView}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.touchable}
            onPress={this.savePic.bind(this)}>
            <Ionicons name="ios-download-outline" size={37} color="whitesmoke"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}
            onPress={this.showEmojiPicker.bind(this)}>
            <Ionicons name="ios-glasses-outline" size={44} color="whitesmoke"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}
            onPress={this.closePic.bind(this)}>
            <Ionicons name="ios-close-circle-outline" size={37} color="whitesmoke"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderCamera = () => {
    return (
      <Camera
        style={styles.camera}
        type={this.state.type}
        ref={ref => { this.camera = ref; }}>
      </Camera>
    );
  };

  renderCameraView = () => {
    return (
      <View style={styles.cameraView}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.touchable}
            onPress={this.showEmojiPicker.bind(this)}>
            <Ionicons name="ios-glasses-outline" size={44} color="whitesmoke"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}
            onPress={this.takePic.bind(this)}>
            <Ionicons name="ios-radio-button-on-outline" size={55} color="whitesmoke"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              });
            }}>
            <Ionicons name="ios-reverse-camera-outline" size={44} color="whitesmoke"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { hasCameraPermission, photo, saved, savedFadeInit } = this.state;
    let renderTop;
    let renderBottom;
    let savedText = <Animated.Text style={[styles.saved, {opacity: savedFadeInit}]}>Saved!</Animated.Text>
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      renderBottom = this.renderRevoked();
    } else if (photo !== null) {
      renderTop = this.renderPic(photo);
      renderBottom = this.renderPicCameraView();
    } else {
      renderTop = this.renderCamera();
      renderBottom = this.renderCameraView();
    }
    return (
      <View style={styles.container}>
        {hasCameraPermission ? renderTop : null}
        <View style={styles.navbar}>
          {
            this.state.fontLoaded ? (
              <Text style={styles.title}>Glitter</Text>
            ) : null
          }
        </View>
        {
          hasCameraPermission ? (
            <View style={styles.emojiPicker}>
              <EmojiPicker isVisible={this.state.showEmojiPicker}/>
            </View>
          ) : null
        }
        {savedText}
        {renderBottom}
      </View>
    )
  }
}
