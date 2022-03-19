import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { Container, Typography } from "../ui-kit/Themed";

export function Player() {

  return (
    <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 40, borderRadius: 5, aspectRatio: 1, marginRight: 10}} source={require("../../assets/images/albums/ma-drive-slow-art.jpg")} />
      
      <View style={{flex: 1}}>
        <Typography>Easy</Typography>
         <Typography intent="muted">Mac Ayres</Typography>
      </View>

      <View>
        <Typography><Ionicons size={26} name="play"/></Typography>
      </View>
    </View>
  )
}