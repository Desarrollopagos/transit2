import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import styles from '../renderVehicleList/styles';
import appColors from '../../../../../../theme/appColors';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { serviceDataGet } from '../../../../../../api/store/action/serviceAction';
import { useValues } from '../../../../../../utils/context';

interface RenderItemsProps {
  selectedItemIndex: number | null
  handleItemPress: (
    index: number,
    name: string,
    id: number,
    slug: string,
  ) => void
  serviceId: number
}

export function RenderServiceList({
  selectedItemIndex: propSelectedItemIndex,
  handleItemPress,
  serviceId,
}: RenderItemsProps) {
  const { serviceData } = useSelector(state => state.service);
  const dispatch = useDispatch();
  const { viewRtlStyle, isDark } = useValues();
  const { colors } = useTheme();

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(propSelectedItemIndex);
  const initialSelectedSet = useRef(false); 

  useEffect(() => {
    dispatch(serviceDataGet());
  }, []);

  useEffect(() => {
    if (!initialSelectedSet.current && serviceData?.data?.length > 0) {
      const index = serviceData.data.findIndex(item => item.id === serviceId);
      if (index !== -1) {
        setSelectedItemIndex(index);
        initialSelectedSet.current = true; 
      }
    }
  }, [serviceData, serviceId]);

  const onItemPress = (index: number, slug: string, id: number, name: string) => {
    setSelectedItemIndex(index);
    handleItemPress(index, slug, id, name);
  };

  return (
    <>
      {serviceData?.data?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          style={[
            styles.listView,
            {
              borderColor: isDark
                ? colors.border
                : selectedItemIndex === index
                  ? appColors.subPrimary
                  : appColors.white,

              backgroundColor: isDark
                ? selectedItemIndex === index
                  ? appColors.primary
                  : colors.card
                : selectedItemIndex === index
                  ? appColors.subPrimary
                  : appColors.white,
            },
          ]}
          onPress={() => onItemPress(index, item.slug, item.id, item.name)}
        >
          <View
            style={[
              styles.iconAndTextContainer,
              { flexDirection: viewRtlStyle },
            ]}
          >
            <SvgUri
              width={34}
              height={34}
              uri={item?.service_icon_url}
              stroke="blue"
              fill="none"
            />
          </View>
          <Text
            style={[
              styles.serviceTitle,
              {
                color:
                  selectedItemIndex === index ? appColors.black : colors.text,
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
}
