import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout'
// import {getUserId, getTokenPayload} from '../../server/utils'
import * as SecureStore from 'expo-secure-store';
import Favorites from "./Favorites";

export default function UserScreen() {

  const authToken = async () =>{
    let result = await SecureStore.getItemAsync("key")
    if (result){
    console.log(result) 
    return result}
    else return false
  }
  authToken()


  return (
    <View style={styles.container}>

      {authToken ? <Profile /> : <Login />}
      <Logout />
      <Favorites />
      {/* <Login /> */}
      {/* <Text style={styles.txt}>User Page (switch contents on logged in status)</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "#eeff00",
  },
});
