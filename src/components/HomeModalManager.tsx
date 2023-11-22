import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { ModalPremium } from "../components/ModalPremium";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setHasSeenPremiumOfferAsync } from "../redux/userSlice";
import { ModalSignInNow } from "../components/ModalSignInNow";
import { ModalMapFilters } from "../components/ModalMapFilters";

interface Props {
  hasSeenPremiumOffer: boolean;
  modalFilters: boolean;
  setModalFilters: Dispatch<SetStateAction<boolean>>;
  applyFilters: (category: string, hideRead: boolean) => Promise<void>;
  setModalSignInNow: Dispatch<SetStateAction<boolean>>;
  modalSignInNow: boolean;
}

export const HomeModalManager = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <View>
      <ModalMapFilters
        isModalVisible={props.modalFilters}
        setModalVisible={props.setModalFilters}
        applyFilters={props.applyFilters}
      />
      <ModalPremium
        isModalVisible={!props.hasSeenPremiumOffer}
        setModalVisible={(value) => {
          dispatch(setHasSeenPremiumOfferAsync(true));
        }}
      />
      <ModalSignInNow setVisible={props.setModalSignInNow} visible={props.modalSignInNow} />
    </View>
  );
};
