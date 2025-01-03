import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet ,Keyboard} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const apiKey = 'b9810cbd4d7e2d693c4d398deb7a73456af29c637ce82f8c6abbc1a9ac1440d3'; // Replace with your actual API key
const apiUrl = 'http://192.168.1.55:5000/chat'; // Replace with your actual API endpoint

export default function ChatBot() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: '1', text: "Assalamu alaikum! Welcome! I'm your professional assistant, here to help you with any health, medical, or nutrition-related questions you may have.", isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (inputText.trim()) {
      // Add user message to the list
      const userMessage = { id: `${messages.length + 1}`, text: inputText, isBot: false };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      try {
        // Send API request
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${apiKey}`, // Your API key here
          },
          body: JSON.stringify({ message: inputText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const botMessage = formatResponse(data.message);

        // Add bot response to the list
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `${prevMessages.length + 1}`, text: botMessage, isBot: true },
        ]);

        // Scroll to the bottom after adding bot response
        flatListRef.current.scrollToEnd({ animated: true });
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `${prevMessages.length + 1}`, text: 'Sorry, I could not process your request.', isBot: true },
        ]);
      }

      setInputText(''); // Clear input field

      // Scroll to the bottom after adding user message
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const formatResponse = (response) => {
    return response
      .replace(/\n/g, '\n') // Handle line breaks
      .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold text
      .replace(/(\*|_)(.*?)\1/g, '$2'); // Italic text
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isBot ? styles.botMessage : styles.userMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
  const {isNavBarVisible}=useLocalSearchParams();
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });
  
    // Cleanup listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  return (
    <View style={[styles.chatContainer, { paddingBottom: isKeyboardOpen ? 0 : 70 }]}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message here..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 70,
    paddingTop: 40,
  },
  messagesList: {
    flex: 1,

  },
  messagesContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  botMessage: {
    backgroundColor: '#f77e90',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: 'grey',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#faf5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FF6B81',
    padding: 10,
    borderRadius: 20,
  },
});
