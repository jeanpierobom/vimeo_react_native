/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const clientId = '616d3f72c92c1953e445c5d88784f529929e6b0a'
    const clientSecret = 'VZkiLM0nrO7GC6Obf947yccJqWt3OfaI4MZ9Ii3FyXNVFO1cn4x8QWpjEVB6/MmgN74JiQan7dJd3AKvKMqUjjlbEIDlSkHxQB7un/1Zh/UZXN5VNNEHWwSJG7sg94kf'
    const accessToken = 'adffbccd15b0faf190875f483f4f3a26'
    const channel = '/channels/staffpicks/videos';
    const fields = 'uri,name,link,description,duration,created_time,modified_time,pictures';

    var Vimeo = require('vimeo').Vimeo;
    const vimeoClient = new Vimeo(clientId, clientSecret, accessToken);

    vimeoClient.request({
      path: channel,
      query: {
        page: 1,
        per_page: 6,
        fields: fields
      }
    }, (error, body, status_code, headers) => {
      if (error) {
        console.log('error: ' + error);
      } else {
        console.log('body: ' + body);
        console.log('body.data: ' + body.data);
        const items = []
        body.data.forEach(item => {
            items.push(item)
        })
        this.setState({
            data: items
        })
      }
     
      console.log('status code: ' + status_code);
      console.log('headers: ' + headers);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            {this.state.data.map((item, i) => 
              <TouchableHighlight
                key={i}
                onPress={() => Linking.openURL(item.link) }>
                <View style={styles.vids}>
                <Image
                    source={{uri: item.pictures.sizes[5].link}}
                    style={{width: 320, height: 180}}/>
                <View style={styles.vidItems}>
                  <Image
                    source={require('./images/vimeo.png')}
                    style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}}/>
                  <Text style={styles.vidText}>{item.name}</Text>
                </View>
              </View>                
            </TouchableHighlight>    
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
  },
  vids: {
    paddingBottom: 30,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#aaa',
  },
  vidItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  vidText: {
    padding: 20,
    color: '#000',
  },
});

export default App;