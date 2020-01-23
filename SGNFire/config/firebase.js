import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import firebase from 'react-native-firebase';

class firebase extends Component {
    _signIn = async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                this.setState({ loggedIn: false });
            } else {
                this.setState({ loggedIn: false });
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null, loggedIn: false });
        } catch (error) {
            console.error(error);
        }
    };
}
export default firebase;