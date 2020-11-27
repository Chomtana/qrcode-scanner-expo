import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import HistoryScreen from "../Screens/HistoryScreen";
import ResultScreen from "../Screens/ResultScreen";
import ScannerScreen from "../Screens/ScannerScreen";

const RootStack = createStackNavigator(
  {
    Scanner: {
      screen: ScannerScreen
    },
    History: {
      screen: HistoryScreen
    },
    Result: {
      screen: ResultScreen
    }
  },
  {
    initialRouteName: "Scanner" //Default screen name
  }
);

export default createAppContainer(RootStack);
