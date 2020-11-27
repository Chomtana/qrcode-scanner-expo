import React from "react";
import { Dimensions, Clipboard, StyleSheet } from "react-native";
import { Container, Text, Button, Content } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Grid, Row } from "react-native-easy-grid";

class ResultScreen extends React.Component {
  static navigationOptions = {
    title: "Scan Detail"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      copied: false,

      participantName: ""
    };
  }

  copyToClipboard = content => {
    Clipboard.setString(content);
    this.setState({ copied: true });
  };

  render() {
    const { navigation } = this.props;
    const qr = navigation.getParam("qr", "NO-QR");
    const participantName = navigation.getParam("participantName", "...")
    let { height: screenHeight } = Dimensions.get("window");
    screenHeight = screenHeight - 400;

    return (
      <Container style={{ marginTop: 40 }}>
        <Content>
          <Grid>
            <Row style={styles.qrCard}>
              {/* <MaterialCommunityIcons name="qrcode" size={70} color="green" /> */}
              {/* <Text style={styles.qrTitle}>{qr}</Text> */}
              <Text>สวัสดี {participantName}</Text>
            </Row>
            <Row style={styles.copyButtonContainer}>
              <Button
                danger={!this.state.copied}
                success={this.state.copied}
                onPress={() => {
                  // this.copyToClipboard(qr);
                  this.props.navigation.navigate("Scanner")
                }}

                style={styles.copyButton}
              >
                <Text style={styles.copyButtonTitle}>Back</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  qrCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  qrTitle: { paddingTop: 10 },
  copyButtonContainer: {
    justifyContent: "center",
    marginTop: "85%"
  },
  copyButton: {
    height: 100,
    width: 300,
  },
  copyButtonTitle: { color: "white" }
});

export default ResultScreen;
