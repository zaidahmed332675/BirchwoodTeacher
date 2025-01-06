import React, { useRef, useState } from 'react';
import {
    FlatList,
    ListRenderItem,
    RefreshControl
} from 'react-native';
import { LoadIndicator } from '../../Components/LoadIndicator';

interface LoadMoreFlatListProps {
    uuidKey: string;
    data: ArrayLike<any>;
    loading: boolean;
    loadMore: (isFresh?: boolean) => void;
    renderItem: ListRenderItem<any>;
    numColumns?: number;
}

const LoadMoreFlatList = ({ uuidKey = "_id", data, loading, loadMore, renderItem, numColumns = 1 }: LoadMoreFlatListProps) => {
    const [layoutSize, setLayoutSize] = useState(0)
    const [contentSize, setContentSize] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    const isScrollable = contentSize > layoutSize

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
            numColumns={numColumns}
            keyExtractor={item => item[uuidKey].toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            onEndReached={({ distanceFromEnd }) => {
                if (isScrollable && distanceFromEnd >= 0 && !!layoutSize) loadMore()
            }}
            onContentSizeChange={(_, height) => {
                if (layoutSize == 0) {
                    setContentSize(height)
                }
            }}
            onLayout={(e) => {
                setLayoutSize(e.nativeEvent.layout.height)
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
