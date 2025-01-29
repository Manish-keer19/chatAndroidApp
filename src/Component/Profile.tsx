import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {setuser} from './features/User/UserSlice';
import {userService} from '../Services/Authservice/userService';
import {profileService} from '../Services/profileService';
import {SvgUri} from 'react-native-svg';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.User.userdata);
  const token = useSelector((state: any) => state.User.token);

  const [profileDetail, setProfileDetail] = useState(userData.profileDetail);
  const [bio, setBio] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedFile, setSelectedFile] = useState<{
    uri: string;
    type: string;
    fileName: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileEditing, setisProfileEditing] = useState(false);

  useEffect(() => {
    if (userData?.profileDetail) {
      setProfileDetail(userData.profileDetail);
      setBio(userData.profileDetail.bio || '');
      setPronoun(userData.profileDetail.pronoun || '');
      setGender(userData.profileDetail.gender || '');
      setProfession(userData.profileDetail.profession || '');
    }
  }, [userData]);

  const handleEditProfile = async () => {
    if (!bio || !pronoun || !gender || !profession || !selectedFile) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);

      return;
    }
    setisProfileEditing(true);

    if (!token) {
      ToastAndroid.show('Token not Found ', ToastAndroid.SHORT);
      return;
    }
    const data = {
      bio,
      pronoun,
      gender,
      profession,
    };

    const formData = new FormData();
    formData.append('userAdditionalDetail', JSON.stringify(data));
    if (selectedFile) {
      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.fileName || 'profile.jpg',
        type: selectedFile.type || 'image/jpeg',
      });
    }
    console.log('token is ', token);
    try {
      const res = await profileService.editProfile(formData, token);
      if (res.success) {
        setisProfileEditing(false);
        ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
        dispatch(setuser(res.data));
        setProfileDetail(res.data.profileDetail);
        setIsEditing(false);
      }
    } catch (error) {
      setisProfileEditing(false);
      console.log('Error in editing profile: ', error);
      ToastAndroid.show('Error in editing Profile', ToastAndroid.SHORT);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to upload images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleFileSelect = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        setSelectedFile({
          uri: file.uri || '',
          type: file.type || 'image/jpeg',
          fileName: file.fileName || 'defaultFileName.jpg',
        });
      }
    });
  };

  const imageUri =
    userData?.profilePic ||
    'https://res.cloudinary.com/manish19/image/upload/v1737981113/spring/Testing/qwk7uoyrqn0jext0b4ch.png';

  // Check if the image is an SVG based on the file extension
  const isSvg = imageUri.endsWith('.svg');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileCard}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleFileSelect} disabled={!isEditing}>
              {isSvg ? (
                <SvgUri uri={imageUri} width={100} height={100} />
              ) : (
                <Image
                  source={
                    selectedFile
                      ? {uri: selectedFile.uri}
                      : {uri: userData?.profilePic}
                  }
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userData?.userName}'s Profile
              </Text>
              <Text style={styles.profileSubtitle}>
                Manage your profile information
              </Text>
            </View>
          </View>

          {/* Profile Form */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              value={!isEditing ? profileDetail?.bio : bio}
              onChangeText={setBio}
              editable={isEditing}
              multiline
              placeholder="Tell us about yourself..."
            />

            <Text style={styles.label}>Pronouns</Text>
            <TextInput
              style={styles.input}
              value={!isEditing ? profileDetail?.pronoun : pronoun}
              onChangeText={setPronoun}
              editable={isEditing}
              placeholder="Select pronouns"
            />

            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={!isEditing ? profileDetail?.gender : gender}
              onChangeText={setGender}
              editable={isEditing}
              placeholder="Select gender"
            />

            <Text style={styles.label}>Profession</Text>
            <TextInput
              style={styles.input}
              value={!isEditing ? profileDetail?.profession : profession}
              onChangeText={setProfession}
              editable={isEditing}
              placeholder="What do you do?"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setIsEditing(true);

                  setBio('');
                  setPronoun('');
                  setGender('');
                  setProfession('');
                }}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    setBio(profileDetail?.bio || '');
                    setPronoun(profileDetail?.pronoun || '');
                    setGender(profileDetail?.gender || '');
                    setProfession(profileDetail?.profession || '');
                  }}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isProfileEditing}
                  style={styles.saveButton}
                  onPress={handleEditProfile}>
                  <Text style={styles.buttonText}>
                    {isProfileEditing ? 'Editing Profile' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
    paddingTop: 70,
  },
  profileContainer: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  profileCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#8a5cf6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8a5cf6',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8a5cf6',
  },
  profileSubtitle: {
    fontSize: 13,
    color: '#a0a0a0',
  },
  formContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    color: '#8a5cf6',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },

  editButton: {
    backgroundColor: '#8a5cf6',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute buttons evenly
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '48%', // Set a fixed width (less than 50% to account for spacing)
  },
  saveButton: {
    backgroundColor: '#8a5cf6',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '48%', // Set a fixed width (less than 50% to account for spacing)
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
