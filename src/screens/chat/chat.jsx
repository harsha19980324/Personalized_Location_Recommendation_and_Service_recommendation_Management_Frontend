import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  View,
  ToastAndroid,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconMick from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSend from 'react-native-vector-icons/Ionicons';
import Message from '../chat/Message';
import {theme} from '../../core/theme';
import {useRef} from 'react';
import axios from 'axios';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export default function Chat() {
  const [messages, setMessages] = useState([]); // Array to store messages
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    const initialReceiverMessage = {
      id: Date.now(),
      text: 'Hi! My name is Travel Buddy. I am your tourist assistance.',
      type: 'receiver',
    };
    setMessages([initialReceiverMessage]);

    () => {
      setMessage([]);
    };
  }, []);

  // const sendMessage = () => {
  //   if (message.trim() !== '') {
  //     const senderMessage = {id: Date.now(), text: message, type: 'sender'};
  //     const receiverMessage = {
  //       id: Date.now() + 1,
  //       text: "Hello, I'm the receiver!",
  //       type: 'receiver',
  //     };

  //     setMessages([...messages, senderMessage, receiverMessage]);
  //     setMessage('');
  //     flatListRef.current.scrollToEnd({animated: true});
  //   }
  // };

  const sendMessage = async () => {
    if (message.trim() !== '') {
      const senderMessage = {id: Date.now(), text: message, type: 'sender'};
      // setMessages([...messages, senderMessage]);
      // setMessage('');
      // flatListRef.current.scrollToEnd({animated: true});

      try {
        const response = await axios.post(
          'http://10.0.2.2:5011/predict/chatbot',
          {
            question: message,
          },
        );
        const receiverMessage = {
          id: Date.now() + 1,
          text: response?.data?.answer,
          type: 'receiver',
        };
        setMessages([...messages, senderMessage, receiverMessage]);
        setMessage('');
        flatListRef.current.scrollToEnd({animated: true});
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const onPlusClicked = () => {
    // console.warn("On pluss clicked");
  };

  const showToast = message => {
    console.log('pressed');
    ToastAndroid.show(`Message has been sent ${message}`, ToastAndroid.SHORT);
  };

  const onPress = () => {
    if (message) {
      sendMessage();
      return;
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height,
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: -1,
        }}>
        <Image
          source={{
            uri: 'https://i.ibb.co/vk5mJbB/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image-724254.jpg',
          }}
          width={width}
          height={height}
          style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Message message={item} />}
      />
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={newMessage => setMessage(newMessage)}
            placeholder="Type message..."
          />
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          <IconSend name="send" size={20} color="white" />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffae00',
    flex: 1,
  },
  root: {
    flexDirection: 'row',
    padding: 10,
  },

  inputContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
  },

  input: {
    flex: 1,
    marginHorizontal: 5,
    fontSize: 20,
  },

  icon: {
    marginHorizontal: 5,
  },

  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#0FA958',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});
