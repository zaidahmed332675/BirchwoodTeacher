import { useAnimations } from "@react-native-media-console/reanimated";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import VideoPlayer from "react-native-media-console";
import Orientation from "react-native-orientation-locker";
import { getImagePath } from "../../Service/axios";
import { vh } from "../../Utils/units";

interface VideoPlayerProps {
    index: number,
    media: string,
    isNewlyPicked?: boolean;
}

export const AppVideoPlayer = ({ index, media, isNewlyPicked }: VideoPlayerProps) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        return () => {
            Orientation.unlockAllOrientations();
            StatusBar.setHidden(false);
        };
    }, []);


    const handleEnterFullscreen = () => {
        setIsFullScreen(true);
        Orientation.lockToLandscape();
        StatusBar.setHidden(true);
    };

    const handleExitFullscreen = () => {
        setIsFullScreen(false);
        Orientation.lockToPortrait();
        StatusBar.setHidden(false);
    };

    return (
        <View style={[styles.container, isFullScreen && styles.fullScreenContainer]}>
            <VideoPlayer
                key={`${media}_${index}`}
                toggleResizeModeOnFullscreen={true}
                isFullscreen={isFullScreen}
                useAnimations={useAnimations}
                disableBack
                paused={paused}
                repeat={false}
                poster={isNewlyPicked ? media : getImagePath(media)}
                source={{
                    uri: isNewlyPicked ? media : getImagePath(media),
                }}
                posterResizeMode={isFullScreen ? "contain" : "cover"}
                resizeMode={isFullScreen ? "contain" : "cover"}
                onEnd={() => setPaused(true)}
                onPlay={() => setPaused(false)}
                onEnterFullscreen={handleEnterFullscreen}
                onExitFullscreen={handleExitFullscreen}
                containerStyle={{
                    borderRadius: isFullScreen ? 0 : 10,
                    width: isFullScreen ? "100%" : "100%",
                    height: isFullScreen ? "100%" : vh * 26.32,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: vh * 26.32,
    },
    fullScreenContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
    },
});