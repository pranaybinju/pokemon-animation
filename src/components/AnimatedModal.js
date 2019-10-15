import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";

import Header from "./Header";
const { height, width } = Dimensions.get("window");

type Props = {};
export default class AnimatedModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.yTranslate = new Animated.Value(0); // declare animated value for controlling the vertical position of the modal
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible) {
      // animate the showing of the modal
      this.yTranslate.setValue(0); // reset the animated value
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start();
    } else {
      // animate the hiding of the modal
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  render() {
    const { title, image, children, onClose } = this.props;
    let bottomStyle = this.props.visible ? { bottom: 0 } : { bottom: -height };
    let negativeHeight = -height + 20;
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    });

    let translateStyle = { transform: [{ translateY: modalMoveY }] }; // translateY is the transform for moving objects vertically
    // next: render the component

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <Header title={title}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    position: "absolute",
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: "#fff"
  },
  modalContent: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 30
  },
  closeText: {
    fontSize: 17,
    color: "#fff"
  }
};
