import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const OTPScreen = () => {
  return (
    <View style={styles.container}>
      <Text>OTPScreen</Text>
    </View>
  );
}

OTPScreen.navigationOptions = {
  header: "OTPScreen",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default OTPScreen