
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import appColors from '../../../../../../theme/appColors';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDataGet } from '../../../../../../api/store/action/categoryAction';
import DropDownPicker from 'react-native-dropdown-picker';
import { useValues } from '../../../../../../utils/context';
import { fontSizes, windowHeight } from '../../../../../../theme/appConstant';
import styles from '../renderCategoryList/styles';

interface RenderItemsProps {
    categoryIndex: number;
    selectedCategory: string | null;
    handleItemPress: (
        index: number,
        categoryName: string,
        id: number,
        serviceType: string
    ) => void;
    selectedService: string;
}

export function RenderCategoryReg({
    handleItemPress,
    selectedService,
    selectedCategory,
}: RenderItemsProps) {
    const { colors } = useTheme();
    const { rtl, isDark, viewRtlStyle } = useValues();
    const dispatch = useDispatch();
    const { categoryData } = useSelector((state: any) => state.serviceCategory);
    const { translateData } = useSelector((state: any) => state.setting);

    const [serviceDataValue, setServiceDataValue] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number | null>(null);
    const [items, setItems] = useState<{ label: string; value: number }[]>([]);

    useEffect(() => {
        dispatch(categoryDataGet());
    }, [dispatch]);

    useEffect(() => {
        if (selectedService && categoryData?.data?.length > 0) {
            const filteredServices = categoryData.data.filter(
                category =>
                    category.service_type?.toLowerCase() ===
                    selectedService.toLowerCase()
            );

            setServiceDataValue(filteredServices);

            const dropdownItems = filteredServices.map((item, index) => ({
                label: item.name,
                value: item.id,
                index: index,
                service_type: item.service_type,
            }));

            setItems(dropdownItems);
        }
    }, [selectedService, categoryData]);

    useEffect(() => {
        if (selectedCategory) {
            const selectedItem = items.find(item => item.label === selectedCategory);
            if (selectedItem) {
                setValue(selectedItem.value);
            }
        }
    }, [selectedCategory, items]);

    const handleValueChange = (itemValue: number | null) => {
        setValue(itemValue);

        const selectedItem = serviceDataValue.find(item => item.id === itemValue);

        if (selectedItem) {
            const itemIndex = serviceDataValue.indexOf(selectedItem);
            handleItemPress(
                itemIndex,
                selectedItem.name,
                selectedItem.id,
                selectedItem.service_type
            );
        }
    };

    return (
        <View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={handleValueChange}
                placeholder={translateData.selectCategory}
                containerStyle={styles.container}
                placeholderStyle={[
                    styles.placeholderStyles,
                    {
                        color: isDark
                            ? appColors.darkText
                            : appColors.secondaryFont,
                    },
                ]}
                style={{
                    backgroundColor: isDark
                        ? appColors.darkThemeSub
                        : appColors.white,
                    borderColor: colors.border,
                    flexDirection: viewRtlStyle,
                    paddingHorizontal: windowHeight(1.9),
                }}
                dropDownContainerStyle={{
                    backgroundColor: isDark ? colors.card : appColors.dropDownColor,
                    borderColor: colors.border,
                }}
                textStyle={[styles.text, { color: colors.text }]}
                labelStyle={[
                    styles.text,
                    { color: isDark ? appColors.white : appColors.black },
                ]}
                listItemLabelStyle={{
                    color: isDark ? appColors.white : appColors.black,
                }}
                tickIconStyle={{
                    tintColor: isDark ? appColors.white : appColors.black,
                }}
                arrowIconStyle={{
                    tintColor: isDark ? appColors.white : appColors.black,
                }}
                textStyle={{
                    textAlign: rtl ? 'right' : 'left',
                    fontSize: fontSizes.FONT4,
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                    nestedScrollEnabled: true,
                }}
                zIndex={3}
                listMode="SCROLLVIEW"
                dropDownDirection="AUTO"
            />
        </View>
    );
}
