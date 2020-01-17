/**
 * @format
 */
'use strict';

var React = require('react-native');
var Accueil = require('./accueil');
var QRcodeScanner = require('./QRcodeScanner');
var {
  AppRegistry,
  Button,
  Component,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} = React;

class devdactic_tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'accueil',
    };
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
              <Accueil/>
              <Button
                title="Scanner un QRcode"
                onPress={() => {
                  this.setState({
                    selectedTab: 'qrcodescanner',
                  });
                }}
              />
              <QRcodeScanner/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

AppRegistry.registerComponent('devdactic_tabs', () => devdactic_tabs);
