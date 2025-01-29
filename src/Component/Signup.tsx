import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Entryroute';

import {authService} from '../Services/Authservice/authService';
import {launchImageLibrary} from 'react-native-image-picker';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [inputFocus, setInputFocus] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = async () => {
    if (!userName || !email || !password || !confirmPassword) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    const data = {
      userName,
      email,
      password,
    };

    const formData = new FormData();
    formData.append('User', JSON.stringify(data));
    if (selectedFile) {
      const fileData = {
        uri: selectedFile.uri,
        name: selectedFile.fileName || 'UserPic.jpg',
        type: selectedFile.type || 'image/jpeg',
      };
      // console.log('Selected file: ', selectedFile);
      formData.append('file', fileData);
    }
    try {
      const res = await authService.signUp(formData);
      console.log('res is ', res);
      if (res.success) {
        ToastAndroid.show('Account created successfully', ToastAndroid.SHORT);
        navigation.navigate('Login');
        setIsLoading(false);
      }
      else{
        console.log("Error in signup: ", res);
        setIsLoading(false);
        ToastAndroid.show('Sign-up failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Sign-up failed', ToastAndroid.SHORT);
      setIsLoading(false);
      console.log('Error in signup: ', error);
    }
  };

  const handleFocus = (field: string) => {
    setInputFocus(prev => ({...prev, [field]: true}));
  };

  const handleBlur = (field: string) => {
    setInputFocus(prev => ({...prev, [field]: false}));
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1, // Adjust the quality as needed (0.0 to 1.0)
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        console.log('Selected Image URI: ', selectedAsset.uri);
        // Update your state or perform further actions
        if (selectedAsset.uri) {
          setImageUri(selectedAsset.uri); // Example: Save the image URI in state
        }
        setSelectedFile(selectedAsset); // Save the selected file
      } else {
        console.log('No assets found in result');
      }
    } catch (error) {
      console.log('Error selecting image: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <TouchableOpacity style={styles.profileContainer} onPress={selectImage}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>+</Text>
          </View>
        )}
        <View style={styles.cameraBadge}>
          <Text style={styles.cameraIcon}>📷</Text>
        </View>
      </TouchableOpacity>

      {/* Input Fields */}
      <TextInput
        style={[styles.input, inputFocus.userName && styles.inputFocused]}
        placeholder="Username"
        placeholderTextColor="#888"
        value={userName}
        onChangeText={setUserName}
        onFocus={() => handleFocus('userName')}
        onBlur={() => handleBlur('userName')}
      />

      <TextInput
        style={[styles.input, inputFocus.email && styles.inputFocused]}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => handleFocus('email')}
        onBlur={() => handleBlur('email')}
      />

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

      <TextInput
        style={[
          styles.input,
          inputFocus.confirmPassword && styles.inputFocused,
        ]}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => handleFocus('confirmPassword')}
        onBlur={() => handleBlur('confirmPassword')}
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSubmit}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginHighlight}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  profileContainer: {
    alignSelf: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePlaceholderText: {
    color: '#888',
    fontSize: 36,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8A4F96',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 18,
    color: '#FFF',
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
  signUpButton: {
    backgroundColor: '#8A4F96',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#8A4F96',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#888',
    fontSize: 14,
  },
  loginHighlight: {
    color: '#8A4F96',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
    padding: 16,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignUp;
