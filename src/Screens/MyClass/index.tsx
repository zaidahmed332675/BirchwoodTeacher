import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import dp1 from '../../Assets/icons/dp1.png';
import pDot from '../../Assets/icons/presentDot.png';
import aDot from '../../Assets/icons/absentDot.png';
import pendingDot from '../../Assets/icons/pendingDot.png';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { dummyRecords } from '../../Utils/options';
import { colors } from '../../theme/colors';
import { TouchableOpacity } from 'react-native';
import { VIcon } from '../../Components/VIcon';
import {
  EChatStack,
  EMainStack,
  MainStackParams,
} from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<MainStackParams, 'myClass'>;

const MyClass = ({}: Props) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('studentInfo')}>
      <View
        style={{
          alignSelf: 'flex-start',
        }}>
        <Image
          source={item.isPresent ? pDot : item.isOnLeave ? pendingDot : aDot}
          style={styles.attendanceIcon}
        />
        <Image source={dp1} style={styles.dpStyle} />
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <GlroyBold text={item.label} _style={{ color: colors.text.black }} />
        <GrayMediumText
          text={`Class ${item.class} | Roll no: ${item.rollNumber}`}
          _style={{ fontSize: 12 }}
        />
        <View>
          <GrayMediumText
            text="Attendance: 20 | Absents: 2 | Leaves: 5"
            _style={{ fontSize: 12 }}
          />
          {!item.isPresent && !item.isOnLeave && (
            <TouchableOpacity
              style={{
                marginTop: 10,
                alignSelf: 'flex-start',
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: colors.theme.primary,
              }}>
              <GrayMediumText
                text="Mark Attendance"
                _style={{ fontSize: 10, color: colors.theme.white }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(EMainStack.chatRoutes, {
            screen: EChatStack.createChat,
            params: {
              parentId: item.parentData?.parentId,
              parentName: item.parentData?.parentName,
            },
          });
        }}
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        {/* <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            marginHorizontal: 3,
            color: colors.text.black,
          }}>
          View
        </Text> */}
        <VIcon
          type="Ionicons"
          name="chatbubbles-outline"
          size={20}
          color="black"
        />
        {/* <Image source={edit} style={styles.editIcon} /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Layout customHeader={<CustomHeader title={'My Class'} />}>
      <FlatList
        data={[...dummyRecords]}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
      />
    </Layout>
  );
};

export default MyClass;

const styles = StyleSheet.create({
  card: {},
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
