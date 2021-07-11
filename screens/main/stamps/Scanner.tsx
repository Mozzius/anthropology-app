import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, StyleSheet } from "react-native";
import firebase from "firebase/app";

import Screen from "../../../components/Screen";
import { StampStackParamList } from ".";
import { UserContext } from "../User";

export interface ScannerProps {
  navigation: StackNavigationProp<StampStackParamList, "Scanner">;
}

const Scanner: React.FC<ScannerProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <Screen>
        <Text>Requesting for camera permission</Text>
      </Screen>
    );
  }
  if (hasPermission === false) {
    return (
      <Screen>
        <Text>No access to camera</Text>
      </Screen>
    );
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={
        scanned
          ? undefined
          : ({ data }) => {
              setScanned(true);
              firebase
                .database()
                .ref(`/users/${user.uid}/stamps/${data}`)
                .set({ attended: true })
                .then(() => {
                  setScanned(false);
                  navigation.navigate("Stampbook");
                })
                .catch(err => {
                  setScanned(false);
                  console.log(err);
                });
            }
      }
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default Scanner;
