import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../Screens/Home'
import Obrolan from '../Screens/Obrolan'
import LoginController from '../LoginController';
import AuthLoadingScreen from './AuthLoadingScreen';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({ Home: Home, Other: Obrolan });
const AuthStack = createStackNavigator({ SignIn: LoginController });

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);