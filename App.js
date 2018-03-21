import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import RouterComponent from './src/Router';
import {Font, Asset, AppLoading} from 'expo';

export default class App extends Component {
    state = {
        isReady: false,
        fontLoaded: false
    }


    async componentDidMount() {
        await Font.loadAsync({
            'Arial': require('./assets/fonts/Arial.ttf'),
            'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
        });
        this.setState({fontLoaded: true});
    }

    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBmxJ5tstpQBvnlncMvz_2bkBeGZNmBXz4",
            authDomain: "hala-chat.firebaseapp.com",
            databaseURL: "https://hala-chat.firebaseio.com",
            projectId: "hala-chat",
            storageBucket: "",
            messagingSenderId: "558242023231"
        };
        try {
            firebase.initializeApp(config);
        }
        catch (error) {
            console.log("aaaa=" + error);
        }

        //firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        if (!this.state.fontLoaded) return null;
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        return (
            <Provider store={store}>
                <RouterComponent/>
            </Provider>
        );
    }

    async _cacheResourcesAsync() {
        const images = [
            require('./assets/back3.png'),
            require('./assets/icon.png'),
            require('./assets/iconn.png'),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)

    }
}


