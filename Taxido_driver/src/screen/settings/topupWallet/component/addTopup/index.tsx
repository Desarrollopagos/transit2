import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import appColors from "../../../../../theme/appColors";
import styles from "./styles";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useValues } from "../../../../../utils/context";
import { Button, notificationHelper } from "../../../../../commonComponents";
import { WithdrawDataInterface } from "../../../../../api/interface/walletInterface";
import { paymentsData, withdrawData } from "../../../../../api/store/action";
import { useDispatch, useSelector } from "react-redux";

export function AddTopUp() {
  const navigation = useNavigation()
  const { colors } = useTheme();
  const { viewRtlStyle, textRtlStyle, isDark } = useValues();
  const dispatch = useDispatch();
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [description, setDescription] = useState("");
  const { translateData } = useSelector((state) => state.setting);
  const { zoneValue } = useSelector((state) => state.zoneUpdate)

  useEffect(() => {
    dispatch(paymentsData());
  }, []);

  const withdraeAmount = async () => {
    let payload: WithdrawDataInterface = {
      amount: withdrawAmount,
      message: description,
      payment_type: "bank",
    };


    dispatch(withdrawData(payload))
      .unwrap()
      .then((res: any) => {
        if (res.status !== 'pending') {
          notificationHelper('Error', res.message, 'error');
        } else {
          notificationHelper('Success', 'Top-up successful!', 'success');
          navigation.goBack();
        }

      })
      .catch((error) => {
        console.error('Error occurred during withdrawal:', error);
        setModalMessage(translateData.setModalMessagee);
        setModalVisible(true);
      });
  };


  return (
    <View>
      <Text
        style={[
          styles.addBalance,
          { color: colors.text, textAlign: textRtlStyle },
        ]}
      >
        {translateData.addTopupBalance}
      </Text>
      <Text style={[styles.amount, { textAlign: textRtlStyle }]}>
        {translateData.enterAmount}
      </Text>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputView,
            {
              backgroundColor: colors.card,
              flexDirection: viewRtlStyle,
              borderColor: colors.border,
            },
          ]}
        >
          <Text>
            {zoneValue.currency_symbol}
          </Text>
          <TextInput
            style={[
              styles.textinput,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder={translateData.amount}
            placeholderTextColor={
              isDark ? appColors.darkText : appColors.secondaryFont
            }
            keyboardType={"numeric"}
            value={withdrawAmount}
            onChangeText={(text) => setWithdrawAmount(text)}
          />
        </View>
        <Text
          style={[
            styles.title,
            { color: colors.text, textAlign: textRtlStyle },
          ]}
        >
          {translateData.customMessage}
        </Text>
        <TextInput
          style={[
            styles.textInputDetail,
            [styles.additionalStyle, { borderColor: colors.border }],
            { textAlign: textRtlStyle },
            { backgroundColor: colors.card },
            { color: colors.text },
          ]}
          placeholder={translateData.enterDetails}
          placeholderTextColor={
            isDark ? appColors.darkText : appColors.secondaryFont
          }
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={styles.button}>
          <Button
            backgroundColor={appColors.primary}
            color={appColors.white}
            title={translateData.addTopupBalance}
            margin={0}
            onPress={withdraeAmount}
          />
        </View>
      </View>
    </View>
  );
}
