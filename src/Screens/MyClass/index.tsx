import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, StackScreenProps } from '@react-navigation/stack';
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
import { NotFound } from '../../Components/NotFound';
import { ImageBox } from '../../Components/UploadImage';
import { VIcon } from '../../Components/VIcon';
import { asyncGetClassRoomById } from '../../Stores/actions/class.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren, selectClassRoom } from '../../Stores/slices/class.slice';
import { colors } from '../../Theme/colors';
import { Child } from '../../Types/Class';
import {
  ClassStackParams,
  EChatStack,
  EMainStack
} from '../../Types/NavigationTypes';
import { attendanceEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<ClassStackParams, 'class'>;

const MyClass = ({ }: Props) => {
  const navigation = useNavigation<NavigationProp<ClassStackParams>>();

  const [loading, getClassRoomById] = useLoaderDispatch(asyncGetClassRoomById);
  let classRoom = useAppSelector(selectClassRoom);
  let children = useAppSelector(selectChildren);

  useEffect(() => {
    if (!classRoom._id) {
      getClassRoomById()
    }
  }, [getClassRoomById]);

  if (loading && !classRoom._id) {
    return <DataLoader />;
  }

  const renderItem = ({ item }: { item: Child }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('childInfo', {
        childId: item._id
      })}>
      <View
        style={styles.imageBox}>
        <Image
          source={item.todayAttendance?.status === attendanceEnum.PRESENT ? pDot : item.todayAttendance?.status === attendanceEnum.ABSENT ? aDot : pendingDot}
          style={styles.attendanceIcon}
        />
        <ImageBox
          image={{ uri: item.image }}
          _imageStyle={styles.dpStyle}
        />
      </View>
      <View style={styles.childInfo}>
        <GlroyBold text={`${item.firstName} ${item.lastName}`} _style={{ color: colors.text.black }} />
        <GrayMediumText
          text={`Roll No: ${item.rollNumber}`}
          _style={styles.rollNoText}
        />
        <View>
          {!item.todayAttendance?._id && (
            <View
              style={styles.markAttendanceBtn}>
              <GrayMediumText
                text="Mark Student Check-In"
                _style={styles.markAttendanceBtnText}
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
        style={styles.chatIconBox}>
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
    paddingVertical: vh * 1.97, // 15
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: colors.theme.secondary,
  },
  dpStyle: {
    height: vh * 6.58, // 50
    width: vw * 13.89, // 50
    alignContent: 'flex-start',
    borderRadius: (vw * 13.89) / 2, // 25
    resizeMode: 'contain',
  },
  attendanceIcon: {
    height: vh * 1.32, // 10
    width: vw * 2.78, // 10
    resizeMode: 'contain',
    position: 'absolute',
    top: 3,
    left: 3,
    zIndex: 1,
  },
  imageBox: {
    alignSelf: 'flex-start',
  },
  childInfo: {
    marginLeft: vw * 2.78, // 10
    flex: 1
  },
  rollNoText: {
    fontSize: vh * 1.58, // 12
  },
  markAttendanceBtn: {
    marginTop: vh * 1.32, // 10
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.theme.primary,
  },
  markAttendanceBtnText: {
    fontSize: vh * 1.32, // 10
    color: colors.theme.white
  },
  chatIconBox: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 2.78, // 10
  }
});
