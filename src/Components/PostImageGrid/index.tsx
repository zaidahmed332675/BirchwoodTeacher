import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { isImage } from '../../Utils/options';
import { AppVideoPlayer } from '../ActivityPost/AppVideoPlayer';
import { ImageBox } from '../UploadImage';

interface PostMediaGridProps {
    _imageStyle: ViewStyle;
    media: string[];
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PostMediaGrid: React.FC<PostMediaGridProps> = ({ media, _imageStyle }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openSlider = (index: number) => {
        setSelectedIndex(index);
    };

    const closeSlider = () => {
        setSelectedIndex(null);
    };

    const renderMedia = (
        item: string,
        idx: number,
        containerStyle: ViewStyle
    ): JSX.Element => {
        const mediaElement = isImage(item) ? (
            <ImageBox
                key={`${media}_${idx}`}
                image={{ uri: item }}
                _imageStyle={[_imageStyle]}
                _containerStyle={[containerStyle]}
            />
        ) : (
            <AppVideoPlayer key={`${media}_${idx}`} index={idx} media={item} />
        );

        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => openSlider(idx)} key={`${media}_${idx}`}>
                {mediaElement}
            </TouchableOpacity>
        );
    };

    const renderGrid = () => {
        console.log('asdasdasdasds')
        const count = media.length;
        console.log(count, 'count')

        if (count === 1) {
            return renderMedia(media[0], 0, styles.full);
        }

        if (count === 2) {
            return (
                <View style={styles.row}>
                    {media.map((item, idx) => renderMedia(item, idx, styles.half))}
                </View>
            );
        }

        if (count === 3) {
            return (
                <View style={styles.grid3}>
                    <View style={styles.grid3Left}>
                        {renderMedia(media[0], 0, styles.grid3LeftItem)}
                    </View>
                    <View style={styles.grid3Right}>
                        {renderMedia(media[1], 1, styles.grid3RightItem)}
                        {renderMedia(media[2], 2, styles.grid3RightItem)}
                    </View>
                </View>
            );
        }

        if (count === 4) {
            return (
                <View style={styles.grid4}>
                    {media.map((item, idx) => renderMedia(item, idx, styles.grid4Item))}
                </View>
            );
        }

        if (count >= 5) {
            return (
                <View style={styles.grid5}>
                    <View style={styles.grid5Top}>
                        {renderMedia(media[0], 0, styles.grid5TopItem)}
                        {renderMedia(media[1], 1, styles.grid5TopItem)}
                    </View>
                    <View style={styles.grid5Bottom}>
                        {renderMedia(media[2], 2, styles.grid5BottomItem)}
                        {renderMedia(media[3], 3, styles.grid5BottomItem)}
                        <View style={styles.grid5BottomItem}>
                            {renderMedia(media[4], 4, styles.grid5BottomItem)}
                            {count > 5 && (
                                <TouchableOpacity style={styles.overlay} onPress={() => openSlider(4)}>
                                    <Text style={styles.overlayText}>+{count - 5}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {renderGrid()}

            <Modal visible={selectedIndex !== null} transparent={false}>
                <FlatList
                    horizontal
                    pagingEnabled
                    initialScrollIndex={selectedIndex ?? 0}
                    getItemLayout={(_, index) => ({
                        length: screenWidth,
                        offset: screenWidth * index,
                        index,
                    })}
                    data={media.filter(isImage)}
                    renderItem={({ item }) => (
                        <ImageBox
                            image={{ uri: item }}
                            _imageStyle={{
                                width: screenWidth,
                                height: screenHeight,
                                borderRadius: 0,
                                resizeMode: 'contain',
                            }}
                        />
                    )}
                    keyExtractor={(_, idx) => `slider_${idx}`}
                />
                <TouchableOpacity onPress={closeSlider} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    full: {
        height: 200, // 1 Image
        width: '100%',
    },
    row: {
        height: 200, // 2 Images
        flexDirection: 'row',
        gap: 5,
    },
    half: {
        flex: 1,
    },
    grid3: {
        height: 200, // 3 Images
        flexDirection: 'row',
        gap: 5,
    },
    grid3Left: {
        flex: 1,
    },
    grid3Right: {
        flex: 1,
        gap: 5
    },
    grid3LeftItem: {
        flex: 1,
    },
    grid3RightItem: {
        flex: 1,
    },
    grid4: {
        height: 200, // 4 Images
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    grid4Item: {
        width: '49%',
        height: '49%',
    },
    grid5: {
        height: 300,
    },
    grid5Top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        height: '70%',
    },
    grid5Bottom: {
        flexDirection: 'row',
        height: '30%',
        marginTop: 5,
        gap: 5,
    },
    grid5TopItem: {
        flex: 1,
    },
    grid5BottomItem: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    fullscreenImage: {
        width: screenWidth,
        height: '100%',
        backgroundColor: '#000',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 6,
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
});

export { PostMediaGrid };
