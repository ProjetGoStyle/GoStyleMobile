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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinkList from 'react-native/Libraries/NewAppScreen/components/LearnMoreLinks';

const HautPage = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./img/rueVaporWave.jpeg')}
    style={stylesHautPage.background}
    imageStyle={stylesHautPage.logo}>
    <Text style={stylesHautPage.text}>GoStyle</Text>
  </ImageBackground>
);
const stylesHautPage = StyleSheet.create({
  background: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 32,
    backgroundColor: Colors.dark,
  },
  logo: {
    opacity: 0.9,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
});
function Separator() {
  return <View style={styles.separator} />;
}

// ------------ NEW VIEW --------------

const App: () => React$Node = () => {
  const barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => console.warn(barcode.data));
  };
  return (
    <>
      <HautPage />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text>Bienvenue dans l'application GoStyle :</Text>
          <Text>Veuillez choisir une action...</Text>
        </View>
        <Separator />
        <View>
          <Button title="Scanner un QRcode" onPress={this.drawScanner} />
        </View>
        <Separator />
        <View>
          <Button
            title="Voir mes coupons"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="Liste des promotions"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>
    </>
  );
};

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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
