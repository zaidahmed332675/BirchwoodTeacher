import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { AppBottomSheet } from '../../Components/BottomSheet';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { Layout } from '../../Components/Layout';
import { RichTextEditor } from '../../Components/RichTextEditor';
import { SearchModal } from '../../Components/SearchModal';
import { ImageBox } from '../../Components/UploadImage';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncCreatePost } from '../../Stores/actions/post.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<PostStackParams, 'createPost'>;

const CreatePostModalContent = ({
  audience,
  setAudience,
  students,
  setStudents,
}) => {
  const searchModalRef = useRef();

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  let children = useAppSelector(selectChildren);

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item) {
      setStudents(item);
    }
  }, [isSearchModalOpen, setStudents]);

  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          marginVertical: 20,
          color: colors.text.white,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Choose Audience
      </Text>
      <View>
        <CheckBox
          checked={audience === 0}
          title="Class"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            marginVertical: 8,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => {
            setAudience(0);
            setStudents();
          }}
        />
        <CheckBox
          checked={audience === 1}
          title="Child"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            marginVertical: 8,
            padding: 0,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => setAudience(1)}
        />
      </View>
      {audience === 1 && (
        <SearchModal
          isMultiple={true}
          open={isSearchModalOpen}
          setOpen={setSearchModalOpen}
          children={children.map(child => {
            let { parent, ...childData } = child
            return ({
              label: `${child.firstName} ${child.lastName}`,
              value: child._id,
              parentData: parent,
              ...childData,
            })
          })}
          selectedItems={students}
          ref={searchModalRef}
          multipleText={`${students?.length} ${students?.length > 1 ? 'children' : 'child'
            } have been selected`}
        />
      )}
    </View>
  );
};

const CreatePost = ({ navigation, route }: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const textEditorRef = useRef<{ getPostDataToSend: () => Promise<{ content: string, media: Asset | undefined }> } | null>(null);
  let { activityId } = route?.params

  let [audience, setAudience] = useState(0);
  const [students, setStudents] = useState<any>();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const dispatch = useAppDispatch()
  const [_, createPost] = useLoaderDispatch(asyncCreatePost);
  const profile = useAppSelector(selectUserProfile)

  const handleSend = async () => {
    let data = await textEditorRef.current?.getPostDataToSend()

    const formData = new FormData();
    formData.append('content', data?.content);
    formData.append('activity', activityId);

    formData.append('type', audience === 0 ? 'CLASS' : 'CHILD');

    formData.append('image', {
      uri: data?.media?.uri,
      type: data?.media?.type,
      name: data?.media?.fileName,
    });

    if (audience === 1) {
      if (students?.length) {
        formData.append('children', JSON.stringify(students))
      }
      else dispatch(asyncShowError('Please select atleast one child!'))
    } else formData.append('classroom', '6630e5f01364cb7fd294281c');

    let res = await createPost(formData)
    if (res.status) {
      navigation.navigate(EPostStack.posts)
    }
  }

  return (
    <Layout customHeader={<CustomHeader title="Create Post" />}>
      <View style={styles.container}>
        <ImageBox image={{ uri: profile.image }} _imageStyle={styles.profilePic} />
        <View>
          <Text style={styles.userName}>{`${profile.firstName} ${profile.lastName}`}</Text>
          <AppButton
            title={
              audience === 0
                ? 'Class'
                : students?.length > 1
                  ? 'Children'
                  : 'Child'
            }
            bordered
            suffix
            btnStyle={{
              alignSelf: 'flex-start',
              marginTop: 5,
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 0,
            }}
            onPress={() => {
              setSheetOpen(true);
              sheetRef.current?.present();
            }}
          />
        </View>
      </View>
      <RichTextEditor ref={textEditorRef} />
      <AppBottomSheet
        ref={sheetRef}
        snapPoints={['50%', '75%']}
        enableDismissOnClose
        onDismiss={() => {
          setSheetOpen(false);
        }}
        _handleStyle={{
          backgroundColor: colors.theme.primary,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.primary,
        }}>
        <CreatePostModalContent
          audience={audience}
          setAudience={setAudience}
          students={students}
          setStudents={setStudents}
        />
      </AppBottomSheet>
      <AppButton
        title={isSheetOpen ? 'Done' : 'Post Now'}
        onPress={() => {
          if (isSheetOpen) {
            sheetRef.current?.dismiss();
            setSheetOpen(false);
          } else {
            handleSend();
          }
        }}
        btnStyle={{
          width: '95%',
          height: 50,
          marginTop: 0,
          backgroundColor: colors.theme.secondary,
          borderWidth: 0,
          marginVertical: 10,
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: colors.theme.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: 12,
    color: '#888',
  },
  contentContainer: {
    backgroundColor: 'transparent',
  },
});

export default CreatePost;
