import React from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import capeTownView from "../assets/images/capetownmountain landscape.jpeg";
import familyKayaking from "../assets/images/family kayaking outdoors.jpeg";
import kayaking from "../assets/images/kayaking river.jpeg";
import mountainHike from "../assets/images/mountain hike.jpeg";
import rockClimbing from "../assets/images/rock climbing wall.jpeg";
import teamBuilding from "../assets/images/team building outdoors.jpeg";
import ziplining from "../assets/images/ziplining forest.jpeg";

const packages = [
  {
    title: "Ultimate Adventure Day",
    feeLabel: "Package Fee:",
    fee: "R1500",
    bookingActivity: "Ultimate Adventure Day",
    purpose:
      "A full-day outdoor adventure featuring multiple exciting activities.",
    includes: [
      "Guided hiking trail",
      "Ziplining",
      "Kayaking",
      "Lunch",
      "Safety briefing and equipment",
    ],
    image: capeTownView,
  },
  {
    title: "Family Explorer Package",
    feeLabel: "Package Fee:",
    fee: "R1500",
    bookingActivity: "Family Explorer Package",
    purpose: "A fun-filled outdoor experience designed for families.",
    includes: [
      "Nature walk",
      "Obstacle course",
      "Picnic area",
      "Family games",
      "Guided wildlife spotting",
    ],
    image: familyKayaking,
  },
  {
    title: "Mountain Adventure Package",
    feeLabel: "Package Fee:",
    fee: "R1500",
    bookingActivity: "Mountain Adventure Package",
    purpose: "A guided mountain adventure for outdoor enthusiasts.",
    includes: [
      "Mountain hiking",
      "Scenic viewpoints",
      "Rock scrambling",
      "Safety equipment",
      "Professional guide",
    ],
    image: mountainHike,
  },
  {
    title: "Corporate Team Challenge",
    feeLabel: "Package Fee:",
    fee: "R1500",
    bookingActivity: "Corporate Team Challenge",
    purpose:
      "Team-building activities designed for businesses and organisations.",
    includes: [
      "Team obstacle course",
      "Orienteering challenge",
      "Raft-building activity",
      "Leadership exercises",
      "Team awards",
    ],
    image: teamBuilding,
  },
];

const activities = [
  {
    title: "Ziplining Adventure",
    feeLabel: "Fee:",
    fee: "R750",
    bookingActivity: "Ziplining Adventure",
    purpose:
      "Experience breathtaking views while ziplining through the forest.",
    includes: [
      "Safety briefing",
      "Equipment hire",
      "Professional instructors",
    ],
    image: ziplining,
  },
  {
    title: "Kayaking Experience",
    feeLabel: "Fee:",
    fee: "R750",
    bookingActivity: "Kayaking Experience",
    purpose: "Paddle through scenic rivers and lakes.",
    includes: ["Kayak and paddle", "Safety equipment", "Guided route"],
    image: kayaking,
  },
  {
    title: "Rock Climbing Session",
    feeLabel: "Fee:",
    fee: "R750",
    bookingActivity: "Rock Climbing Session",
    purpose: "Learn climbing techniques on natural rock faces.",
    includes: [
      "Climbing equipment",
      "Safety instruction",
      "Professional guide",
    ],
    image: rockClimbing,
  },
];

function renderCards(items, onBook) {
  return items.map((item) => (
    <View key={item.title} style={styles.adventure}>
      <ImageBackground
        source={item.image}
        imageStyle={styles.image}
        style={styles.imageFrame}
      />
      <View style={styles.adventureCopy}>
        <Text style={styles.adventureTitle}>{item.title}</Text>
        <Text style={styles.fee}>
          <Text style={styles.detailLabel}>{item.feeLabel}</Text> {item.fee}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Purpose:</Text> {item.purpose}
        </Text>
        <Text style={styles.detailLabel}>Includes:</Text>
        <View style={styles.includesList}>
          {item.includes.map((inclusion) => (
            <View key={inclusion} style={styles.inclusionRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.inclusion}>{inclusion}</Text>
            </View>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onBook(item)}
          style={styles.bookButton}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>
    </View>
  ));
}

export default function AdventuresScreen({ onBook }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Our Adventure Packages</Text>
      <View style={styles.cards}>{renderCards(packages, onBook)}</View>

      <Text style={styles.title}>Individual Activities</Text>
      <View style={styles.cards}>{renderCards(activities, onBook)}</View>

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
    paddingHorizontal: 16,
  },
  title: {
    color: "#1D4337",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 16,
    marginTop: 8,
  },
  cards: {
    gap: 16,
    marginBottom: 30,
  },
  adventure: {
    backgroundColor: "#FFFFFF",
  },
  imageFrame: {
    height: 168,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 14,
    backgroundColor: "#71816B",
  },
  image: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  adventureCopy: {
    paddingHorizontal: 17,
    paddingVertical: 16,
  },
  adventureTitle: {
    color: "#1D4337",
    fontSize: 20,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  fee: {
    color: "#5F685F",
    fontSize: 15,
    marginTop: 18,
  },
  detail: {
    color: "#5F685F",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 18,
    marginBottom: 18,
  },
  detailLabel: {
    color: "#34473D",
    fontSize: 14,
    fontWeight: "800",
  },
  includesList: {
    marginTop: 6,
    gap: 5,
  },
  inclusionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  bullet: {
    color: "#E56B3F",
    fontSize: 15,
    lineHeight: 21,
  },
  inclusion: {
    flex: 1,
    color: "#5F685F",
    fontSize: 14,
    lineHeight: 21,
  },
  bookButton: {
    minHeight: 48,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D4337",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  footer: {
    color: "#72796F",
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 16,
  },
});
