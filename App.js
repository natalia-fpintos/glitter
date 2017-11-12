import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, CameraRoll } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.0
import { styles } from './styles/styles';
import { Camera, Permissions, Constants } from "expo";
import SnapEmoji from 'react-native-snap-emoji';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    cameraRollURI: null,
    showEmojiPicker: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePic = async () => {
    if (this.camera) {
      this.setState({
        photo: await this.camera.takePictureAsync(),
        showEmojiPicker: false});
    }
  };

  savePic = async () => {
    let savedPic = await CameraRoll.saveToCameraRoll(this.state.photo.uri, 'photo');
    this.setState({ cameraRollUri: savedPic });
  };

  closePic = () => {
    this.setState({photo: null, cameraRollUri: null});
  };

  showEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  }

  renderRevoked = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
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
      <View style={styles.camera}>
        <Image
          style={{width: '100%', height: '100%', position: 'absolute'}}
          source={{uri: photo.uri}}/>
        <View style={styles.emojiPicker}>
          <SnapEmoji isVisible={this.state.showEmojiPicker}>
          </SnapEmoji>
        </View>
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
      </View>
    );
  };

  renderCamera = () => {
    return (
      <View style={styles.camera}>
        <Camera
          style={styles.camera}
          type={this.state.type}
          ref={ref => { this.camera = ref; }}>
          <View style={styles.emojiPicker}>
            <SnapEmoji isVisible={this.state.showEmojiPicker}>
            </SnapEmoji>
          </View>
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
        </Camera>
      </View>
    );
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { photo } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return this.renderRevoked();
    } else if (photo !== null) {
      return this.renderPic(photo);
    } else {
      return this.renderCamera();
    }
  }
}
