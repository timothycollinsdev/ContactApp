import React, {Component} from 'react';
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Form, Label, Item, Input, Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid';

export class AddContact extends Component {
  static navigationOptions = {
    title: 'Add Contact',
  };
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipCode: '',
  };
  saveContact = async () => {
    // await AsyncStorage.removeItem('@contacts');
    try {
      if (
        this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.email !== ''
      ) {
        //all good
        const newContact = {
          key: uuid.v4(),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          zipCode: this.state.zipCode,
        };
        console.log('new contact', newContact);

        const prevContact = await AsyncStorage.getItem('@contacts');
        console.log('prev cotact', prevContact);

        if (prevContact) {
          //contact already exisitss
          const jsonPrevContact = await JSON.parse(prevContact);
          jsonPrevContact.push(newContact);
          await AsyncStorage.setItem(
            '@contacts',
            JSON.stringify(jsonPrevContact),
          );

          this.props.navigation.goBack();
        } else {
          let arrayOFContact = [];
          arrayOFContact.push(newContact);
          console.log('array of cotact', arrayOFContact);

          await AsyncStorage.setItem(
            '@contacts',
            JSON.stringify(arrayOFContact),
          );
          this.props.navigation.goBack();
        }
      } else {
        Alert.alert('Al fields are required');
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{
            flex: 1,
          }}>
          <Form style={styles.form}>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={firstName => {
                  this.setState({firstName});
                }}
                placeholder="first name"
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={lastName => {
                  this.setState({lastName});
                }}
                placeholder="last name"
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={phoneNumber => {
                  this.setState({phoneNumber});
                }}
                placeholder="phone number"
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => {
                  this.setState({email});
                }}
                placeholder="email"
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={address => {
                  this.setState({address});
                }}
                placeholder="address"
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={zipCode => {
                  this.setState({zipCode});
                }}
                placeholder="zip code"
              />
            </Item>
          </Form>
        </TouchableWithoutFeedback>

        <Button
          full
          style={styles.button}
          color="primary"
          onPress={() => {
            this.saveContact();
          }}>
          <Text>Save Contact</Text>
        </Button>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 10,
    flex: 8,
  },
  item: {
    marginTop: 10,
  },
  button: {
    flex: 1,
  },
});
export default AddContact;
