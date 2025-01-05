import { StackScreenProps } from '@react-navigation/stack';
import lodash, { isArray } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppDatePicker } from '../../Components/AppDatePicker';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { DropDown } from '../../Components/DropDown';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncCreateHomeWork, asyncUpdateHomeWork } from '../../Stores/actions/diary.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectHomeWorkById } from '../../Stores/slices/diary.slice';
import { CreateHomeWorkPayload } from '../../Types/Diary';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { HomeWorkTypeEnum } from '../../Utils/options';
import { colors } from '../../Theme/colors';
import { isEqual } from 'date-fns';
import { selectUserProfile } from '../../Stores/slices/user.slice';

type Props = StackScreenProps<DiaryStackParams, 'createDiary'>;

const CreateDiaryNew = ({ navigation, route }: Props) => {
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    const { homeWorkId } = route?.params || {}
    const isEdit = !!homeWorkId

    const [_, createHomeWorks] = useLoaderDispatch(asyncCreateHomeWork);
    const [__, updateHomeWorks] = useLoaderDispatch(asyncUpdateHomeWork);

    const children = useAppSelector(selectChildren);
    const homeWork = useAppSelector(selectHomeWorkById(homeWorkId))
    const profile = useAppSelector(selectUserProfile)

    const dispatch = useAppDispatch()

    const {
        control,
        register,
        handleSubmit,
        formState,
        watch,
        resetField,
        setValue,
    } = useForm<any>({
        defaultValues: {
            title: '',
            description: '',
            assignee: '',
            classroom: '',
            children: [],
            type: '',
            dueDate: '',
        },
    });

    const { errors } = formState;
    const isChildren = watch("assignee", "CLASS") === "CHILD";

    const onSubmit = useCallback(async (data: CreateHomeWorkPayload) => {
        if (isChildren) delete data.classroom
        if (!isChildren) delete data.children

        let body = {} as typeof data

        if (data.title !== homeWork?.title) {
            body.title = data.title;
        }
        if (data.description !== homeWork?.description) {
            body.description = data.description;
        }
        if (data.assignee !== homeWork?.assignee) {
            body.assignee = data.assignee;
        }
        if (!isChildren && data.classroom !== homeWork?.classroom) {
            body.classroom = data.classroom;
        }
        if (isChildren && lodash.xor(data.children, homeWork?.children).length) {
            body.children = data.children;
        }
        if (data.type !== homeWork?.type) {
            body.type = data.type;
        }

        if (!isEqual(new Date(data.dueDate), new Date(homeWork?.dueDate))) {
            body.dueDate = data.dueDate;
        }

        if (Object.keys(body).length === 0) {
            return dispatch(asyncShowError('No changes have been made!'));
        } else {
            let res = isEdit ? await updateHomeWorks({ homeWorkId, data }) : await createHomeWorks(data)
            if (res.status) navigation.navigate(EDiaryStack.diary)
        }
    }, [createHomeWorks, isChildren]);

    useEffect(() => {
        register('classroom');
        if (isEdit) {
            setValue('title', homeWork.title)
            setValue('description', homeWork.description)
            setValue('assignee', homeWork.assignee);
            setValue('classroom', homeWork.classroom)
            setValue('children', homeWork.assignee === 'CHILD' && homeWork.children?.length ? isArray(homeWork.children) ? homeWork.children : [homeWork.children] : [])
            setValue('type', homeWork.type);
            setValue('dueDate', new Date(homeWork.dueDate))
        }
    }, [homeWorkId])

    return (
        <Layout customHeader={<CustomHeader title={`${isEdit ? 'Edit' : 'Create'} Work Diary`} />}>
            <ScrollView>
                <View style={styles.container}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <AppInput
                                label="Title"
                                placeholder="Enter title"
                                value={value}
                                required
                                onChange={onChange}
                            />
                        )}
                    />

                    {errors.title?.message && (
                        <GrayMediumText
                            text={errors.title.message}
                            _style={{ color: colors.theme.lightRed }}
                        />
                    )}

                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: 'Description is required',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <AppInput
                                isMultiple={true}
                                required={true}
                                label='Description'
                                textAlignVertical="top"
                                placeholder={"What's in your mind?...."}
                                placeholderTextColor={colors.text.altGrey}
                                value={value}
                                onChange={onChange}
                            />

                        )}
                    />

                    {errors.description?.message && (
                        <GrayMediumText
                            text={errors.description.message}
                            _style={{ color: colors.theme.lightRed }}
                        />
                    )}

                    <Controller
                        name="type"
                        control={control}
                        rules={{
                            required: 'Type is required',
                        }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DropDown
                                    label="Home Work Type"
                                    placeholder='Please select'
                                    required={true}
                                    items={Array.from(Object.keys(HomeWorkTypeEnum ?? {}), key => ({
                                        label: key.slice(0, 1) + key.slice(1).toLowerCase(),
                                        value: key,
                                    }))}
                                    value={value}
                                    setValue={_ => onChange(_(value))}
                                    multiple={false}
                                    open={true}
                                    setOpen={() => { }}
                                />
                            )
                        }}
                    />

                    {errors.type?.message && (
                        <GrayMediumText
                            _style={{ color: colors.theme.lightRed }}
                            text={errors.type.message}
                        />
                    )}

                    <Controller
                        name="assignee"
                        control={control}
                        rules={{
                            required: 'Assign to is required',
                        }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DropDown
                                    label="Assign To"
                                    placeholder='Please select'
                                    required={true}
                                    items={Array.from(Object.keys({ CLASS: "CLASS", CHILD: "CHILD" }), key => ({
                                        label: lodash.capitalize(key),
                                        value: key,
                                    }))}
                                    value={value}
                                    setValue={_ => {
                                        if (_(value) === "CLASS") {
                                            setValue('classroom', profile?.classroom?._id)
                                            resetField('children')
                                        }
                                        onChange(_(value))
                                    }}
                                    multiple={false}
                                    open={true}
                                    setOpen={() => { }}
                                />
                            )
                        }}
                    />

                    {errors.assignee?.message && (
                        <GrayMediumText
                            _style={{ color: colors.theme.lightRed }}
                            text={errors.assignee.message}
                        />
                    )}

                    {isChildren &&
                        <>
                            <Controller
                                name="children"
                                control={control}
                                rules={{
                                    required: 'Child is required',
                                }}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <SearchModal
                                            label="Select Children"
                                            placeholder="Please select"
                                            value={value?.length ? value : []}
                                            onChange={(callback: any) => onChange(callback(value))}
                                            isMultiple={true}
                                            required={true}
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
                                            _style={{
                                                borderColor: colors.input.background,
                                                backgroundColor: colors.input.background,
                                                borderRadius: 10,
                                            }}
                                            multipleText={`${value?.length} ${value?.length > 1 ? 'children' : 'child'
                                                } have been selected`}
                                        />
                                    )
                                }}
                            />

                            {errors.children?.message && (
                                <GrayMediumText
                                    _style={{ color: colors.theme.lightRed }}
                                    text={errors.children.message}
                                />
                            )}
                        </>
                    }

                    <Controller
                        name="dueDate"
                        control={control}
                        rules={{
                            required: 'Due Date is required',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <AppDatePicker
                                label="Due Date"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />

                    {errors.dueDate?.message && (
                        <GrayMediumText
                            _style={{ color: colors.theme.lightRed }}
                            text={errors.dueDate.message}
                        />
                    )}

                    <AppButton
                        title={'Submit'}
                        btnStyle={{
                            marginVertical: 10,
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    profileGrid: {
        marginBottom: 24,
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 13,
        width: '100%',
    },
    profilePhoto: {
        borderWidth: 3,
        borderColor: colors.theme.primary,
    },
});

export default CreateDiaryNew
