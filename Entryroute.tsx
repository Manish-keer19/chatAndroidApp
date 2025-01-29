// import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Signup from './src/Component/Signup';
// import UserChat from './src/Component/Message/UserChat';
// import Login from './src/Component/Login';
// import {Provider, useDispatch} from 'react-redux';
// import {store} from './src/Component/app/store';
// import Home from './src/Component/Home';
// import Message from './src/Component/Message/Message';
// import ChatScreen from './src/Component/Message/SimpleChat';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import BasicChatUI from './src/Component/Message/BasicChatUI';
// import useAsyncStorage from './src/utils/useAsyncStorage';
// import {
//   logout,
//   SaveAllUserData,
//   setToken,
//   setuser,
// } from './src/Component/features/User/UserSlice';

// import About from './src/Component/About';

// export type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   Signup: undefined;
//   UserChat: undefined | {user: any};
//   Message: undefined;
//   ChatScreen: undefined;
//   BasicChatUI: undefined; // Add BasicChatUI to RootStackParamList
//   BottomNav: undefined;
//   Calc: undefined;
//   About: undefined;
//   Profile: undefined;
// };

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName: string = '';
//           if (route.name === 'Home') {
//             iconName = 'home';
//           } else if (route.name === 'Message') {
//             iconName = 'message';
//           }

//           return (
//             <MaterialCommunityIcons name={iconName} size={size} color={color} />
//           );
//         },
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           backgroundColor: 'black',
//         },
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Message" component={Message} />

//       {/* Added BasicChatUI */}
//     </Tab.Navigator>
//   );
// };

// export default function Entryroute() {
//   const dispatch = useDispatch();

//   const [initialRoute, setInitialRoute] = useState<string>('Login');
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const {data, loading, error} = useAsyncStorage('userDataAndToken');

//   if (data) {
//     dispatch(setuser(data.userdata));
//     dispatch(setToken(data.token));
//     data.allUsers && dispatch(SaveAllUserData(data.allUsers));
//   }

//   console.log('data is ', data);

//   useEffect(() => {
//     if (loading) return; // Wait until data is fetched from AsyncStorage

//     if (data?.userdata && data?.token) {
//       setInitialRoute('BottomNav'); // Set initial route to 'Home' if user is logged in
//     } else {
//       setInitialRoute('Login'); // Otherwise, set it to 'Login'
//     }

//     setIsLoading(false); // Data has been loaded, stop loading state
//   }, [loading, data]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator
//           style={styles.loaderIndicator}
//           size="large"
//           color="#ffffff"
//         />
//         <Text style={styles.loaderText}>Loading...</Text>
//       </View>
//     );
//   }
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={initialRoute}
//         // initialRouteName={"Login"}
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="UserChat" component={UserChat} />
//         <Stack.Screen name="ChatScreen" component={ChatScreen} />
//         <Stack.Screen name="BasicChatUI" component={BasicChatUI} />
//         <Stack.Screen name="BottomNav" component={BottomTabNavigator} />

//         <Stack.Screen name="About" component={About} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adds a dimmed background to focus on the loader
//   },
//   loaderText: {
//     marginTop: 20, // Space between the indicator and text
//     fontSize: 18, // Larger font size for the text
//     fontWeight: 'bold', // Bold text for better visibility
//     color: '#ffffff', // White color for the text
//   },
//   loaderIndicator: {
//     transform: [{scale: 1.5}], // Increase the size of the loader for better visibility
//   },
// });

import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Signup from './src/Component/Signup';
import UserChat from './src/Component/Message/UserChat';
import Login from './src/Component/Login';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/Component/app/store';
import Home from './src/Component/Home';
import Message from './src/Component/Message/Message';
import ChatScreen from './src/Component/Message/SimpleChat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicChatUI from './src/Component/Message/BasicChatUI';
import useAsyncStorage from './src/utils/useAsyncStorage';
import {
  logout,
  SaveAllUserData,
  setToken,
  setuser,
} from './src/Component/features/User/UserSlice';
import About from './src/Component/About';
import LinearGradient from 'react-native-linear-gradient';
import Profile from './src/Component/Profile';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Signup: undefined;
  UserChat: undefined | {user: any};
  Message: undefined;
  ChatScreen: undefined;
  BasicChatUI: undefined;
  BottomNav: undefined;
  Calc: undefined;
  About: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Message') {
            iconName = 'message';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Message" component={Message} />
    </Tab.Navigator>
  );
};

export default function Entryroute() {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<string>('Login');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {data, loading, error} = useAsyncStorage('userDataAndToken');

  if (data) {
    dispatch(setuser(data.userdata));
    dispatch(setToken(data.token));
  
  }

  useEffect(() => {
    if (loading) return;

    if (data?.userdata && data?.token) {
      setInitialRoute('BottomNav');
    } else {
      setInitialRoute('Login');
    }

    setIsLoading(false);
  }, [loading, data]);

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#0F0F1E', '#1A1A2E', '#2D0B59']}
        style={styles.loadingContainer}>
        <View style={styles.loaderContent}>
          {/* Placeholder for logo */}
          <Image
            source={require("./assets/manish.jpg")} // Replace with your logo
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome to Manish's Chat App</Text>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="BasicChatUI" component={BasicChatUI} />
        <Stack.Screen name="BottomNav" component={BottomTabNavigator} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContent: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius:50
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});
