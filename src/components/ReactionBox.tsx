import React, { useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Text } from "../tool-components/index";
import { TaleService } from "../services/tale.service";
import { API_URL } from "@env";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

interface Props {
  taleId: string;
  likes: number;
  dislikes: number;
  onReacton: (like: boolean) => void;
}

const taleService = new TaleService(API_URL);

export const ReactionBox = (props: Props) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);

  const reportReasons = [t("Spam"), t("Inappropriate Content"), t("Hate Speech")];

  const formatCount = (count: number) => {
    return count > 999 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  const handleLike = () => {
    taleService
      .likeTale(props.taleId)
      .then((res) => {
        props.onReacton(true);
      })
      .catch((err) => {
        console.error("error: ", err);
        console.error("status: ", err.response.status);
        if (err.response.status === 401) {
          alert(t("You must be logged in to rate a tale"));
        }
      });
  };

  const handleDislike = () => {
    taleService
      .dislikeTale(props.taleId)
      .then((res) => {
        props.onReacton(false);
      })
      .catch((err) => {
        console.error("error: ", err);
        console.error("status: ", err.response.status);
        if (err.response.status === 401) {
          alert(t("You must be logged in to rate a tale"));
        }
      });
  };

  const handleReport = () => {
    setLoading(true);
    taleService
      .reportTale(props.taleId, selectedReason)
      .then((val) => {
        setModalVisible(false);
        alert(t("Report sent successfully"));
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.reactionContainer}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons name="alert-circle-outline" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDislike}>
        <Ionicons name="thumbs-down-outline" size={20} color="gray" />
        <Text style={{ position: "absolute", bottom: -20, width: 50, color: "gray" }}>
          {formatCount(props.dislikes)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: "relative" }} onPress={handleLike}>
        <Ionicons name="thumbs-up-outline" size={20} color="gray" />
        <Text style={{ position: "absolute", bottom: -20, width: 50, color: "gray" }}>{formatCount(props.likes)}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t("Report Reason")}</Text>
            {/* Menú desplegable para seleccionar la razón del reporte */}

            <Picker
              selectedValue={selectedReason}
              onValueChange={(itemValue, itemIndex) => setSelectedReason(itemValue)}
              style={{ width: "100%" }}
            >
              {reportReasons.map((reason, index) => (
                <Picker.Item key={index} label={reason} value={reason} />
              ))}
            </Picker>

            {/* Botones para cancelar o enviar el reporte */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 30 }}>
              <Button
                isLoading={loading}
                style={[styles.buttonClose, { backgroundColor: "red" }]}
                title={t("Cancel")}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button isLoading={loading} style={styles.buttonClose} title={t("Report")} onPress={handleReport} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
