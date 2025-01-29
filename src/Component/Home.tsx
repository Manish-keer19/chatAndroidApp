import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Entryroute';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SvgUri} from 'react-native-svg';

interface UserData {
  userName: string;
  profilePic: string;
  role: string[];
}

interface MenuItem {
  title: string;
  path: keyof RootStackParamList;
  icon: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Advanced Chat',
    path: 'Message',
    icon: 'message-text-outline',
    description: 'Feature-rich Chat Experience',
  },
  {
    title: 'Profile',
    path: 'Profile',
    icon: 'account',
    description: 'Edit your Profile',
  },
  {
    title: 'About',
    path: 'About',
    icon: 'information-outline',
    description: 'Developer Information',
  },
];

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userData: UserData = useSelector((state: any) => state.User.userdata);
  const [profile, setProfile] = useState<UserData | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleValue = useState(new Animated.Value(1))[0];

  useEffect(() => {
    setProfile(userData);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [userData]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const imageUri =
    profile?.profilePic ||
    'https://res.cloudinary.com/manish19/image/upload/v1737981113/spring/Testing/qwk7uoyrqn0jext0b4ch.png';

  // Check if the image is an SVG based on the file extension
  const isSvg = imageUri.endsWith('.svg');

  return (
    <LinearGradient colors={['#0F0F1E', '#1A1A2E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <Animated.View style={[styles.profileCard, {opacity: fadeAnim}]}>
          <View style={styles.profileImageContainer}>
            {isSvg ? (
              <SvgUri uri={imageUri} width={100} height={100} />
            ) : (
              <Image source={{uri: imageUri}} style={styles.profileImage} />
            )}
            <View style={styles.onlineStatus} />
          </View>

          <Text style={styles.welcomeText}>
            Welcome back,{'\n'}
            <Text style={styles.highlightText}>
              {profile?.userName || 'Guest'}
            </Text>
          </Text>

          <View style={styles.roleContainer}>
            {profile?.role.map((role, index) => (
              <LinearGradient
                key={index}
                colors={['#6366f1', '#8B5CF6']}
                style={styles.roleTag}>
                <Text style={styles.roleTagText}>{role}</Text>
              </LinearGradient>
            ))}
          </View>
        </Animated.View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={index}
              style={{transform: [{scale: scaleValue}]}}>
              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => navigation.navigate(item.path)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}>
                <LinearGradient
                  colors={['#2D2D42', '#1F1F2E']}
                  style={styles.menuGradient}>
                  <View style={styles.menuIcon}>
                    <Icon name={item.icon} size={32} color="#E879F9" />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: 'rgba(31, 31, 46, 0.7)',
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    shadowColor: '#8B5CF6',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    backdropFilter: 'blur(12px)',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#1F1F2E',
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
  },
  highlightText: {
    color: '#E879F9',
    fontWeight: '600',
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  roleTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roleTagText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  menuCard: {
    width: 160,
    height: 200,
    margin: 8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  menuGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Home;
