import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dp1 from '../../Assets/icons/dp1.png';
import ActivityPost from '../../Components/ActivityPost';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import Layout from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import {
  ActivityStackParams,
  EActivityStack,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { dummyRecords } from '../../Utils/options';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<ActivityStackParams, 'activity'>;

const Activity = ({ navigation, route }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  const searchModalRef = useRef();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState<Record<string, any>>();

  const [items] = useState([...dummyRecords]);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index > 1) {
      setOpen(true);
    }
  };

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item?.value) {
      setStudent(item);
    }
  }, [open]);

  return (
    <Layout
      customHeader={
        <CustomHeader
          title={route.params.activityName}
          isActionEnbl={true}
          onPress={() => {
            navigation.navigate(EActivityStack.createActivity);
          }}
        />
      }>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={tabIndex}
          roundCorner={true}
          option1={'Class'}
          option2={'Child'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.primary}
        />
      </View>
      {tabIndex > 1 && student && (
        <View
          style={{
            borderColor: colors.theme.secondary,
            borderRadius: 2,
            padding: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={dp1}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              resizeMode: 'contain',
            }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <GlroyBold
              text={student.label}
              _style={{ color: colors.text.black }}
            />
            <GrayMediumText
              text={`Class ${'X1-B'} | Roll no: ${student.rollNumber}`}
              _style={{ fontSize: 12 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setOpen(o => !o)}
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginHorizontal: 3,
                color: colors.text.black,
              }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SearchModal
        open={open}
        setOpen={setOpen}
        items={items}
        ref={searchModalRef}
        _style={{
          display: 'none',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ActivityPost />
        <ActivityPost />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default Activity;
