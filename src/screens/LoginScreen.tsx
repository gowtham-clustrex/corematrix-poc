/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {loginApi} from '../api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../types/screenTypeStack';

type PropsType = NativeStackScreenProps<RootStackParamList>;

const LoginScreen: React.FC<PropsType> = props => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const [Loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          props.navigation.replace('Home');
        }
      } catch (err) {
        console.log('Error is ', err);
      } finally {
        setLoader(false);
      }
    })();
  }, [props.navigation]);

  const LoginApp = useCallback(async () => {
    if (!username && !password) {
      Alert.alert('Login Error', 'Please enter valid email and password');
      return;
    }
    try {
      setLoader(true);
      const LoginData = await loginApi({
        username: username,
        password: password,
      });
      const {result} = LoginData;
      await AsyncStorage.setItem('access_token', result.access_token);
      await AsyncStorage.setItem('refresh_token', result.refresh_token);
      props.navigation.replace('Home');
    } catch (err) {
      console.log(err);
      Alert.alert('Login Error', 'Please enter valid email and password');
    } finally {
      setLoader(false);
    }
  }, [password, props.navigation, username]);

  if (Loader) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'#000'} size={30} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={val => setUsername(val)}
        placeholder="Username"
        placeholderTextColor="#888"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={val => setPassword(val)}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.iconContainer}>
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={LoginApp}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: '#333',
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  button: {
    width: '90%',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default LoginScreen;
