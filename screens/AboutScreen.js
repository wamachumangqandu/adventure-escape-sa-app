import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ecoTravel from "../assets/images/eco travel nature.jpeg";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>About Adventure Escape SA</Text>
      <Text style={styles.lead}>
        Founded in Cape Town, Adventure Escape SA inspires people to explore
        South Africa’s natural beauty through safe, guided adventures.
      </Text>

      <ImageBackground
        source={ecoTravel}
        imageStyle={styles.image}
        style={styles.photo}
      />

      <View style={styles.story}>
        <Text style={styles.storyHeading}>Our Story</Text>
        <Text style={styles.body}>
          From mountain peaks to ocean waves, our adventures connect people with
          nature, challenge their limits, and create unforgettable memories. We
          combine expert local guidance with immersive outdoor experiences that
          stay true to the spirit of South Africa.
        </Text>
      </View>

      <Text style={styles.storyHeading}>Our Values</Text>
      <Text style={styles.value}>🌱 Respect for nature and sustainability</Text>
      <Text style={styles.value}>
        🧭 Guidance and safety for all adventurers
      </Text>
      <Text style={styles.value}>🔥 Energy, excitement, and discovery</Text>
      <Text style={styles.value}>🤝 Teamwork and community spirit</Text>

      <Text style={styles.footer}>
        © 2026 Adventure Escape SA | Cape Town, Western Cape
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F2EB",
  },
  content: {
    paddingTop: 62,
    paddingBottom: 34,
    paddingHorizontal: 24,
  },
  title: {
    color: "#1D4337",
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "800",
    marginTop: 12,
  },
  lead: {
    color: "#5F685F",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
  },
  photo: {
    height: 230,
    marginTop: 24,
    backgroundColor: "#6E8167",
  },
  image: {
    borderRadius: 4,
  },
  story: {
    paddingTop: 26,
    paddingBottom: 20,
    gap: 10,
  },
  storyHeading: {
    color: "#1D4337",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  body: {
    color: "#5F685F",
    fontSize: 14,
    lineHeight: 22,
  },
  value: {
    color: "#34473D",
    fontSize: 14,
    lineHeight: 22,
    paddingVertical: 7,
  },
  footer: {
    color: "#72796F",
    fontSize: 10,
    textAlign: "center",
    paddingTop: 28,
  },
});
