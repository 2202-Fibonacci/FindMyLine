    // const [login] = useMutation(LOGIN_MUTATION, {
    //     variables: {
    //         email: formState.email,
    //         password: formState.password
    //     },
    //     onCompleted:  async ({ login }) => {
    //         console.log('logged in!')
    //         try {
    //             await SecureStore.setItemAsync("key", login.token);
    //         //TODO:navigate to profile? back to map?
    //         //<Profile />
    //         console.log('logged in')
    //     } catch (err){
    //         console.log(err.graphQLErrors)
    //     }
    //     }
    // });


        // const [signup, {data, loading, error}] = useMutation(SIGNUP_MUTATION, {
    //     variable: {},
    //     onError: (err) => {
    //         console.log(err.networkError.result)
    //     },
    //     onCompleted: async ({ signup }) => {
    //         try {
    //         await SecureStore.setItemAsync(AUTH_TOKEN, signup.token);
    //         //TODO: navigate to profile? back to map?
    //          //<Profile />
    //         console.log('signed up!')
    //         } catch(err){
    //         console.log(err)
    //         }
    //     }
    // })
    // console.log('error ', error)
    // console.log('loading ', loading)
    // console.log('data ', data)

    