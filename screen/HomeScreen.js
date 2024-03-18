import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import TextAnimation from "../components/TextRotator";

const Home = () => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    setFailed(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getUser = async () => {
    if (!value.trim()) {
      Alert.alert(
        "Error",
        "Please enter a GitHub username. Field cannot be empty"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${value}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const json = await response.json();

      setData(json);
      setLoading(false);
      setFailed(false);
    } catch (error) {
      setLoading(false);
      setFailed(true);
    }
  };

  const handleChange = (text) => {
    setValue(text.trim());
  };

  const closeModal = () => {
    setData(null);
  };
  const toggleModal = (data) => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.wrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TextAnimation />
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            placeholder="Enter UserName"
            blurOnSubmit={true}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={getUser}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <ActivityIndicator
            size={50}
            color="#0000ff"
            style={{ marginTop: 50 }}
          />
        )}
        {failed ? (
          <Text style={styles.errorMessage}>
            No user found with such username, Please enter a valid username
          </Text>
        ) : (
          !loading &&
          data &&
          data.name &&
          data.location && (
            <View style={styles.user}>
              <View style={styles.users}>
                <Image source={{ uri: data.avatar_url }} style={styles.image} />
                <Text style={styles.userName}>{data.login}</Text>
              </View>
              <View style={styles.homeInfo}>
                <View style={styles.labelContainer}>
                  <Text style={styles.userInfo}>Name</Text>
                  <Text style={styles.modalName}>{data.name}</Text>
                </View>
                <View style={styles.labelContainer}>
                  <Text style={styles.userInfo}>Bio</Text>
                  <View style={{ width: 220 }}>
                    <Text style={styles.modalLocation}>{data.bio}</Text>
                  </View>
                </View>
                <View style={styles.labelContainer}>
                  <Text style={styles.userInfo}>Company</Text>
                  <Text style={styles.modalEmail}>{data.company}</Text>
                </View>

                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.link}>see more..</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {data && (
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleModal} style={styles.closeBtn}>
                <FeatherIcon color="#4169e1" name="x" size={35} />
              </TouchableOpacity>
              <View style={styles.user}>
                <Image source={{ uri: data.avatar_url }} style={styles.image} />
                <Text style={styles.userName}>{data.name}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>UserName</Text>
                <Text style={styles.modalName}>{data.login}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Bio</Text>
                <View style={{ width: 220 }}>
                  <Text style={styles.modalLocation}>{data.bio}</Text>
                </View>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Company</Text>
                <Text style={styles.modalEmail}>{data.company}</Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Twitter</Text>
                <Text style={styles.modalEmail}>{data.twitter_username}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Public</Text>
                <Text style={styles.modalEmail}>{data.public_repos}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Blog</Text>
                <Text style={styles.modalEmail}>{data.blog}</Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>followers</Text>
                <Text style={styles.modalEmail}>{data.followers}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>following</Text>
                <Text style={styles.modalEmail}>{data.following}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>CreatedAt</Text>
                <Text style={styles.modalEmail}>{data.created_at}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.userInfo}>Location</Text>
                <Text style={styles.modalEmail}>{data.location}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  main: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    borderColor: "lightgrey",
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#edf2f4",
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#87cefa",
  },
  errorMessage: {
    color: "#ffd500",
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },

  user: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  homeInfo: {
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },

  infoText: {
    fontSize: 16,
  },
  infoTextDark: {
    fontSize: 16,
    color: "white",
  },
  link: {
    color: "blue",
    marginTop: 20,
    fontSize: 18,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 4,
  },

  modalContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    gap: 20,
    height: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    fontSize: 14,
    color: "#8d99ae",
  },
  user: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
  },

  modalName: {
    fontSize: 14,
    fontWeight: "400",
  },
  modalEmail: {
    fontSize: 14,
    fontWeight: "400",
  },
  modalLocation: {
    fontSize: 14,
    fontWeight: "400",
  },
  closeButton: {
    backgroundColor: "#bde0fe",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalImg: {
    height: 100,
    width: 100,
    borderRadius: 250,
  },
  userName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
