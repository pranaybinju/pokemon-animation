import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";

type Props = {};
export default class AnimatedBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.width = new Animated.Value(0);
  }
  componentDidMount() {
    this.animateBar();
  }

  componentDidUpdate() {
    this.animateBar();
  }
  animateBar = () => {
    const { value, index } = this.props;
    this.width.setValue(0); // initialize the animated value
    Animated.timing(this.width, {
      toValue: value,
      delay: index * 150 // how long to wait before actually starting the animation
    }).start();
  };

  render() {
    let barWidth = {
      width: this.width
    };
    return <Animated.View style={[styles.bar, barWidth]} />;
  }
}

const styles = {
  bar: {
    height: 15,
    borderWidth: 1,
    borderColor: "#c72f06",
    backgroundColor: "#e75832"
  }
};
