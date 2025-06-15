import { format, getMonth, getYear } from 'date-fns';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { asyncUserMonthlyAttendance } from '../../Stores/actions/user.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectUserAttendance } from '../../Stores/slices/user.slice';
import { appShadow, colors } from '../../Theme/colors';
import { attendanceEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';
import { AttendanceCard } from '../AttendanceCard';
import { GrayMediumText } from '../GrayMediumText';

const AttendanceSummary = () => {
    const [attendanceLoader, getUserMonthlyAttendnace] = useLoaderDispatch(asyncUserMonthlyAttendance);
    const monthlyWserAttendance = useAppSelector(selectUserAttendance(format(new Date(), 'yyyy-M')));

    const loadData = () => {
        getUserMonthlyAttendnace({
            month: getMonth(new Date()) + 1,
            year: getYear(new Date()),
        });
    }

    useEffect(() => {
        loadData()
    }, [getUserMonthlyAttendnace]);

    return (
        <View style={[styles.card, styles.monthlyAttendanceCard, { justifyContent: 'center' }]}>
            <View>
                <GrayMediumText
                    text="Attendance"
                    _style={{
                        color: colors.theme.black,
                        fontSize: vh * 2.11,
                        marginHorizontal: vw * 4.17,
                    }}
                />
                <GrayMediumText
                    text="Current Month"
                    _style={{
                        color: colors.theme.greyAlt2,
                        fontSize: vh * 1.7,
                        marginBottom: vh * 1.97,
                        marginHorizontal: vw * 4.17,
                    }}
                />
            </View>
            <View style={styles.stats}>
                <AttendanceCard
                    type={attendanceEnum.PRESENT}
                    title="Present"
                    count={monthlyWserAttendance?.stats?.PRESENT ?? 0o0}
                />
                <AttendanceCard
                    type={attendanceEnum.ABSENT}
                    title="Absent"
                    count={monthlyWserAttendance?.stats?.ABSENT ?? 0o0}
                />
                <AttendanceCard
                    type={attendanceEnum.LEAVE}
                    title="Leave"
                    count={monthlyWserAttendance?.stats?.LEAVE ?? 0o0}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 20,
        marginBottom: vh * 1.32, // 10
        ...appShadow(4),
    },
    monthlyAttendanceCard: {
        flex: 1,
    },
    stats: {
        gap: 10
    }
});

export default AttendanceSummary;
