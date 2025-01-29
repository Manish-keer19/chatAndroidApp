import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useSelector} from 'react-redux';

interface Message {
  id: string;
  content: string;
  sender: string;
  isMe: boolean;
}

const SimpleChat = () => {
  const userData = useSelector((state: any) => state.User.userdata);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const stompClient = useRef<Client | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS('http://192.168.43.116:8080/ws');
      const client = new Client({
        webSocketFactory: () => sock,
        reconnectDelay: 5000,
        debug: str => console.log('[STOMP]', str),

        onConnect: frame => {
          console.log('[WS] Connected:', frame);
          setConnectionStatus('Connected');

          client.subscribe('/public/messages', message => {
            if (message.body) {
              const messageData: Message = JSON.parse(message.body);
              setMessages(prevMessages => [...prevMessages, messageData]);
            }
          });

          // Send a test message on connect
          client.publish({
            destination: '/app/chat',
            body: JSON.stringify({
              content: 'Connection established',
              sender: 'System',
              type: 'CONNECT',
            }),
          });
        },
        onStompError: frame => {
          console.error('[STOMP] Error:', frame.headers.message);
          console.log('[STOMP] Error details:', frame.body);
          setConnectionStatus(`Error: ${frame.headers.message}`);
        },
        onWebSocketError: event => {
          console.error('[WS] Error:', event);
          setConnectionStatus('WebSocket Error');
        },
        onDisconnect: () => {
          console.log('[WS] Disconnected');
          setConnectionStatus('Disconnected');
        },
      });

      client.activate();
      stompClient.current = client;

      return client;
    };

    const client = connectWebSocket();

    return () => {
      console.log('[WS] Cleaning up...');
      client.deactivate();
    };
  }, []);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const messageData = {
      id: Date.now(),
      username: userData?.userName || 'manish keer',
      content: inputText,
    };

    if (stompClient.current?.connected) {
      console.log('[WS] Sending message:', messageData);
      stompClient.current.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(messageData),
        headers: {'content-type': 'application/json'},
      });

      setInputText('');
    } else {
      console.log('[WS] Not connected, queueing message');
      addMessage({
        id: `${Date.now()}-${Math.random()}`,
        content: inputText,
        sender: 'User (offline)',
        isMe: true,
      });
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Status: {connectionStatus}</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.isMe ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text style={styles.sender}>{msg.sender}</Text>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 10,
  },
  status: {
    color: '#8e8e8e',
    marginBottom: 10,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2e7d32',
    color: '#fff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#424242',
  },
  sender: {
    color: '#ff9800',
    fontSize: 12,
    marginBottom: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#424242',
    borderRadius: 20,
    padding: 12,
    color: '#fff',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SimpleChat;
