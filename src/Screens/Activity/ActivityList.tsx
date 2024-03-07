import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layout } from '../../Components/Layout';
// import { ImageBox } from '../../Components/UploadImage';
// import { VIcon } from '../../Components/VIcon';
import {
  ActivityStackParams,
  EActivityStack,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
// import { NewActivityPopup } from '../../Components/NewActivityPopup';
import { CustomHeader } from '../../Components/CustomHeader';
// import { GrayMediumText } from '../../Components/GrayMediumText';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { vh, vw } from '../../Utils/units';
import { featureIcons } from '../../Assets';

type Props = StackScreenProps<ActivityStackParams, 'activityList'>;

const Activities = ({ navigation }: Props) => {
  // const [isPopupVisible, setPopupVisible] = useState(false);
  // const [activities, setActivities] = useState([])

  const activities = [
    {
      _id: 10,
      title: 'Praying',
      icon: featureIcons.assignment,
    },
    {
      _id: 9,
      title: 'Washing',
      icon: featureIcons.assignment,
    },
    {
      _id: 8,
      title: 'Swimming',
      icon: featureIcons.assignment,
    },
    {
      _id: 7,
      title: 'Cheating',
      icon: featureIcons.assignment,
    },
    {
      _id: 6,
      title: 'Painting/Drawing',
      icon: featureIcons.assignment,
    },
    {
      _id: 5,
      title: 'Crafting',
      icon: featureIcons.assignment,
    },
    {
      _id: 4,
      title: 'Reading',
      icon: featureIcons.assignment,
    },
    {
      _id: 3,
      title: 'Writing',
      icon: featureIcons.assignment,
    },
    {
      _id: 2,
      title: 'Exercising',
      icon: featureIcons.assignment,
    },
    {
      _id: 1,
      title: 'Traveling',
      icon: featureIcons.assignment,
    },
  ];

  // const handleNewActivity = (activityName: string) => {
  //   setActivities(prevActivities => [
  //     {
  //       _id: prevActivities.length + 1,
  //       name: activityName,
  //       avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  //     },
  //     ...prevActivities,
  //   ]);
  //   setPopupVisible(false);
  // };

  const renderItem = ({
    item,
  }: {
    item: {
      _id: number;
      title: string;
      icon: any;
    };
  }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(EActivityStack.createActivity, {
            activityId: item._id,
            activityName: item.title,
          })
        }>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.featureIcons} />
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

  // const renderItem1 = ({ item }: any) => (
  //   <TouchableOpacity
  //     style={styles.item}
  //     onPress={() => {
  //       navigation.navigate('activity', {
  //         activityId: item._id,
  //         activityName: item.name,
  //       });
  //     }}>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         flexBasis: '75%',
  //         paddingVertical: 10,
  //       }}>
  //       <View style={styles.avatar}>
  //         <GrayMediumText
  //           text={item.name.slice(0, 1)}
  //           _style={{ color: colors.theme.primary, fontSize: 22 }}
  //         />
  //       </View>
  //       <Text style={styles.title}>{item.name}</Text>
  //     </View>
  //     <TouchableOpacity
  //       style={{
  //         paddingLeft: 10,
  //         flexDirection: 'row',
  //         height: '100%',
  //       }}
  //       onPress={() => {
  //         navigation.navigate(EActivityStack.activity, {
  //           activityId: item._id,
  //           activityName: item.name,
  //         });
  //       }}>
  //       <VIcon
  //         type="Ionicons"
  //         name="ellipsis-vertical"
  //         size={20}
  //         color={colors.theme.greyAlt2}
  //         style={{
  //           alignSelf: 'center',
  //         }}
  //       />
  //     </TouchableOpacity>
  //   </TouchableOpacity>
  // );

  return (
    <Layout
      _styleSheetViewContent={{
        marginTop: 20,
      }}
      customHeader={
        <CustomHeader
          title="Select Activity"
          // isActionEnbl={true}
          // onPress={() => setPopupVisible(true)}
        />
      }>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
      />
      {/* <NewActivityPopup
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onSubmit={handleNewActivity}
      /> */}
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
  // item: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   borderTopWidth: 0.3,
  //   borderBottomWidth: 0.3,
  //   borderColor: colors.theme.greyAlt,
  // },
  // avatar: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: colors.theme.greyAlt,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: colors.theme.secondary,
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: colors.theme.secondary,
  //   marginLeft: 10,
  // },
});

export default Activities;
