/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Node} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  Alert,
  Component,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinkList from 'react-native/Libraries/NewAppScreen/components/LearnMoreLinks';

// ------------ NEW VIEW --------------

class devdactic_tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
          <ScrollView>
            <View>
              <Button
                title="Scanner un QRcode"
                onPress={() => {
                  this.setState({
                    selectedTab: 'accueil',
                  });
                }}
              />
              <Button
                title="Scanner un QRcode"
                onPress={() => {
                  this.setState({
                    selectedTab: 'qrcodescanner',
                  });
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.dark,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 16,
  },
});

AppRegistry.registerComponent('devdactic_tabs', () => devdactic_tabs);
