import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import appColors from '../../../../../../theme/appColors';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDataGet } from '../../../../../../api/store/action/categoryAction';
import DropDownPicker from 'react-native-dropdown-picker';
import { useValues } from '../../../../../../utils/context';
import { windowHeight } from '../../../../../../theme/appConstant';
import styles from './styles';

interface RenderItemsProps {
  categoryIndex: number;
  selectedCategory: string;
  categoryId: number;
  handleItemPress: (
    index: number,
    categoryName: string,
    categoryId: number,
    categorySlug: string
  ) => void;
  selectedService: string;
}

export function RenderCategoryList({
  handleItemPress,
  selectedService,
  selectedCategory,
  categoryId,
}: RenderItemsProps) {

  const { colors } = useTheme();
  const { isDark, viewRtlStyle } = useValues();
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state: any) => state.serviceCategory);
  const { translateData } = useSelector((state: any) => state.setting);
  const [serviceDataValue, setServiceDataValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [items, setItems] = useState([]);

console.log('categoryData',categoryData)
  useEffect(() => {
    dispatch(categoryDataGet());
  }, []);

  useEffect(() => {
    if (categoryData?.data?.length > 0 && selectedService) {
      // Get categories matching the service_id
      const filteredServices = categoryData.data.filter(
        category => category.service_id === Number(selectedService)
      );

      setServiceDataValue(filteredServices);

      // Set dropdown items
      const dropdownItems = filteredServices.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setItems(dropdownItems);

      // Set the default selected value (if present in the list)
      const selectedMatch = filteredServices.find(item => item.id === categoryId);
      setValue(selectedMatch ? selectedMatch.id : null);
    }
  }, [selectedService, categoryData, categoryId]);


  const handleValueChange = (itemValue: number) => {
    setValue(itemValue);

    const selectedItem = serviceDataValue.find(item => item.id === itemValue);
    if (selectedItem) {
      handleItemPress(
        serviceDataValue.indexOf(selectedItem),
        selectedItem.name,
        selectedItem.id,
        selectedItem.slug
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
          { color: isDark ? appColors.darkText : appColors.secondaryFont },
        ]}
        style={{
          backgroundColor: isDark ? appColors.darkThemeSub : appColors.white,
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
      />
    </View>
  );
}


