import {Client} from '@stomp/stompjs';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import SockJS from 'sockjs-client';

const BasicChatUI = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const [stopmClient, setstopmClient] = useState<Client | null>(null);
  //   const wsUrl = 'http://localhost:8080/ws';
  //   const wsUrl = 'http://192.168.199.139:8080/ws';
  //   const wsUrl = 'wss://spring-chat-application.onrender.com:8080/ws';
  const wsUrl = 'https://spring-chat-application.onrender.com/ws';

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl), // Use SockJS factory
      debug: str => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Add lifecycle handlers
    client.onConnect = frame => {
      console.log('STOMP Connected:', frame.headers);
      client.subscribe('/public/messages', message => {
        console.log('Received:', message.body);
        setMessages(prev => [...prev, message.body]);
      });
    };

    client.onStompError = frame => {
      console.error('STOMP Error:', frame.headers.message);
    };

    client.onWebSocketError = event => {
      console.error('WebSocket Error:', event);
    };

    client.activate();
    setstopmClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = async () => {
    if (!stopmClient?.connected) {
      console.error('Not connected');
      return;
    }

    try {
      stopmClient.publish({
        destination: '/app/sendMessageString',
        body: JSON.stringify(message),
        headers: {'content-type': 'application/json'},
      });
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Messages List */}

      <View style={styles.statusContainer}>
        <Text
          style={
            stopmClient?.connected ? styles.connected : styles.disconnected
          }>
          {stopmClient?.connected ? 'CONNECTED' : 'DISCONNECTED'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.testButton}
        onPress={async () => {
          try {
            const response = await fetch('http://192.168.199.139:8080/ws/info');
            console.log('SockJS Info:', await response.text());
          } catch (error) {
            console.error('Connection Test Failed:', error);
          }
        }}>
        <Text>Test Server Connection</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
        style={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    backgroundColor: '#0084ff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start', // Left-align messages
    maxWidth: '70%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  testButton: {
    backgroundColor: '#0084ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
  },
  statusContainer: {
    padding: 10,
    alignItems: 'center',
  },
  connected: {
    color: 'green',
    fontWeight: 'bold',
  },
  disconnected: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default BasicChatUI;
