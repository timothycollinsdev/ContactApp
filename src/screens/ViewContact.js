import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Card, CardItem, Icon} from 'native-base';
export class ViewContact extends Component {
  static navigationOptions = {
    title: 'View Contacts',
  };
  state = {
    firstName: 'Dummy',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipCode: '',
  };
  componentDidMount() {
    const contact = this.props.navigation.getParam('item');
    console.log(contact);
    this.setState(prevState => ({
      ...prevState,
      ...contact,
    }));
  }
  callAction = async phone => {
    if (!phone) {
      return Alert.alert('Phone number not defined !');
    }
    let phoneNumber = phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telpromt:${phone}`;
    }

    const isOpen = Linking.canOpenURL(phoneNumber);
    if (isOpen) {
      return Linking.openURL(phoneNumber);
    } else {
      return Alert.alert('Unable to open url');
    }
  };

  sendMessage = async (number, body) => {
    if (!number) {
      return Alert.alert('Number not defined !');
    }
    const url = Platform.OS === 'android' ? `sms:${number}` : `sms:${number}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      return Linking.openURL(url);
    } else {
      return Alert.alert('Unable to open url ! ');
    }
  };
  sendMAil = async emailAddress => {
    const url = `mailto:${emailAddress}`;
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      return Linking.openURL(url);
    } else {
      Alert.alert('Email id not supported !');
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <Card>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.firstName}</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.lastName}</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.phoneNumber}</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.email}</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.address}</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <Text>{this.state.zipCode}</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
        <TouchableOpacity
          style={styles.messagefab}
          onPress={() => this.sendMessage(this.state.phoneNumber)}>
          <Icon
            name="md-text"
            style={{
              color: '#fff',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emailFab}
          onPress={() => this.sendMAil(this.state.emailAddress)}>
          <Icon
            name="md-mail"
            style={{
              color: '#fff',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this.callAction(this.state.phoneNumber)}>
          <Icon
            name="call"
            style={{
              color: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  messagefab: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#BB2CD9',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailFab: {
    position: 'absolute',
    bottom: 10,
    left: '45%',
    backgroundColor: '#BB2CD9',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#BB2CD9',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ViewContact;
