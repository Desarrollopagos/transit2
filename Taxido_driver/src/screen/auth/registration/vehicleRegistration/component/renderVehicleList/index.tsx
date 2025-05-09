import React, { useEffect, useState } from 'react'
import {  View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import appColors from '../../../../../../theme/appColors'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { vehicleTypeDataGet } from '../../../../../../api/store/action/vehicleTypeAction'
import { useValues } from '../../../../../../utils/context'
import { fontSizes, windowHeight } from '../../../../../../theme/appConstant'
import styles from './styles'

interface RenderItemsProps {
  vehicleIndex?: number
  handleItemPress: (index: number, name: string, itemid?: number) => void
  selectedVehicle: string
  selectedCategory?: string
  serviceId?: number
  categoryId?: number
  selectedItemIndex?: number
}

export function RenderVehicleList({
  handleItemPress,
  serviceId,
  categoryId,
  selectedVehicle,
}: RenderItemsProps) {
  const { vehicleTypedata } = useSelector((state: any) => state.vehicleType)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { rtl, isDark, viewRtlStyle } = useValues()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)
  const [items, setItems] = useState<any[]>([])
  const { translateData } = useSelector(state => state.setting)
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getService()
  }, [serviceId, categoryId])


  useEffect(() => {
    if (vehicleTypedata && vehicleTypedata.data && vehicleTypedata.data.length > 0) {
      setLoading(false);
      const dropdownItems = vehicleTypedata.data.map(vehicle => ({
        label: vehicle.name,
        value: vehicle.id,
      }));
      setItems(dropdownItems);
      if (selectedVehicle) {
        setValue(selectedVehicle);
      }
    } else {
    }
  }, [vehicleTypedata]);

  const getService = () => {
    dispatch(vehicleTypeDataGet({ service_id: serviceId, service_category_id: categoryId }));
  };

  useEffect(() => {
    const safeCategoryId = categoryId ?? 0;

    if (serviceId && safeCategoryId !== undefined) {
      dispatch(vehicleTypeDataGet({
        service_id: serviceId,
        service_category_id: safeCategoryId,
      }));
    }
  }, [serviceId, categoryId, dispatch]);

  const handleValueChange = (itemValue: string | number) => {
    setValue(itemValue)
    const selectedItem = vehicleTypedata.data.find(
      item => item.id === itemValue
    )
    if (selectedItem) {
      const selectedIndex = vehicleTypedata.data.findIndex(
        item => item.id === itemValue
      )
      handleItemPress(selectedIndex, selectedItem.name, selectedItem.id)
    }
  }

  useEffect(() => {
    const safeCategoryId = categoryId ?? 0;

    if (serviceId && safeCategoryId !== undefined) {
      dispatch(
        vehicleTypeDataGet({
          service_id: serviceId,
          service_category_id: safeCategoryId,
        })
      );
    } else {
    }
  }, [serviceId, categoryId, dispatch]);



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
        zIndex={2}
        listMode="SCROLLVIEW"
        dropDownDirection="AUTO"
      />
    </View>
  )
}
