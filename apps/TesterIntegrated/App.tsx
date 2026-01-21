import { useStore } from '@callstack/brownie';
import { useEffect } from 'react';
import './BrownfieldStore.brownie';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';

import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ReactNativeBrownfield from '@callstack/react-native-brownfield';
import { NavigationContainer } from '@react-navigation/native';
import { HotUpdater } from '@hot-updater/react-native';

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  const [counter, setState] = useStore('BrownfieldStore', (s) => s.counter);
  const [user] = useStore('BrownfieldStore', (s) => s.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const isFirstRoute = !navigation.canGoBack();
      ReactNativeBrownfield.setNativeBackGestureAndButtonEnabled(isFirstRoute);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HotUpdater 2</Text>

      <Text style={styles.text}>Count: {counter}</Text>


      <Image source={require('./src/logo_favicon.png')} style={{ width: 100, height: 100 }} />

      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) =>
          setState((prev) => ({ user: { ...prev.user, name: text } }))
        }
        placeholder="User name"
      />

      <Button
        onPress={() => setState((prev) => ({ counter: prev.counter + 1 }))}
        title="Increment"
      />

      <Button
        onPress={() => {
          navigation.push('Home');
        }}
        title="Push next screen"
      />

      <Button
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            ReactNativeBrownfield.popToNative(true);
          }
        }}
        title="Go back"
      />

      <Button
        onPress={() => {
          HotUpdater.reload();
        }}
        title="Reload"
      />

      <Text style={styles.text}>Bundle ID: {HotUpdater.getBundleId()}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HotUpdater.wrap({
  baseURL: 'http://localhost:3006/hot-updater',
  updateStrategy: 'appVersion',
  updateMode: 'auto',
  onNotifyAppReady: (result) => {
    console.log('Hot-updater status:', result.status);
    if (result.crashedBundleId) {
      console.log('Crashed bundle ID:', result.crashedBundleId);
    }
  },
  fallbackComponent: ({ progress, status }) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
        {status === 'UPDATING' ? 'Updating...' : 'Checking for Update...'}
      </Text>
      {progress > 0 ? (
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null}
    </View>
  ),
  onError: (error) => {
    if (error instanceof Error) {
      Alert.alert('Update Error', error.message);
    }
  },
})(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    margin: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: 200,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
});
