import { ActivityIndicator, ActivityIndicatorProps } from "react-native"
import { colors } from "../../theme/colors"
import { ActivityIndicatorComponentPropsInterface } from "react-native-dropdown-picker";

type LoadIndicatorType = {
    style?: {};
    animating?: boolean;
    size?: number | "large" | "small" | undefined;
    color?: string;
}

export const LoadIndicator = ({ style = {}, animating = true, size = "large", color }: LoadIndicatorType) => {
    return <ActivityIndicator
        style={[
            {
                paddingVertical: 10
            },
            style]}
        animating={animating}
        size={size}
        color={color || colors.theme.primary}
    />
}