import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import adventureLogo from "../assets/images/Adventure Escape SA Logo.png";
import capeTownView from "../assets/images/capetownmountain landscape.jpeg";

const overviewCards = [
  {
    title: "Safety First",
    description:
      "Every trip is guided by trained professionals who prioritise your safety, comfort, and confidence.",
  },
  {
    title: "Authentic Experiences",
    description:
      "We design adventures around Cape Town's stunning landscapes, local culture, and unforgettable moments.",
  },
  {
    title: "Memories That Last",
    description:
      "Whether you're solo, with family, or as a team, we create experiences that keep people coming back.",
  },
];

const stats = [
  { value: "5+", description: "Years of guiding adventure experiences." },
  { value: "2000+", description: "Adventurers inspired across South Africa." },
  { value: "4.9/5", description: "Average guest experience rating." },
];

const features = [
  {
    title: "Expert Guides",
    description:
      "Our team brings local knowledge, outdoor leadership, and care to every route and activity.",
  },
  {
    title: "Tailored Adventures",
    description:
      "From family-friendly outings to thrilling challenge days, every trip fits your pace and goals.",
  },
  {
    title: "Beautiful Locations",
    description:
      "Explore iconic trails, mountain views, rivers, and coastal routes throughout the Western Cape.",
  },
];

export default function HomeScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="Adventure Escape SA logo"
          resizeMode="contain"
          source={adventureLogo}
          style={styles.brandLogo}
        />
      </View>

      <ImageBackground
        source={capeTownView}
        imageStyle={styles.heroImage}
        style={styles.hero}
      >
        <View style={styles.heroShade} />
        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle}>Explore · Discover · Experience</Text>
          <Text style={styles.heroDescription}>
            Adventure Escape SA inspires people to explore South Africa's
            natural beauty through safe, guided adventures.
          </Text>
          <Pressable
            style={styles.heroButton}
            onPress={() => onNavigate("Adventures")}
          >
            <Text style={styles.heroButtonText}>Book Now</Text>
            <Text style={styles.heroArrow}>&gt;</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.intro}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.introText}>
          Inspiring outdoor adventures that connect people with nature,
          challenge their limits, and create unforgettable memories.
        </Text>
        <View style={styles.overviewGrid}>
          {overviewCards.map((card) => (
            <View key={card.title} style={styles.overviewCard}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stats}>
        {stats.map((stat) => (
          <View key={stat.value} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statDescription}>{stat.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.whySection}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        {features.map((feature) => (
          <View key={feature.title} style={styles.feature}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>

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
    paddingTop: 52,
    paddingBottom: 28,
  },
  header: {
    minHeight: 72,
    paddingHorizontal: 24,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  brandLogo: {
    width: 72,
    height: 72,
  },
  hero: {
    minHeight: 350,
    marginHorizontal: 16,
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: "#536B54",
  },
  heroImage: {
    borderRadius: 4,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 29, 22, 0.47)",
  },
  heroCopy: {
    paddingHorizontal: 24,
    paddingBottom: 58,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  heroDescription: {
    maxWidth: 290,
    color: "#F0F0E9",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  heroButton: {
    alignSelf: "flex-start",
    minHeight: 48,
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    backgroundColor: "#E56B3F",
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  heroArrow: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  intro: {
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 18,
  },
  sectionTitle: {
    color: "#1D4337",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
  },
  introText: {
    color: "#5F685F",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  overviewGrid: {
    gap: 12,
    marginTop: 20,
  },
  overviewCard: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    color: "#1D4337",
    fontSize: 13,
    fontWeight: "800",
  },
  cardDescription: {
    color: "#5F685F",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5,
  },
  stats: {
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D9DCD1",
  },
  stat: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    borderColor: "#D9DCD1",
  },
  statValue: {
    minWidth: 64,
    color: "#E56B3F",
    fontSize: 20,
    fontWeight: "800",
  },
  statDescription: {
    flex: 1,
    color: "#34473D",
    fontSize: 12,
    lineHeight: 18,
  },
  whySection: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 12,
    gap: 18,
  },
  feature: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#D9DCD1",
  },
  footer: {
    color: "#72796F",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
});
