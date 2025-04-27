import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { VIcon } from '../VIcon';

type MenuOptionItem = {
    label: string;
    onPress: () => void;
    color?: string;
    icon?: {
        type: string;
        name: string;
        size?: number;
        color?: string;
    };
};

type AppMenuProps = {
    options: MenuOptionItem[];
    iconType?: string;
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
};

export const AppMenu = ({
    options,
    iconType = 'Feather',
    iconName = 'more-horizontal',
    iconSize = 20,
    iconColor = '#000',
}: AppMenuProps) => {
    return (
        <Menu>
            <MenuTrigger>
                <VIcon
                    type={iconType}
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: styles.optionsContainer }}>
                {options.map((option, index) => (
                    <MenuOption key={index} onSelect={option.onPress}>
                        <View style={styles.optionRow}>
                            {option.icon && (
                                <VIcon
                                    type={option.icon.type}
                                    name={option.icon.name}
                                    size={option.icon.size || 16}
                                    color={option.icon.color || option.color || '#333'}
                                    style={styles.optionIcon}
                                />
                            )}
                            <Text style={[styles.optionText, { color: option.color || '#333' }]}>
                                {option.label}
                            </Text>
                        </View>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        paddingVertical: 4,
        minWidth: 140,
        borderRadius: 6,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    optionIcon: {
        marginRight: 8,
    },
    optionText: {
        fontSize: 14,
    },
});
