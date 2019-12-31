import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddContact from './src/screens/AddContact';
import EditContact from './src/screens/EditContact';
import ViewContact from './src/screens/ViewContact';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    AddContact: {
      screen: AddContact,
    },
    EditContact: {
      screen: EditContact,
    },
    ViewContact: {
      screen: ViewContact,
    },
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FAC42F',
      },
      headerTintColor: '#EAF0F1',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
