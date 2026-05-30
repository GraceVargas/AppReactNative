import React, { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {

    const [photo, setPhoto] = useState<string | null>(null);
    
    const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Necesitamos acceso a la cámara para sacar la foto.",
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la galería.");
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    if (!(await requestCameraPermission())) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3], // proporción de portada
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const pickFromGallery = async () => {
    if (!(await requestGalleryPermission())) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handlePhotoPress = () => {
    Alert.alert("Foto de portada", "¿De dónde querés sacar la foto?", [
      { text: "📷 Cámara", onPress: takePhoto },
      { text: "🖼️ Galería", onPress: pickFromGallery },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

    return { handlePhotoPress, photo, setPhoto };
};

export default useImagePicker;

