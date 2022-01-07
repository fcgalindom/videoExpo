import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'; 
import React, { useState } from 'react';
export default function App() {
  const [imagenSelect, setImagenSelect] = useState(null);
  const onPress = () => Alert.alert('Hello');
  let permisos = async () => {
    // cargar imagenes esto se hace mediante la funcion ImagePicker esta en documentacion de expo
    let resultadoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (resultadoPermiso.granted === false) {
      alert('Permiso de accseso requerido')
      return;

    }
    const imagenResultado  = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(imagenResultado);

    if (!imagenResultado.cancelled) {
      setImagenSelect({ localUri: imagenResultado.uri });
    }
    

   
    console.log("llego");

  }
  // funcion de ejemplo de alerta docuementacion de expo
  const createTwoButtonAlert = () =>
    Alert.alert('Animal precionado', 'Correcta precion', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  // compartir imajenes  o cualquier otra cosa  con la funcion Sharing se hace con la documentacion de expo
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    if (await imagenSelect == null){
      alert("debe cargar una imagen en el boton precioname primero")
      return;
    }

    await Sharing.shareAsync(imagenSelect.localUri);
  }; 
  return (
    <View style={styles.container}>
      <Text>Seleciona tu animal</Text>
      <StatusBar style="auto" />
      <Image source={{ uri: imagenSelect !== null ? 
        imagenSelect.localUri : 'https://i.pinimg.com/originals/22/11/12/2211123f35367a0d7bf358bc10eb13cc.png' }} style={{ height: 200, width: 200 }} />
      <Button
        style={styles.button}
        onPress={permisos}
        title="Precioname"

      />
      <Button

       style={styles.button}
       onPress={openShareDialogAsync}
      
       
       title="Compartir"
      
      
      />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});

