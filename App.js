import React, {Component, Node} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RNCamera} from 'react-native-camera';
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
// we get the database
const db = new Database();
var keyExtractor = (item, index) => index.toString();
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
    this.state = {
      isScanner: false,
      isReduction: false,
      isLoading: true,
      reductions: [],
    };
    db.listReduction().then(data => {
      this.setState({
        isScanner: this.state.isScanner, //toggles the visibilty of the camera
        isReduction: this.state.isReduction, //toggles the visibilty of the text
        isLoading: false,
        reductions: data,
      });
    });
  }
  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => {
      if (!barcode.data.includes('{')) {
        this.renderResults(1);
        // we create a new item for the list
        db.reductionById(barcode.data).then(r => {
          console.log('HOLD ' + r);
          if (r !== null) {
            console.log('HOLD UP');
          } else {
            // we add the barcode in the database
            const reduction2add = {
              id: barcode.data,
              promotionId: 0,
              dateUtilisation: new Date().toISOString(),
            };
            db.addReduction(reduction2add).then(result => {
              this.setState({
                isScanner: this.state.isScanner, //toggles the visibilty of the text
                isReduction: this.state.isReduction, //toggles the visibilty of the text
                isLoading: false,
                reductions: this.state.reductions,
              });
              db.listReduction().then(data => {
                this.setState({
                  isScanner: this.state.isScanner, //toggles the visibilty of the text
                  isReduction: this.state.isReduction, //toggles the visibilty of the text
                  isLoading: true,
                  reductions: data,
                });
              });
            });
          }
        });
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
  renderReduction(reduc) {
    return (
      <ListItem
        title={reduc.item.id}
        subtitle={reduc.item.promotionId}
        leftAvatar={{
          source: reduc.item.prodImage && {uri: reduc.item.prodImage},
          title: reduc.item.dateUtilisation,
        }}
        rightElement={
          <Button
            title={'X'}
            style={styles.buttonDel}
            source={require('./img/add.png')}
            onPress={() => {
              db.deleteReduction(reduc.item.id);
              db.listReduction().then(data => {
                this.setState({
                  isScanner: this.state.isScanner, //toggles the visibilty of the text
                  isReduction: this.state.isReduction, //toggles the visibilty of the text
                  isLoading: true,
                  reductions: data,
                });
              });
            }}
          />
        }
        bottomDivider
      />
    );
  }

  renderListReduction() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (this.state.reductions.length === 0) {
      return (
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.scrollview}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.reductions}
          renderItem={this.renderReduction}
        />
      </ScrollView>
    );
  }

  renderResults = number => {
    switch (number) {
      case 1:
        this.setState({
          isScanner: !this.state.isScanner, //toggles the visibilty of the text
          isReduction: this.state.isReduction, //toggles the visibilty of the text
          isLoading: this.state.isLoading,
          reductions: this.state.reductions,
        });
        break;
      case 2:
        db.listReduction().then(data => {
          this.setState({
            isScanner: this.state.isScanner, //toggles the visibilty of the text
            isReduction: this.state.isReduction, //toggles the visibilty of the text
            isLoading: false,
            reductions: data,
          });
        });
        this.setState({
          isScanner: this.state.isScanner, //toggles the visibilty of the text
          isReduction: !this.state.isReduction, //toggles the visibilty of the text
          isLoading: this.state.isLoading,
          reductions: this.state.reductions,
        });
        break;
      case 3:
        this.setState({
          isScanner: this.state.isScanner, //toggles the visibilty of the text
          isReduction: this.state.isReduction, //toggles the visibilty of the text
          isLoading: this.state.isLoading,
          reductions: this.state.reductions,
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
          {this.state.isReduction ? this.renderListReduction() : null}
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
  buttonDel: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollview: {
    height: 400,
  },
});

AppRegistry.registerComponent('App', () => App);
