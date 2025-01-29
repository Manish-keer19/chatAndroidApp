// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   Animated,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const About = () => {
//   const features = [
//     {
//       icon: <MaterialIcons name="message" size={28} color="#8B5CF6" />,
//       title: 'Real-time Chat',
//       description:
//         'Connect with users instantly through our real-time messaging system powered by WebSocket.',
//     },
//     // {
//     //   icon: <MaterialIcons name="playlist-add-check" size={28} color="#8B5CF6" />,
//     //   title: 'Todo Management',
//     //   description: 'Stay organized with our intuitive todo list feature.',
//     // },
//     // {
//     //   icon: <FontAwesome name="calculator" size={28} color="#8B5CF6" />,
//     //   title: 'Calculator',
//     //   description:
//     //     'Perform quick calculations with our beautiful calculator interface.',
//     // },
//     {
//       icon: <AntDesign name="profile" size={28} color="#8B5CF6" />,
//       title: 'Profile Management',
//       description:
//         'Customize your profile and manage your personal information.',
//     },
//   ];

//   const socialLinks = [
//     {
//       icon: <FontAwesome name="github" size={24} color="#FFF" />,
//       url: 'https://github.com/Manish-keer19',
//       label: 'GitHub',
//     },
//     {
//       icon: <FontAwesome name="linkedin-square" size={24} color="#FFF" />,
//       url: 'https://www.linkedin.com/in/manish-keer-93a212247/',
//       label: 'LinkedIn',
//     },
//     {
//       icon: <FontAwesome name="instagram" size={24} color="#FFF" />,
//       url: 'https://www.instagram.com/manish_keer19/',
//       label: 'Instagram',
//     },
//   ];

//   const fadeAnim = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   return (
//     <LinearGradient
//       colors={['#0F0F1E', '#1A1A2E', '#2D0B59']}
//       style={styles.container}>
//       <ScrollView>
//         {/* Hero Section */}
//         <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
//           <LinearGradient
//             colors={['#8A4F96', '#E879F9']}
//             style={styles.heroGradient}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}>
//             <Text style={styles.heroTitle}>Chat Android App</Text>
//             <Text style={styles.heroDescription}>
//               A modern Android application built with React Native, featuring
//               real-time chat, todo management, and more.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         {/* Features Section */}
//         <View style={styles.featuresSection}>
//           {features.map((feature, index) => (
//             <LinearGradient
//               key={index}
//               colors={['#2B2B3D', '#1F1F2E']}
//               style={styles.featureCard}>
//               <View style={styles.featureIcon}>{feature.icon}</View>
//               <Text style={styles.featureTitle}>{feature.title}</Text>
//               <Text style={styles.featureDescription}>
//                 {feature.description}
//               </Text>
//             </LinearGradient>
//           ))}
//         </View>

//         {/* Creator Section */}
//         <View style={styles.creatorSection}>
//           <LinearGradient
//             colors={['#8A4F96', '#E879F9']}
//             style={styles.creatorImageContainer}>
//             <Image
//               source={{
//                 uri: 'https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4',
//               }}
//               style={styles.creatorImage}
//             />
//           </LinearGradient>
//           <Text style={styles.creatorName}>Created by Manish Keer</Text>
//           <Text style={styles.creatorDescription}>
//             Full-stack developer passionate about creating beautiful and
//             functional applications.
//           </Text>
//           <View style={styles.socialLinks}>
//             {socialLinks.map((link, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.socialButton}
//                 onPress={() => Linking.openURL(link.url)}>
//                 {link.icon}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Technologies Section */}
//         <View style={styles.technologiesSection}>
//           <Text style={styles.technologiesTitle}>
//             Built with Modern Technologies
//           </Text>
//           <View style={styles.technologiesList}>
//             {[
//               'React Native',
//               'TypeScript',
//               'WebSocket',
//               'Node.js',
//               'Spring Boot',
//               'MongoDB',
//               'JWT',
//               'Electron',
//             ].map((tech, index) => (
//               <LinearGradient
//                 key={index}
//                 colors={['#8A4F96', '#E879F9']}
//                 style={styles.techChip}>
//                 <Text style={styles.techChipText}>{tech}</Text>
//               </LinearGradient>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   heroSection: {
//     margin: 20,
//     borderRadius: 20,
//     overflow: 'hidden',
//     elevation: 5,
//   },
//   heroGradient: {
//     padding: 25,
//     alignItems: 'center',
//   },
//   heroTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   heroDescription: {
//     fontSize: 16,
//     color: '#EEE',
//     textAlign: 'center',
//   },
//   featuresSection: {
//     paddingHorizontal: 20,
//   },
//   featureCard: {
//     padding: 20,
//     borderRadius: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   featureIcon: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   featureTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   featureDescription: {
//     fontSize: 14,
//     color: '#BBB',
//     textAlign: 'center',
//   },
//   creatorSection: {
//     alignItems: 'center',
//     padding: 20,
//     margin: 20,
//     borderRadius: 20,
//     backgroundColor: '#2B2B3D',
//     elevation: 5,
//   },
//   creatorImageContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   creatorImage: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   creatorName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 5,
//   },
//   creatorDescription: {
//     fontSize: 14,
//     color: '#BBB',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   socialLinks: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 15,
//   },
//   socialButton: {
//     backgroundColor: '#444',
//     padding: 12,
//     borderRadius: 30,
//     elevation: 3,
//   },
//   technologiesSection: {
//     padding: 20,
//   },
//   technologiesTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   technologiesList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   techChip: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     elevation: 3,
//   },
//   techChipText: {
//     fontSize: 14,
//     color: '#FFF',
//     fontWeight: '500',
//   },
// });

// export default About;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const About = () => {
  const features = [
    {
      icon: <MaterialIcons name="message" size={28} color="#8B5CF6" />,
      title: 'Real-time Chat',
      description:
        'Connect with users instantly through our real-time messaging system powered by WebSocket.',
    },
    {
      icon: <AntDesign name="profile" size={28} color="#8B5CF6" />,
      title: 'Profile Management',
      description:
        'Customize your profile and manage your personal information.',
    },
  ];

  const socialLinks = [
    {
      icon: <FontAwesome name="github" size={24} color="#FFF" />,
      url: 'https://github.com/Manish-keer19',
      label: 'GitHub',
    },
    {
      icon: <FontAwesome name="linkedin-square" size={24} color="#FFF" />,
      url: 'https://www.linkedin.com/in/manish-keer-93a212247/',
      label: 'LinkedIn',
    },
    {
      icon: <FontAwesome name="instagram" size={24} color="#FFF" />,
      url: 'https://www.instagram.com/manish_keer19/',
      label: 'Instagram',
    },
  ];

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={['#0F0F1E', '#1A1A2E', '#2D0B59']}
      style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, {opacity: fadeAnim}]}>
          <LinearGradient
            colors={['#8A4F96', '#E879F9']}
            style={styles.heroGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.heroTitle}>Chat Android App</Text>
            <Text style={styles.heroDescription}>
              A modern Android application built with React Native, featuring
              real-time chat and more.
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <LinearGradient
              key={index}
              colors={['#2B2B3D', '#1F1F2E']}
              style={styles.featureCard}>
              <View style={styles.featureIcon}>{feature.icon}</View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </LinearGradient>
          ))}
        </View>

        {/* Web Version Section */}
        <View style={styles.webSection}>
          <Text style={styles.webTitle}>Check Out the Web Version</Text>
          <TouchableOpacity
            style={styles.webButton}
            onPress={() =>
              Linking.openURL('https://manishchatapp.vercel.app/')
            }>
            <Text style={styles.webButtonText}>Visit Web App</Text>
          </TouchableOpacity>
        </View>

        {/* Creator Section */}
        <View style={styles.creatorSection}>
          <LinearGradient
            colors={['#8A4F96', '#E879F9']}
            style={styles.creatorImageContainer}>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4',
              }}
              style={styles.creatorImage}
            />
          </LinearGradient>
          <Text style={styles.creatorName}>Created by Manish Keer</Text>
          <Text style={styles.creatorDescription}>
            Full-stack developer passionate about creating beautiful and
            functional applications.
          </Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialButton}
                onPress={() => Linking.openURL(link.url)}>
                {link.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  heroGradient: {
    padding: 25,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
  },
  featureCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  featureIcon: {
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
  },
  webSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  webTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  webButton: {
    backgroundColor: '#8A4F96',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  webButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  creatorSection: {
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#2B2B3D',
    elevation: 5,
  },
  creatorImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  creatorImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  creatorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  creatorDescription: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
    marginBottom: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 30,
    elevation: 3,
  },
});

export default About;
