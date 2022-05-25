import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput} from "react-native";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';




const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email:String!
        $password:String!
        $username:String!
    ) {
        signup(
            email: $email,
            password: $password,
            username: $username,
        ) {
            token,
            user{
                username
            }
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email, 
            password: $password
        ){
            token,
            user{
                username
            }
        }
    }
`;

const Login = () => {

    const client = useApolloClient()
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        username: ''
    });

    async function login ({email, password} ){
        console.log('loggring in..')
        try {
            const res = await client.mutate({
            mutation:LOGIN_MUTATION,
            variables:{
                email, password
            }
        })
        console.log('logged in!')
        await SecureStore.setItemAsync("key", res.data.login.token);
        console.log(res.data.login.user.username)
        }catch (e){
            console.log(e)
        }
    }

    async function signup ({username, email, password} ){
        try {
            let res = await client.mutate({
            mutation:SIGNUP_MUTATION,
            variables:{
                username, email, password
                }
            })
        await SecureStore.setItemAsync("key", res.data.signup.token);
        console.log('signed up!')
        console.log(res.data.signup.user.username)

        res = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                email, password
            }
        })
        console.log('logged in ', res.data.login.user.username)
        }catch (e){
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {formState.login ? <Text style={styles.header}>Login</Text> : <Text style={styles.header}>Sign Up</Text>}
            </View>
                {!formState.login ? (
                  <>
                    <Text style={styles.title}>username</Text>
                    <TextInput
                      value={formState.username}
                      style={styles.input}
                      onChangeText={(username) =>
                        // console.log(e.nativeEvent.text, e.target.value) || 
                        setFormState({...formState,username}
                      )}
                      placeholder='Username' />
                  </>
                ) : null }
                <Text style={styles.title}>email</Text>
                <TextInput 
                    value = {formState.email}
                    style = {styles.input}
                    onChangeText= {(email)=> 
                        setFormState({
                            ...formState,
                            email
                        })
                    }
                    placeholder='email'
                />
                <Text style={styles.title}>password</Text>
                <TextInput
                    value={formState.password}
                    style = {styles.input}
                    onChangeText={(password)=>
                        setFormState({
                            ...formState,
                            password
                        })
                    }
                    placeholder='password'
                />
            <Pressable style={styles.button}
                onPress={
                    async ()=>
                        {
                            try {
                                await formState.login ? login : signup(
                                    {
                                        username: formState.username,
                                        email: formState.email,
                                        password: formState.password
                                    }
                                )

                            } catch (e) {
                                console.log('mutation error')
                                console.error(e)
                            } 
                }}>
                {formState.login ? <Text style={styles.buttontxt}>login</Text> : <Text style={styles.buttontxt}>create account</Text>}

            </Pressable>
            <Pressable style={styles.button} onPress={() =>
                    setFormState({
                        ...formState,
                        login: !formState.login
                    })
                }
            >
                    {formState.login
                        ? <Text style={styles.buttontxt}>need to create an account?</Text>
                        : <Text style={styles.buttontxt}>already have an account?</Text>}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#000",
    color: '#eeff00',
    margin: "0%",
    justifyContent: "space-evenly",
    padding:100,
    width: "100%",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    marginBottom: "0%",
    backgroundColor: "#222",
    color: '#eeff00',
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 28,
  },
  title:{
    width: "100%",
    marginVertical: "4%",
    fontSize: 18,
    color: '#eeff00',
    fontFamily: "Courier New",
    fontWeight: "bold",
  },
  input:{
    width: "100%",
    backgroundColor: "#000",
    color: "#eeff00",
    height: "8%",
    padding: "3%",
    borderWidth: 2, 
    borderColor: "#eeff00",
    fontFamily: "Courier New",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor:  "#eeff00",
    padding:3,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttontxt: {
    fontFamily: "Courier New",
    fontWeight: "bold",
  },
  });

export default Login;


// inactiveBackgroundColor: "#000",
// activeTintColor: '#egreyeff00',
