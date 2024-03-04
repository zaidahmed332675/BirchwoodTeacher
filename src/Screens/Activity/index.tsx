import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { VIcon } from '../../Components/VIcon';
import {
  ActivityStackParams,
  EActivityStack,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { NewActivityPopup } from '../../Components/NewActivityPopup';
import { CustomHeader } from '../../Components/CustomHeader';
import { GrayMediumText } from '../../Components/GrayMediumText';

type Props = StackScreenProps<ActivityStackParams, 'activities'>;

const Activities = ({ navigation }: Props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activities, setActivities] = useState([
    {
      _id: 6,
      name: 'Painting/Drawing',
    },
    {
      _id: 5,
      name: 'Crafting',
    },
    {
      _id: 4,
      name: 'Reading',
    },
    {
      _id: 3,
      name: 'Writing',
    },
    {
      _id: 2,
      name: 'Exercising',
    },
    {
      _id: 1,
      name: 'Traveling',
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
        <View style={styles.avatar}>
          <GrayMediumText
            text={item.name.slice(0, 1)}
            _style={{ color: colors.theme.primary, fontSize: 22 }}
          />
        </View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={{
          paddingLeft: 10,
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
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.theme.greyAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.theme.secondary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.theme.secondary,
    marginLeft: 10,
  },
});

export default Activities;
