import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text, TextInput } from "../tool-components/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import { updateStringPropertyAsync } from "../redux/userSlice";
import { UserService } from "../services/user.service";
import { API_URL } from "@env";

const userService = new UserService(API_URL);
export const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  if (!user)
    return (
      <View style={{ backgroundColor: "white", alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Text>ERROR! No User Found</Text>
      </View>
    );

  const [name, setName] = useState(user.name);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleRequestChangeEmail = () => {
    // Aquí se despacharía una acción o se llamaría a una función para enviar el email
    Alert.alert(t("Request Change Email"), t("An email has been sent to your account to change your email."));
  };

  const handleRequestChangePassword = () => {
    // Aquí se despacharía una acción o se llamaría a una función para enviar el email
    Alert.alert(t("Request Change Password"), t("An email has been sent to your account to change your password."));
  };

  return (
    <View style={styles.container}>
      <Text>{t("Name")}</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} maxLength={16} />
      <Button
        isLoading={isLoading}
        textStyle={{ color: "white" }}
        style={[styles.button, { backgroundColor: "#9fEE90", marginBottom: 40, marginTop: 20 }]}
        title={t("Save")}
        onPress={() => {
          if (name) {
            setIsLoading(true);
            userService
              .updateUser(user.id, { name: name })
              .then((res) => {
                console.log("res: ", res);
                Alert.alert(t("Updated Successfully"));
                dispatch(updateStringPropertyAsync({ property: "name", value: name }));
                userService.updateUser(user.id, { name: name });
              })
              .catch((err) => {
                console.error("error: ", err);
                Alert.alert("Error :(");
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        }}
      />
      <Button
        style={[styles.button, { backgroundColor: "#355050" }]}
        title={t("Request Change Email")}
        onPress={handleRequestChangeEmail}
      />
      <Button style={styles.button} title={t("Request Change Password")} onPress={handleRequestChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
  },
  button: {
    width: "80%",
    alignSelf: "center",
  },
});
