import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { ChatStackParams, EChatStack } from '../../Types/NavigationTypes';
import { colors } from '../../apptheme/colors';

type Props = StackScreenProps<ChatStackParams, 'chat'>;

const chatList = [
  {
    _id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Men's avatar URL
  },
  {
    _id: 2,
    name: 'Jane Smith',
    lastMessage: "I'm doing great, thanks!",
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg', // Women's avatar URL
  },
  {
    _id: 3,
    name: 'Alice Johnson',
    lastMessage: "What's up?",
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    _id: 4,
    name: 'Bob Williams',
    lastMessage: 'Not much, just chilling, watching TV, playing with my cat',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    _id: 5,
    name: 'Eva Brown',
    lastMessage: 'Any plans for the weekend?',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    _id: 6,
    name: 'Michael Davis',
    lastMessage: 'Thinking of going to the movies.',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    _id: 7,
    name: 'Olivia Smith',
    lastMessage: 'Sounds fun! Which movie?',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    _id: 8,
    name: 'Daniel White',
    lastMessage: 'Maybe something action-packed.',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    _id: 9,
    name: 'Sophia Jones',
    lastMessage: 'Cool! Let me know the showtime.',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    _id: 10,
    name: 'William Taylor',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    _id: 11,
    name: 'William Su',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    _id: 12,
    name: 'Taylor Tie',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

const Chat = ({ navigation }: Props) => {

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(EChatStack.createChat, {
          childId: item._id,
          chatRoomId: item.name,
        });
      }}>
      <ImageBox
        image={{ uri: item.avatar }}
        _imageStyle={styles.avatar}
        _indicatorStyle={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.message} ellipsizeMode="tail" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
    </TouchableOpacity>
  );

  const formatTime = (timestamp: any) => {
    let date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <Layout customHeader={<CustomHeader title="Chat List" />}>
      <View style={styles.container}>
        <FlatList
          data={chatList}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: 'row',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: colors.theme.greyAlt,
    backgroundColor: colors.theme.white,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.theme.secondary,
  },
  message: {
    fontSize: 14,
    color: colors.theme.greyAlt2,
  },
  time: {
    fontSize: 12,
    color: colors.theme.greyAlt2,
  },
});

export default Chat;
