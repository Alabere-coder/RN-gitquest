import React, { useRef, useEffect } from "react";
import { Animated, Easing, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TextAnimation = () => {
  const animatedValue1 = useRef(new Animated.Value(-width)).current;
  const animatedValue2 = useRef(new Animated.Value(width)).current;
  const animatedValue3 = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue1, {
        toValue: width,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(animatedValue2, {
        toValue: -width,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(animatedValue3, {
        toValue: width,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue1, animatedValue2, animatedValue3]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.text, { transform: [{ translateX: animatedValue1 }] }]}
      >
        GITQUEST GITQUEST GITQUEST
      </Animated.Text>
      <Animated.Text
        style={[styles.text2, { transform: [{ translateX: animatedValue2 }] }]}
      >
        GET INFO ON GITHUB ACCOUNT
      </Animated.Text>
      <Animated.Text
        style={[styles.text, { transform: [{ translateX: animatedValue3 }] }]}
      >
        GITQUEST GITQUEST GITQUEST
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    lineHeight: 35,
    fontWeight: "700",
    color: "#1d3557",
  },
  text2: {
    fontSize: 24,
    lineHeight: 35,
    fontWeight: "700",
    color: "#457b9d",
  },
});

export default TextAnimation;
