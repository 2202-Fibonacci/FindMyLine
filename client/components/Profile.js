import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, Pressable, TextInput, SafeAreaView } from "react-native";

export default Profile = ({username}) => {

    return (
        <Text style={styles.container}>{username} Profile</Text>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      color: '#eeff00',
      margin: "0%",
    //   alignItems: "center",
      justifyContent: "flex-end",
      padding:100,
    },
  });

  // style={styles.updatesContainer}