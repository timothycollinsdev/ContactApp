import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon, List, Item} from 'native-base';
import ViewContact from './ViewContact';
import AsyncStorage from '@react-native-community/async-storage';
export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home Screen',
  };
  state = {
    data: null,
  };
  componentDidMount() {
    this.getAllContact();
  }
  getAllContact = async () => {
    const data = await AsyncStorage.getItem('@contacts');
    this.setState({data: JSON.parse(data)});
    console.log(this.state);
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => {
            console.log(item);
            return (
              <Item
                onPress={() => {
                  this.props.navigation.navigate('ViewContact', {
                    item,
                  });
                }}
                style={{
                  padding: 15,
                }}>
                <Text>{item.firstName}</Text>
              </Item>
            );
          }}
          keyExtractor={(item, index) => item.key}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('AddContact')}>
          <Icon name="md-person-add" style={{color: '#fff'}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#BB2CD9',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
