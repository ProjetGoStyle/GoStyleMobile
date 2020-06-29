import React, {Node, Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {View, Toast, Text, StyleSheet, PopupStub} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// ------------ NEW VIEW --------------
export default class QRcodeScanner extends Component {
  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => console.warn(barcode.data));
  };

  static render() {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        console.log('chargement');
        switch (result) {
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
          case RESULTS.BLOCKED:
            return <></>;
          case RESULTS.GRANTED:
            return (
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={{
                  width: '50%',
                }}
                onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
                <Text />
              </RNCamera>
            );
        }
      })
      .catch(error => {
        // …
      });
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
