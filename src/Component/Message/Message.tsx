import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../../Entryroute';
import {userService} from '../../Services/Authservice/userService';
import {logout, SaveAllUserData} from '../features/User/UserSlice';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import LogoutModal from './LogoutModale';
export default function Message() {
  const token = useSelector((state: any) => state.User.token);

  const [usersData, setUsersData] = useState([]);
  const [username, setUsername] = useState<string>('');
  const [serachData, setSerachData] = useState<[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  // const token = useSelector((state: any) => state.User.token);
  // console.log('token in message', token);

  // const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ1c2VybmFtZSI6Ik1hbmlzaCBrZWVyIiwic3ViIjoiTWFuaXNoIGtlZXIiLCJpYXQiOjE3Mzc2OTI2NDQsImV4cCI6MTczNzc3OTA0NH0.HyxL_iGQczxmK2RQJzcAg9Cw-4QTn_Y3qFWcknBn74k9hZtec8eTOrSjrBcbtTrO';
  const serchUserInMessage = async () => {
    try {
    } catch (e) {
      console.log('coudl not ');
    }
  };

  const fetchAllUserData = async () => {
    try {
      if (!token) {
        ToastAndroid.show('Token not Found ', ToastAndroid.SHORT);
        return;
      }

      console.log('token in message', token);
      const res = await userService.getUsersData(token);
      if (res.success) {
        setUsersData(res.data);
        // dispatch(res.data);
        // dispatch(SaveAllUserData(res.data));
      }
    } catch (error) {
      console.log('could not get the all user data', error);
    }
  };

  useEffect(() => {
    // if (!allUsers) {
    //   fetchAllUserData();
    // } else {
    //   setUsersData(allUsers);
    // }
    fetchAllUserData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    ToastAndroid.show('logout SuccessFully', ToastAndroid.SHORT);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1A1A1A', '#141414']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
          <MaterialCommunityIcons name="logout" color="#8B5CF6" size={30} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FeatherIcons name="search" color="#6B6B6B" size={20} />
        <TextInput
          placeholder="Search messages..."
          placeholderTextColor="#6B6B6B"
          style={styles.searchInput}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Messages Section */}
      <ScrollView style={styles.messagesContainer}>
        <Text>Search Results</Text>
        {serachData.length > 0 && (
          <Text style={styles.sectionHeader}>Search Results</Text>
        )}
        {serachData.map((user: any, i) => (
          <TouchableOpacity style={styles.messageItem} key={i}>
            <View style={{position: 'relative'}}>
              <Image source={{uri: user.profilePic}} style={styles.userImage} />
              <View style={styles.onlineStatus} />
            </View>
            <View style={styles.messageDetails}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.messageText}>Active 2h ago</Text>
            </View>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>3</Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Messages List */}
        <Text style={styles.sectionHeader}>Recent Chats</Text>
        {usersData.map((user: any, i) => (
          <TouchableOpacity
            style={styles.messageItem}
            key={i}
            onPress={() => navigation.navigate('UserChat', {user: user})}>
            <View style={{position: 'relative'}}>
              <Image source={{uri: user.profilePic}} style={styles.userImage} />
              <View style={styles.onlineStatus} />
            </View>
            <View style={styles.messageDetails}>
              <Text style={styles.username}>{user.userName}</Text>
              <Text style={styles.messageText}>You: See you tomorrow!</Text>
            </View>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>2</Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Requests Section */}
        <Text style={styles.sectionHeader}>Pending Requests</Text>
        {[...Array(5)].map((_, i) => (
          <View
            style={[styles.messageItem, {backgroundColor: '#1E1E1E'}]}
            key={`request-${i}`}>
            <Image
              source={require('../../../assets/manish.jpg')}
              style={styles.userImage}
            />
            <View style={styles.messageDetails}>
              <Text style={styles.username}>New Connection</Text>
              <Text style={styles.messageText}>
                manish keer Wants to message you
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={[styles.cameraIcon, {backgroundColor: '#8B5CF6'}]}>
                <AntDesignIcons name="check" color="#FFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraIcon}>
                <AntDesignIcons name="close" color="#8A8A8A" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <LogoutModal
          visible={showLogoutModal}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout();
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#141414',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2D2D2D',
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    color: '#8A8A8A',
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#404040',
  },
  messageDetails: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    color: '#8A8A8A',
    fontSize: 14,
    fontWeight: '500',
  },
  cameraIcon: {
    backgroundColor: '#252525',
    padding: 8,
    borderRadius: 12,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00FF00',
    borderWidth: 2,
    borderColor: '#161616',
  },
  unreadBadge: {
    backgroundColor: '#8B5CF6',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
