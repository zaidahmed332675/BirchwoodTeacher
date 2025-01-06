import React, { useRef, useState } from 'react';
import {
    ListRenderItem
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LoadIndicator } from '../../Components/LoadIndicator';
import { RefreshControl } from 'react-native';

interface LoadMoreFlatListProps {
    uuidKey: string;
    data: ArrayLike<any>;
    loading: boolean;
    loadMore: (isFresh?: boolean) => void;
    renderItem: ListRenderItem<any>;
}

const LoadMoreFlatList = ({ uuidKey = "_id", data, loading, loadMore, renderItem }: LoadMoreFlatListProps) => {
    const flatListRef = useRef({ listHeight: 0 });
    const [contentSize, setContentSize] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    const isScrollable = contentSize > flatListRef.current.listHeight

    const onRefresh = () => {
        setRefreshing(true);
        loadMore(true)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <FlatList
            data={data}
            keyExtractor={item => item[uuidKey]}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            renderItem={renderItem}
            onEndReached={({ distanceFromEnd }) => {
                if (isScrollable && distanceFromEnd >= 0 && !!flatListRef.current.listHeight) loadMore()
            }}
            onContentSizeChange={(_, height) => {
                if (flatListRef.current.listHeight == 0) {
                    setContentSize(height)
                }
            }}
            onLayout={(e) => {
                flatListRef.current = { listHeight: e.nativeEvent.layout.height }
            }}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 10,
            }}
            ListFooterComponent={() => data.length && loading ? <LoadIndicator /> : null}
            refreshControl={
                <RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
};

export { LoadMoreFlatList };
