import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AboutScreen from "./screens/AboutScreen";
import AdventuresScreen from "./screens/AdventuresScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";

const tabs = [
  { label: "Home", screen: HomeScreen },
  { label: "About", screen: AboutScreen },
  { label: "Adventures", screen: AdventuresScreen },
  { label: "Contact", screen: ContactScreen },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const ActiveScreen = tabs.find((tab) => tab.label === activeTab).screen;

  function handleBooking(adventure) {
    setSelectedAdventure(adventure);
    setActiveTab("Contact");
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <ActiveScreen
        onNavigate={setActiveTab}
        onBook={handleBooking}
        selectedAdventure={selectedAdventure}
      />
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              key={tab.label}
              onPress={() => setActiveTab(tab.label)}
              style={styles.tab}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
              {isActive ? <View style={styles.activeMark} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#F3F2EB",
  },
  tabBar: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E3D9",
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  tab: {
    minWidth: 70,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  tabText: {
    color: "#72796F",
    fontSize: 12,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#1D4337",
  },
  activeMark: {
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E56B3F",
  },
});
