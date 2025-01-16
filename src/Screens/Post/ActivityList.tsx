import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { Layout } from '../../Components/Layout';
import { LoadMoreFlatList } from '../../Components/LoadMoreFlatList';
import { NotFound } from '../../Components/NotFound';
import { ImageBox } from '../../Components/UploadImage';
import { asyncGetAllActivities } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectActivities } from '../../Stores/slices/post.slice';
import { colors } from '../../Theme/colors';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { Activity } from '../../Types/Post';
import { vh, vw } from '../../Utils/units';
import { selectAppLoader } from '../../Stores/slices/common.slice';

type Props = StackScreenProps<PostStackParams, 'activityList'>;

const ActivityList = ({ navigation }: Props) => {
  const [loading, getActivities] = useLoaderDispatch(asyncGetAllActivities);

  const activities = useAppSelector(selectActivities);
  const appLoading = useAppSelector(selectAppLoader)

  const loadData = (isFresh = false, ignoreLoading = false) => {
    if (!loading || ignoreLoading) getActivities({ isFresh })
  }

  useEffect(() => {
    loadData(true, true)
  }, [getActivities]);

  const renderItem = ({
    item,
  }: {
    item: Activity;
  }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate(EPostStack.createPost, {
            activityId: item._id,
            postId: ''
          })
        }
        }>
        <ImageBox image={{ uri: item.image }} _imageStyle={styles.featureIcons} />
        <GlroyBold
          text={item.title}
          _style={{
            fontSize: vh * 1.84, // 14
            color: colors.text.black,
            marginTop: vh * 1.05, // 8
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  if (loading && !activities.length) {
    return <DataLoader />
  }

  return (
    <Layout
      _styleSheetViewContent={{
        marginTop: vh * 2.63, // 20
      }}
      customHeader={
        <CustomHeader
          title="Select Activity"
        />
      }>

      {activities.length ?
        <LoadMoreFlatList
          uuidKey='_id'
          numColumns={2}
          data={activities}
          renderItem={renderItem}
          loadMore={loadData}
          loading={!appLoading && loading}
        />
        : <NotFound text={`No activities available\nPlease add a new activity`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card.card1,
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 15,
    width: vw * 38,
    borderRadius: 10,
  },
  featureIcons: {
    width: vw * 13.89, // 50
    height: vh * 6.58, // 50
    borderRadius: (vw * 13.89) / 2,
    resizeMode: 'contain',
  },
});

export default ActivityList;
