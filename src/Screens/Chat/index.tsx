import React from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';
import { ChatStackParams } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../theme/colors';
import { TouchableOpacity } from 'react-native';

type Props = StackScreenProps<ChatStackParams, 'chat'>;

const chatList = [
  {
    _id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/50/50', // Sample avatar URL
  },
  {
    _id: 2,
    name: 'Jane Smith',
    lastMessage: "I'm doing great, thanks!",
    timestamp: new Date(),
    avatar: 'https://placekitten.com/51/51', // Another sample avatar URL
  },
  {
    _id: 3,
    name: 'Alice Johnson',
    lastMessage: "What's up?",
    timestamp: new Date(),
    avatar: 'https://placekitten.com/52/52',
  },
  {
    _id: 4,
    name: 'Bob Williams',
    lastMessage: 'Not much, just chilling, watching TV, playing with my cat',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/53/53',
  },
  {
    _id: 5,
    name: 'Eva Brown',
    lastMessage: 'Any plans for the weekend?',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/54/54',
  },
  {
    _id: 6,
    name: 'Michael Davis',
    lastMessage: 'Thinking of going to the movies.',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/55/55',
  },
  {
    _id: 7,
    name: 'Olivia Smith',
    lastMessage: 'Sounds fun! Which movie?',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/56/56',
  },
  {
    _id: 8,
    name: 'Daniel White',
    lastMessage: 'Maybe something action-packed.',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/57/57',
  },
  {
    _id: 9,
    name: 'Sophia Jones',
    lastMessage: 'Cool! Let me know the showtime.',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/58/58',
  },
  {
    _id: 10,
    name: 'William Taylor',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/59/59',
  },
  {
    _id: 11,
    name: 'William Su',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/59/59',
  },
  {
    _id: 12,
    name: 'Taylor Tie',
    lastMessage: 'Sure thing!',
    timestamp: new Date(),
    avatar: 'https://placekitten.com/59/59',
  },
];

const Chat = ({ navigation }: Props) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('createChat', {
          userId: item._id,
          userName: item.name,
        });
      }}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
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
    <FlatList
      data={chatList}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderTopWidth: 0.4,
    borderColor: colors.theme.secondary,
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
