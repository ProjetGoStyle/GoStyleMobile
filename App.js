import React, {Component, Node} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RNCamera} from 'react-native-camera';
import QRcodeScanner from './QRcodeScanner';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Database from './Database';

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

export default class App extends Component {
  constructor() {
    super();
  }
  state = {
    isScanner: false,
    isReduction: false,
    isPromotion: false,
  };
  listeItems: *[];
  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => {
      if (typeof barcode.data === 'string') {
        this.renderResults(1);
        // we create a new item for the list
        if (typeof this.listeItems === 'undefined') {
          this.listeItems = [];
        }
        this.listeItems[this.listeItems.length] += {
          name: 'name',
          link: barcode.data,
          reduction: '10%',
        };
      }
    });
  };

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          width: '100%',
        }}
        onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
        <Text />
      </RNCamera>
    );
  }
  renderListReduction() {
    return (
      <View>
        {this.listeItems.map((l, i) => (
          <ListItem key={i} title={l.name} subtitle={l.link} />
        ))}
      </View>
    );
  }
  renderListPromo() {
    return <View />;
  }

  renderResults = number => {
    switch (number) {
      case 1:
        this.setState({
          isScanner: !this.state.isScanner, //toggles the visibilty of the text
          isReduction: this.state.isScanner, //toggles the visibilty of the text
          isPromotion: this.state.isPromotion, //toggles the visibilty of the text
        });
        break;
      case 2:
        this.setState({
          isScanner: this.state.isScanner, //toggles the visibilty of the text
          isReduction: !this.state.isReduction, //toggles the visibilty of the text
          isPromotion: this.state.isPromotion, //toggles the visibilty of the text
        });
        break;
      case 3:
        this.setState({
          isScanner: this.state.isScanner, //toggles the visibilty of the text
          isReduction: this.state.isReduction, //toggles the visibilty of the text
          isPromotion: !this.state.isPromotion, //toggles the visibilty of the text
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <HautPage />

        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text>Bienvenue dans l'application GoStyle :</Text>
            <Text>Veuillez choisir une action...</Text>
          </View>
          {this.state.isScanner ? this.renderCamera() : null}
          <Separator />
          <View>
            <Button
              title="Scanner un QRcode"
              onPress={() => this.renderResults(1)}
            />
          </View>
          <Separator />
          <View>
            <Button
              title="Voir mes coupons"
              onPress={() => this.renderResults(2)}
            />
          </View>
          <Separator />
          <View>
            <Button
              title="Liste des promotions"
              onPress={() => this.renderResults(3)}
            />
          </View>
          <Separator />
          {this.state.isReduction ? this.renderListReduction() : null}
          {this.state.isPromotion ? this.renderListPromo() : null}
        </View>
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

AppRegistry.registerComponent('App', () => App);
