import React, { useRef, useState } from 'react';
import {
    ListRenderItem
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LoadIndicator } from '../../Components/LoadIndicator';

interface LoadMoreFlatListProps {
    uuidKey: string;
    data: ArrayLike<any>;
    loading: boolean;
    loadMore: () => void;
    renderItem: ListRenderItem<any>;
}

const LoadMoreFlatList = ({ uuidKey = "_id", data, loading, loadMore, renderItem }: LoadMoreFlatListProps) => {
    const flatListRef = useRef({ listHeight: 0 });
    const [contentSize, setContentSize] = useState(0)

    const isScrollable = contentSize > flatListRef.current.listHeight

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
                paddingBottom: 10,
            }}
            ListFooterComponent={() => data.length && loading ? <LoadIndicator /> : null}
        />
    );
};

export { LoadMoreFlatList };
