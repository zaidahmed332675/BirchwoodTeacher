import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import aDot from '../../Assets/icons/absentDot.png';
import pendingDot from '../../Assets/icons/pendingDot.png';
import pDot from '../../Assets/icons/presentDot.png';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { VIcon } from '../../Components/VIcon';
import { asyncGetClassRoomById } from '../../Stores/actions/class.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren, selectClassRoom } from '../../Stores/slices/class.slice';
import { Child } from '../../Types/Class';
import {
  ClassStackParams,
  EChatStack,
  EMainStack
} from '../../Types/NavigationTypes';
import { colors } from '../../Theme/colors';
import { attendanceEnum } from '../../Utils/options';
import { NotFound } from '../../Components/NotFound';

type Props = StackScreenProps<ClassStackParams, 'class'>;

const MyClass = ({ }: Props) => {
  const navigation = useNavigation<NavigationProp<ClassStackParams>>();
  const [loading, getClassRoomById] = useLoaderDispatch(asyncGetClassRoomById);
  let classRoom = useAppSelector(selectClassRoom);
  let children = useAppSelector(selectChildren);

  useEffect(() => {
    if (!children.length) {
      getClassRoomById()
    }
  }, [getClassRoomById]);

  if (loading) {
    return <DataLoader />;
  }

  const renderItem = ({ item }: { item: Child }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('childInfo', {
        childId: item._id
      })}>
      <View
        style={{
          alignSelf: 'flex-start',
        }}>
        <Image
          source={item.checkIn ? pDot : item.todayAttendance?.status === attendanceEnum.LEAVE ? pendingDot : aDot}
          style={styles.attendanceIcon}
        />
        <ImageBox
          image={{ uri: item.image }}
          _imageStyle={styles.dpStyle}
        />
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <GlroyBold text={`${item.firstName} ${item.lastName}`} _style={{ color: colors.text.black }} />
        <GrayMediumText
          text={`Roll No: ${item.rollNumber}`}
          _style={{ fontSize: 12 }}
        />
        <View>
          {/* <GrayMediumText
            text="Attendance: 20 | Absents: 2 | Leaves: 5"
            _style={{ fontSize: 12 }}
          /> */}
          {item.checkIn && !(item.todayAttendance?.status === attendanceEnum.LEAVE) && (
            <View
              style={{
                marginTop: 10,
                alignSelf: 'flex-start',
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: colors.theme.primary,
              }}>
              <GrayMediumText
                text="Mark Student Check-In"
                _style={{ fontSize: 10, color: colors.theme.white }}
              />
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(EMainStack.chatRoutes, {
            screen: EChatStack.createChat,
            params: {
              childId: item._id,
              chatRoomId: item.chats?._id
            },
          });
        }}
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <VIcon
          type="Ionicons"
          name="chatbubbles-outline"
          size={20}
          color="black"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Layout customHeader={<CustomHeader title={`${classRoom.classroomName} - Grade ${classRoom.classroomGrade} (${classRoom.classroomBatch})`} />}>
      {children.length ? <FlatList
        data={[...children]}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      /> : <NotFound text={`No children available`} />}
    </Layout>
  );
};

export default MyClass;

const styles = StyleSheet.create({
  item: {
    borderRadius: 2,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: colors.theme.secondary,
  },
  dpStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    alignContent: 'flex-start',
  },
  attendanceIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    position: 'absolute',
    top: 3,
    left: 3,
    zIndex: 1,
  },
  editIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
});
