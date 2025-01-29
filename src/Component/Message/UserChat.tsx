// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SockJS from 'sockjs-client';
// import {Client} from '@stomp/stompjs';
// import 'globalthis/auto';
// import axiosInstance from '../../Services/axios';
// import {useSelector} from 'react-redux';
// import debounce from 'lodash.debounce';

// export default function UserChat({route}: any) {
//   const {user} = route.params || {};
//   const selectedUser = user;
//   const token = useSelector((state: any) => state.User.token);
//   const userData = useSelector((state: any) => state.User.userdata);

//   const scrollViewRef = useRef<ScrollView>(null);
//   const inputRef = useRef<TextInput | null>(null);

//   const [messages, setMessages] = useState<any[]>([]);
//   const [message, setMessage] = useState('');
//   const [isEditable, setIsEditable] = useState<boolean>(false);
//   const [stompClient, setStompClient] = useState<Client | null>(null);

//   // const wsUrl = 'http://192.168.199.139:8080/ws'; // Replace with your WebSocket URL
//   const wsUrl = 'https://spring-chat-application.onrender.com/ws'; // Replace with your WebSocket URL
//   // const wsUrl = 'ws://spring-chat-application.onrender.com/ws'; // Replace with your WebSocket URL

//   useEffect(() => {
//     const client = new Client({
//       webSocketFactory: () => new SockJS(wsUrl),
//       debug: str => console.log('[STOMP]', str),
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     client.onConnect = frame => {
//       console.log('STOMP Connected:', frame.headers);
//       client.subscribe('/public/messages', message => {
//         const messageData = JSON.parse(message.body);
//         console.log('Message received:', messageData);
//         setMessages(prevMessages => [...prevMessages, messageData]);
//         setMessage('');
//       });

//       client.subscribe(`/user/queue/${userData.id}`, message => {
//         const messageData = JSON.parse(message.body);
//         console.log('Message received:', messageData);
//         setMessages(prevMessages => [...prevMessages, messageData]);
//         setMessage('');
//       });
//     };

//     client.onStompError = frame =>
//       console.error('STOMP Error:', frame.headers.message);
//     client.onWebSocketError = event => console.error('WebSocket Error:', event);
//     client.activate();

//     setStompClient(client);

//     return () => {
//       client.deactivate();
//     };
//   }, []);

//   const sendMessage = async () => {
//     if (!stompClient?.connected) {
//       console.error('Not connected');
//       return;
//     }

//     if (message.length <= 0) {
//       ToastAndroid.show("Message can't be empty", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       stompClient.publish({
//         destination: '/app/sendMessageString',
//         body: JSON.stringify(message),
//         headers: {'content-type': 'application/json'},
//       });
//       setMessage(''); // Clear the input field after sending
//     } catch (error) {
//       console.error('Send failed:', error);
//     }
//   };

//   const sendMessageSenderAndReceiver = () => {
//     console.log('Sending message from sender to receiver');
//     console.log('Message content:', message);

//     if (!stompClient) {
//       console.log('STOMP client is not initialized yet.');
//       return; // Avoid sending message or performing actions
//     }

//     // Validate the message content
//     if (message.length <= 0) {
//       console.log('Message length is:', message.length);
//       ToastAndroid.show("Message can't be empty", ToastAndroid.SHORT);
//       return;
//     }

//     // Check if all necessary data is available

//     // console.log('Selected user:', selectedUser);
//     // console.log('User data:', userData);
//     // console.log('Stomp client:', stompClient);
//     if (stompClient && selectedUser && userData) {
//       const messageData = {
//         senderId: userData?.id,
//         receiverId: selectedUser?.id,
//         messageContent: message,
//       };

//       stompClient?.publish({
//         destination: '/app/sendMessageSenderAndReceiver',
//         body: JSON.stringify(messageData),
//         headers: {'content-type': 'application/json'},
//       });

//       console.log('Message sent:', messageData);
//       setMessage(''); // Clear message input after sending
//     } else {
//       ToastAndroid.show(
//         'Failed to send message. Please try again.',
//         ToastAndroid.SHORT,
//       );
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       if (!selectedUser || !selectedUser.id || !token) {
//         ToastAndroid.show(
//           'Selected user or token not found',
//           ToastAndroid.SHORT,
//         );
//         return;
//       }

//       const res = await axiosInstance.get(
//         `message/get-messages/${selectedUser.id}`,
//         {
//           headers: {Authorization: `Bearer ${token}`},
//         },
//       );
//       setMessages(res.data.data.messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       if (error instanceof Error) {
//         console.log('Error message:', error.message);
//       } else {
//         console.log('Unexpected error:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [user, token]);

//   useEffect(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({animated: true});
//     }
//   }, [messages]);

//   const handleMessageChange = useCallback(
//     debounce(value => {
//       setMessage(value);
//     }, 100), // Delay of 100ms before state is updated
//     [],
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity style={styles.backButton}>
//             <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.userInfo}>
//             <Image source={{uri: user?.profilePic}} style={styles.userImage} />
//             <View>
//               <Text style={styles.userName}>{user?.userName}</Text>
//               <Text style={styles.userStatus}>Online</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.headerRight}>
//           <MaterialIcons name="call" size={24} color="white" />
//           <FontAwesome name="video-camera" size={24} color="white" />
//         </View>
//       </View>

//       <ScrollView
//         ref={scrollViewRef}
//         style={styles.messageContainer}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: 10}}
//         onContentSizeChange={() =>
//           scrollViewRef.current?.scrollToEnd({animated: true})
//         }
//         scrollEventThrottle={16}>
//         {messages?.length > 0 ? (
//           <View style={styles.messageWrapper}>
//             {messages.map((msg: any, i: any) => (
//               <TouchableOpacity
//                 key={i}
//                 style={[
//                   styles.message,
//                   msg.sender !== user?.id
//                     ? styles.selectedUserMessage
//                     : styles.currentUserMessage,
//                 ]}
//                 onPress={() => {}}
//                 onLongPress={() => {}}>
//                 <View style={styles.messageContent}>
//                   {msg.sender?._id === selectedUser?._id ? (
//                     <View style={styles.selectedUserRow}>
//                       <Text style={styles.selectedUserMessageText}>
//                         {msg.message}
//                       </Text>
//                       {msg.media && (
//                         <Image
//                           source={{uri: msg.media}}
//                           style={styles.selectedUserMedia}
//                         />
//                       )}
//                     </View>
//                   ) : (
//                     <View style={styles.currentUserRow}>
//                       {msg.media && (
//                         <Image
//                           source={{uri: msg.media}}
//                           style={styles.currentUserMedia}
//                         />
//                       )}
//                       <Text style={styles.currentUserMessageText}>
//                         {msg.message}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ) : (
//           <View style={styles.noMessagesContainer}>
//             <Text style={styles.noMessagesText}>
//               No messages yet. Start the conversation!
//             </Text>
//           </View>
//         )}
//       </ScrollView>

//       <View style={styles.inputContainer}>
//         <TextInput
//           ref={inputRef}
//           multiline
//           style={styles.textInput}
//           placeholder="Type a message..."
//           placeholderTextColor="#B0B0B0"
//           value={message}
//           onChangeText={value => setMessage(value)}
//         />
//         <TouchableOpacity
//           onPress={sendMessageSenderAndReceiver}
//           style={styles.sendButton}>
//           <FontAwesome name="send" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   backButton: {
//     padding: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   userImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 50,
//   },
//   userName: {
//     color: 'white',
//   },
//   userStatus: {
//     color: 'white',
//     fontSize: 13,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 15,
//     marginRight: 10,
//   },
//   messageContainer: {
//     flex: 1,
//     paddingHorizontal: 10,
//     backgroundColor: '#121212',
//   },
//   messageWrapper: {
//     gap: 10,
//     paddingBottom: 20,
//   },
//   message: {
//     padding: 12,
//     marginVertical: 8,
//     maxWidth: '80%',
//     borderRadius: 25,
//     backgroundColor: '#1E90FF',
//     alignSelf: 'flex-start',
//   },
//   currentUserMessage: {
//     backgroundColor: '#1E90FF',
//     alignSelf: 'flex-start',
//   },
//   selectedUserMessage: {
//     backgroundColor: '#333',
//     alignSelf: 'flex-end',
//   },
//   messageContent: {
//     gap: 10,
//   },
//   selectedUserRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   currentUserRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedUserMessageText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   currentUserMessageText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   selectedUserMedia: {
//     width: 200,
//     height: 150,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   currentUserMedia: {
//     width: 200,
//     height: 150,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#121212',
//   },
//   textInput: {
//     flex: 1,
//     color: 'white',
//   },
//   sendButton: {
//     backgroundColor: 'darkblue',
//     borderRadius: 50,
//     padding: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   noMessagesContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 600,
//   },
//   noMessagesText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     lineHeight: 30,
//   },
// });

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import axiosInstance from '../../Services/axios';
import {useSelector} from 'react-redux';
import debounce from 'lodash.debounce';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {userService} from '../../Services/Authservice/userService';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '../../../Entryroute';
import {PermissionsAndroid} from 'react-native';

export default function UserChat({route}: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user} = route.params || {};
  const selectedUser = user;
  const token = useSelector((state: any) => state.User.token);
  const userData = useSelector((state: any) => state.User.userdata);

  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [imageUri, setImageUri] = useState('');

  const wsUrl = 'https://spring-chat-application.onrender.com/ws';

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission denied');
        return;
      }
    }
    console.log('Permission granted');
  };

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      debug: str => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = frame => {
      console.log('STOMP Connected:', frame.headers);
      client.subscribe('/public/messages', message => {
        const messageData = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, messageData]);
        setMessage('');
      });

      client.subscribe(`/user/queue/${userData.id}`, message => {
        const messageData = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, messageData]);
        setMessage('');
      });
    };

    client.onStompError = frame =>
      console.error('STOMP Error:', frame.headers.message);
    client.onWebSocketError = event => console.error('WebSocket Error:', event);
    client.activate();

    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = async () => {
    if (!stompClient?.connected) {
      console.error('Not connected');
      return;
    }

    if (message.length <= 0) {
      ToastAndroid.show("Message can't be empty", ToastAndroid.SHORT);
      return;
    }

    try {
      stompClient.publish({
        destination: '/app/sendMessageString',
        body: JSON.stringify(message),
        headers: {'content-type': 'application/json'},
      });
      setMessage('');
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  const sendMessageSenderAndReceiver = () => {
    if (!stompClient || !selectedUser || !userData) {
      ToastAndroid.show(
        'Failed to send message. Please try again.',
        ToastAndroid.SHORT,
      );
      return;
    }

    const messageData = {
      senderId: userData?.id,
      receiverId: selectedUser?.id,
      messageContent: message,
    };

    stompClient.publish({
      destination: '/app/sendMessageSenderAndReceiver',
      body: JSON.stringify(messageData),
      headers: {'content-type': 'application/json'},
    });

    setMessage('');
  };

  const handleChoseImage = async () => {
    try {
      console.log('we are in handleChoseImage');
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        console.log('No assets returned');
        return;
      }

      if (result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      }
      setSelectedFile(result.assets[0]);
      console.log('Image selected:', result.assets[0].uri);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleFileSave = async (): Promise<void> => {
    setImageUri('');
    if (!selectedFile) return; // Ensure `selectedFile` is not null
    setMessages((prev: any) => [
      ...prev,
      {
        sender: userData.id,
        createdAt:
          selectedFile.creationDate?.toString() || new Date().toString(),
        media: imageUri, // Correctly handle file
      },
    ]);
    try {
      ToastAndroid.show('Uploading file...', ToastAndroid.SHORT);
      console.log('selectedFile is ', selectedFile);
      const data = new FormData();
      // data.append('file', selectedFile);
      data.append('file', {
        uri: selectedFile.uri, // Ensure this is the correct URI for the file
        name: selectedFile.fileName, // Make sure the fileName is correct
        type: selectedFile.type, // Example: 'image/jpeg'
      });

      data.append(
        'messageRequest',
        JSON.stringify({senderId: userData.id, receiverId: selectedUser?.id}),
      );
      const res = await userService.SendMedia(token, data);
      console.log('res is ', res);
      if (res) {
        ToastAndroid.show('Image send successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error saving file:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!selectedUser || !selectedUser.id || !token) {
        ToastAndroid.show(
          'Selected user or token not found',
          ToastAndroid.SHORT,
        );
        return;
      }

      const res = await axiosInstance.get(
        `message/get-messages/${selectedUser.id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setMessages(res.data.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user, token]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <LinearGradient colors={['#0F0F1E', '#1A1A2E']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.userInfo}>
            <Image source={{uri: user?.profilePic}} style={styles.userImage} />
            <View>
              <Text style={styles.userName}>{user?.userName}</Text>
              <Text style={styles.userStatus}>
                {isTyping ? 'Typing...' : 'Online'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="call" size={24} color="white" />
          <FontAwesome name="video-camera" size={24} color="white" />
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messageContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }>
        {messages?.length > 0 ? (
          <View style={styles.messageWrapper}>
            {messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.messageBubble,
                  msg.sender == userData?.id
                    ? styles.currentUserMessage
                    : styles.selectedUserMessage,
                ]}>
                {msg.media ? (
                  <Image
                    source={{uri: msg.media}}
                    style={styles.messageImage}
                  />
                ) : (
                  <Text style={styles.messageText}>{msg.message}</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessagesText}>
              No messages yet. Start the conversation!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Image Preview */}
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
            <TouchableOpacity
              onPress={() => setImageUri('')}
              style={styles.removeImageButton}>
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleChoseImage} style={styles.imageButton}>
          <MaterialIcons name="image" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          multiline
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#B0B0B0"
          value={message}
          onChangeText={value => {
            setMessage(value);
            if (value.length > 0) {
              setIsTyping(true);
            } else {
              setIsTyping(false);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (selectedFile) {
              console.log('handleFileSave will be run ');
              handleFileSave();
            } else {
              console.log('basic message will be sent ');
              sendMessageSenderAndReceiver();
            }
          }}
          style={styles.sendButton}>
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <FontAwesome name="send" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1F1F2E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userStatus: {
    color: '#8B5CF6',
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#121212',
  },
  messageWrapper: {
    gap: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  currentUserMessage: {
    backgroundColor: '#8B5CF6',
    alignSelf: 'flex-end',
  },
  selectedUserMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1F1F2E',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  imageButton: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
    backgroundColor: '#2B2B3D',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  noMessagesText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
});
