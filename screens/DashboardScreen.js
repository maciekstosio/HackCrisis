import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      </ScrollView>
    </View>
  );
}

DashboardScreen.navigationOptions = {
  header: "Dashboard",
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
