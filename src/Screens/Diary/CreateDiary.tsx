import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppDatePicker } from '../../Components/AppDatePicker';
import { AppInput } from '../../Components/AppInput';
import { AppSelect } from '../../Components/AppSelect';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { asyncCreateHomeWork } from '../../Stores/actions/diary.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { CreateHomeWorkPayload } from '../../Types/Diary';
import { DiaryStackParams } from '../../Types/NavigationTypes';
import { HomeWorkTypeEnum } from '../../Utils/options';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<DiaryStackParams, 'createDiary'>;

const CreateDiaryNew = ({ }: Props) => {
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    const [_, createHomeWorks] = useLoaderDispatch(asyncCreateHomeWork, false);

    let children = useAppSelector(selectChildren);

    const {
        control,
        handleSubmit,
        formState: { defaultValues, errors },
        watch,
        resetField
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

    const isChildren = watch("assignee", "CLASS") === "CHILD";

    const onSubmit = useCallback((data: CreateHomeWorkPayload) => {
        if (isChildren) delete data.classroom
        if (!isChildren) delete data.children
        createHomeWorks(data)
    }, [createHomeWorks, isChildren]);

    return (
        <Layout customHeader={<CustomHeader title="Create Home Work" />}>
            <ScrollView>
                <View style={styles.container}>
                    <ScrollView>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please write your thoughts!',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <AppInput
                                    isMultiple={true}
                                    required={true}
                                    label='Title'
                                    textAlignVertical="top"
                                    placeholder={"What's in your mind?...."}
                                    placeholderTextColor={colors.text.altGrey}
                                    value={value}
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
                                required: {
                                    value: true,
                                    message: 'Description is required',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <AppInput
                                    label="Description"
                                    placeholder="Enter description"
                                    value={value}
                                    required
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
                                required: {
                                    value: true,
                                    message: 'Type is required',
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <AppSelect
                                    data={Array.from(Object.keys(HomeWorkTypeEnum ?? {}), key => ({
                                        title: key.slice(0, 1) + key.slice(1).toLowerCase(),
                                        value: key,
                                    }))}
                                    label="Home Work Type"
                                    placeholder='Please select'
                                    onSelect={item => onChange(item.value)}
                                />
                            )}
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
                                required: {
                                    value: true,
                                    message: 'Assign to is required',
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <AppSelect
                                    defaultValue={defaultValues?.assignee}
                                    data={Array.from(Object.keys({ CLASS: "CLASS", CHILD: "CHILD" } ?? {}), key => ({
                                        title: key.slice(0, 1) + key.slice(1).toLowerCase(),
                                        value: key,
                                    }))}
                                    label="Assign To"
                                    placeholder='Please select'
                                    onSelect={item => {
                                        if (item.value === "CLASS") resetField('children')
                                        onChange(item.value)
                                    }}
                                />
                            )}
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
                                        required: {
                                            value: true,
                                            message: 'Child is required',
                                        },
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
                                required: {
                                    value: true,
                                    message: 'Due Date is required',
                                },
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
                    </ScrollView>
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
