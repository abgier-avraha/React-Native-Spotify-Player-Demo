import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography, Paper } from "./ui-kit/Themed";

export function FullPlayer() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.4 }}
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: "#446070",
      }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 0.8 }}>
        <Typography>
          <Ionicons size={32} name="chevron-down"></Ionicons>
        </Typography>
      </SafeAreaView>
      <Paper
        style={{ flex: 5.5, flexDirection: "row", backgroundColor: undefined }}
      >
        <Image
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
          source={require("../../assets/images/albums/ma-drive-slow-art.jpg")}
        />
      </Paper>
      <View
        style={{
          flex: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View>
            <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
              Easy
            </Typography>
            <Typography style={{ fontSize: 20, opacity: 0.7 }}>
              Mac Ayres
            </Typography>
          </View>
          <Ionicons size={32} name="heart" color="#3ae05e" />
        </View>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View
            style={{
              position: "absolute",
              borderRadius: 24,
              height: 12,
              aspectRatio: 1,
              backgroundColor: "#fff",
            }}
          />
          <View
            style={{
              marginTop: 3,
              flex: 1,
              height: 6,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <Typography style={{ opacity: 0.7 }}>0:01</Typography>
          <Typography style={{ opacity: 0.7 }}>-5:12</Typography>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            <Ionicons name="shuffle" size={40} />
          </Typography>
          <Typography>
            <Ionicons name="play-skip-back" size={40} />
          </Typography>
          <Typography>
            <Ionicons name="play-circle" size={60} />
          </Typography>
          <Typography>
            <Ionicons name="play-skip-forward" size={40} />
          </Typography>
          <Typography>
            <Ionicons name="infinite" size={40} />
          </Typography>
        </View>
      </View>
    </LinearGradient>
  );
}
