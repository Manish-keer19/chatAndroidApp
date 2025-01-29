import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Image,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Entryroute';
import {authService} from '../Services/Authservice/authService';
import {setToken, setuser} from './features/User/UserSlice';
import {useDispatch} from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setusername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    username: false,
    password: false,
  });

  const handleLogin = async () => {
    if (!username || !password) {
      ToastAndroid.show('Pleasse Fill All Field', ToastAndroid.SHORT);
      return;
    }

    try {
      ToastAndroid.show('Please wait', ToastAndroid.SHORT);
      setIsLoading(true);

      // Determine if the input is an username or username
      const isusername = username.includes('@');
      const data = isusername
        ? {username: username.trim(), password}
        : {userName: username.trim(), password};

      const res = await authService.login(data);

      if (res.success) {
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
        console.log('Response:', res);
        setIsLoading(false);
        dispatch(setToken(res.data.token));
        dispatch(setuser(res.data.userData));
        // navigation.navigate('Home');
        navigation.navigate('BottomNav');
      } else {
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
      console.log('Error during login:', error);
    }
  };

  const handleFocus = (field: string) => {
    setInputFocus(prev => ({...prev, [field]: true}));
  };

  const handleBlur = (field: string) => {
    setInputFocus(prev => ({...prev, [field]: false}));
  };

  const handleDemoLogin = async () => {
    if (username || password) {
      ToastAndroid.show('Please clear the field', ToastAndroid.SHORT);
      return;
    }
    setIsDemoLoading(true);
    const data = {userName: 'Dummy Account', password: 'ms19'};
    console.log('Data in login is ', data);
    try {
      console.log('Data in login is ', data);
      const res = await authService.login(data);
      if (res.success) {
        setIsDemoLoading(false);
        console.log('Login successful: ', res);
        dispatch(setToken(res.data.token));
        dispatch(setuser(res.data.userData));
        navigation.navigate('BottomNav');
      }
    } catch (error) {
      setIsDemoLoading(false);
      console.log('Error in login: ', error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* username Input */}
        <TextInput
          style={[styles.input, inputFocus.username && styles.inputFocused]}
          placeholder="username"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={username}
          onChangeText={setusername}
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
        />

        {/* Password Input */}
        <TextInput
          style={[styles.input, inputFocus.password && styles.inputFocused]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
        />

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryLoginButton}
          onPress={handleLogin}
          disabled={isLoading}>
          <Text style={styles.primaryButtonText}>
            {isLoading ? 'Logging In...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoLoginButton}
          onPress={handleDemoLogin}
          disabled={isDemoLoading}>
          <Image
            style={styles.avatarImage}
            source={require('../../assets/avatar.png')}
          />
          <Text style={styles.buttonText}>
            {isDemoLoading ? 'Demo Login...' : 'Demo Login'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text style={styles.signUpHighlight}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#252525',
    color: '#FFF',
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252525',
  },
  inputFocused: {
    borderColor: '#8A4F96',
  },

  // Style for Demo Login Button
  demoLoginButton: {
    marginTop: 20,
    backgroundColor: '#6C63FF', // Unique gradient or soft color
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, // Consistent gap
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  // Style for the Primary Login Button
  primaryLoginButton: {
    backgroundColor: '#FF6F61', // Warm contrasting color
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF6F61',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  // Shared Button Text Style
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Text for Primary Login Button (Slightly Larger)
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.2,
  },

  // Avatar Image Style
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    marginRight: 10,
  },

  // Text Links Style (Forgot Password/Signup)
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#6C63FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signUpLink: {
    alignSelf: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#888',
    fontSize: 14,
  },
  signUpHighlight: {
    color: '#FF6F61',
    fontWeight: '700',
  },
});

export default Login;
