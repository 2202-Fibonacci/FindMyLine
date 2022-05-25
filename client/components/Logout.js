import * as React from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import Login from './Login';
import Profile from './Profile';
import * as SecureStore from 'expo-secure-store';

export default function Logout(){
    const removeToken = async () =>{
        try{
            console.log('logging out...')
            let result = await SecureStore.deleteItemAsync("key")
           console.log(result)
        }
        catch(e){
            console.log(e)
        }
      }

    return (
        <Pressable onPress={() => removeToken()}>
            <Text style={{color:"#eeff00"}}>Logout</Text>
        </Pressable> 
    )
}