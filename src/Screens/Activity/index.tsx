import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import VIcon from '../../Components/VIcon';
import {
  ActivityStackParams,
  EActivityStack,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { NewActivityPopup } from '../../Components/NewActivityPopup';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<ActivityStackParams, 'activities'>;

const Activities = ({ navigation }: Props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activities, setActivities] = useState([
    {
      _id: 6,
      name: 'Painting/Drawing Painting/Drawing',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Men's avatar URL
    },
    {
      _id: 5,
      name: 'Crafting',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg', // Women's avatar URL
    },
    {
      _id: 4,
      name: 'Reading',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      _id: 3,
      name: 'Writing',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      _id: 2,
      name: 'Exercising',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      _id: 1,
      name: 'Traveling',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ]);

  const handleNewActivity = (activityName: string) => {
    setActivities(prevActivities => [
      {
        _id: prevActivities.length + 1,
        name: activityName,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      ...prevActivities,
    ]);
    setPopupVisible(false);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('activity', {
          activityId: item._id,
          activityName: item.name,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexBasis: '75%',
          paddingVertical: 10,
        }}>
        <ImageBox
          image={{ uri: item.avatar }}
          _imageStyle={styles.avatar}
          _indicatorStyle={styles.avatar}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          height: '100%',
        }}
        onPress={() => {
          navigation.navigate(EActivityStack.activity, {
            activityId: item._id,
            activityName: item.name,
          });
        }}>
        <VIcon
          type="Ionicons"
          name="ellipsis-vertical"
          size={20}
          color={colors.theme.greyAlt2}
          style={{
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Layout
      _styleSheetView={{
        paddingHorizontal: 10,
      }}
      customHeader={
        <CustomHeader
          title="Activities"
          isActionEnbl={true}
          onPress={() => setPopupVisible(true)}
        />
      }>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
      <NewActivityPopup
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onSubmit={handleNewActivity}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: colors.theme.greyAlt,
    backgroundColor: colors.theme.white,
    paddingLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.theme.secondary,
    marginLeft: 10,
  },
});

export default Activities;
