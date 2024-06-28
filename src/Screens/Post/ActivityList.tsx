import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { asyncGetAllActivities } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectActivities } from '../../Stores/slices/post.slice';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { Activity } from '../../Types/Post';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<PostStackParams, 'activityList'>;

const ActivityList = ({ navigation }: Props) => {
  const [loading, getActivities] = useLoaderDispatch(asyncGetAllActivities);
  let activities = useAppSelector(selectActivities);

  useEffect(() => {
    getActivities()
  }, [getActivities]);

  const renderItem = ({
    item,
  }: {
    item: Activity;
  }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(EPostStack.createPost, {
            activityId: item._id,
          })
        }>
        <View style={styles.iconContainer}>
          <ImageBox image={{ uri: item.image }} _imageStyle={styles.featureIcons} />
        </View>
        <GlroyBold
          text={item.title}
          _style={{
            fontSize: 14,
            color: colors.text.black,
            marginTop: 8,
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <DataLoader />
  }

  return (
    <Layout
      _styleSheetViewContent={{
        marginTop: 20,
      }}
      customHeader={
        <CustomHeader
          title="Select Activity"
        />
      }>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: colors.card.card1,
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 15,
    width: vw * 38,
    borderRadius: 10,
    padding: 15,
  },
  iconContainer: {
    height: 34,
    width: 34,
    borderRadius: 12,
    alignSelf: 'center',
  },
  featureIcons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default ActivityList;
