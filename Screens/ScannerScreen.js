import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Container, Text, View } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { withNavigationFocus } from "react-navigation";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from "@expo/vector-icons";
import SQL from "../components/SQL";
import { SpinnerScreen } from "../components/commons";
import axios from "axios"

class ScannerScreen extends React.Component {
  decoding = false;

  static navigationOptions = {
    header: null //hide the header bar
  };

  state = {
    hasCameraPermission: null,
    decoding: false,
  };

  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  saveToDB = qr => {
    SQL.AddQR(qr);
  };

  processPost = async (url) => {
    try {
      let response = await axios.post(url);
      let data = response.data;

      return data.fullName;
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status == 404) {
          return "!! ไม่พบข้อมูล !!"
        } else if (err.response.status == 400) {
          if (["used"].indexOf(err.response.data.status) != -1) {
            return "!! QR Code นี้ถูกใช้ไปแล้ว !!"
          }
        }
      }

      return "!! เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ !!"
    }
  }

  qrCallback = async (res) => {
    if (res && !this.decoding) {
      this.decoding = true;
      this.setState({
        decoding: true
      })
  
      try {
        // alert(res);
        return await this.processPost(res);
      } finally {
        this.decoding = false;
        this.setState({
          decoding: false
        })
      }
    }
  }

  handleBarCodeScanned = async ({ type, data }) => {
    if (this.decoding) return

    this.saveToDB(data);

    let result = await this.qrCallback(data);

    //change screen to Result and pass scanned qr
    this.props.navigation.navigate("Result", {
      qr: data,
      participantName: result
    });
  };

  render() {
    const buttonColor = "green";

    return this.state.hasCameraPermission === null ? (
      <SpinnerScreen />
    ) : this.state.hasCameraPermission === false ? (
      <Message>
        <Text>No access to camera</Text>
      </Message>
    ) : !this.state.scanned && this.props.isFocused ? (
      <Container>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.barcodeScanner}
        >
          <Grid>
            <Row style={styles.layerTop} size={1} />
            <Row style={styles.layerCenter} size={2}>
              {/* <View style={styles.layerCenter}> */}
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
              {/* </View> */}
            </Row>
            <Row style={styles.layerBottom} size={1}>
              {/* <FontAwesome
                size={25}
                name="history"
                color={buttonColor}
                onPress={() => {
                  this.props.navigation.navigate("History");
                }}
                style={styles.bottomButtons}
              /> */}
            </Row>
          </Grid>
        </BarCodeScanner>
      </Container>
    ) : (
      <SpinnerScreen />
    );
  }
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  barcodeScanner: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end"
  },
  layerTop: { backgroundColor: opacity },
  layerCenter: {
    flex: 1.4,
    flexDirection: "row"
  },
  layerLeft: {
    flex: 6,
    backgroundColor: opacity
  },
  focused: {
    flex: 30
  },
  layerRight: {
    flex: 6,
    backgroundColor: opacity
  },
  layerBottom: {
    alignItems: "flex-end",

    backgroundColor: opacity,
    justifyContent: "center"
  },
  bottomButtons: {
    marginBottom: 40
  }
});

export default withNavigationFocus(ScannerScreen);
