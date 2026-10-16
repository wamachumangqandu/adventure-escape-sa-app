import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const activities = [
  "Ultimate Adventure Day",
  "Family Explorer",
  "Mountain Adventure",
  "Corporate Team Challenge",
  "Ziplining",
  "Kayaking",
  "Rock Climbing",
];

function parseCurrencyValue(value) {
  const numericValue = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getDiscountRate(numberOfBookings) {
  if (numberOfBookings >= 4) return 0.15;
  if (numberOfBookings === 3) return 0.1;
  if (numberOfBookings === 2) return 0.05;
  return 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ContactScreen({ selectedAdventure }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState(
    selectedAdventure?.bookingActivity ?? activities[0],
  );
  const [bookingQuantity, setBookingQuantity] = useState("1");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [activityOpen, setActivityOpen] = useState(false);

  useEffect(() => {
    if (selectedAdventure?.bookingActivity) {
      setActivity(selectedAdventure.bookingActivity);
    }
  }, [selectedAdventure]);

  const bookingCount = Math.max(
    1,
    Number.parseInt(bookingQuantity || "1", 10) || 1,
  );
  const baseFee = parseCurrencyValue(selectedAdventure?.fee ?? "R0");
  const discountRate = getDiscountRate(bookingCount);
  const subtotal = baseFee * bookingCount;
  const discountAmount = subtotal * discountRate;
  const totalDue = subtotal - discountAmount;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Get in Touch</Text>
      {selectedAdventure ? (
        <View style={styles.bookingSummary}>
          <Text style={styles.bookingTitle}>{selectedAdventure.title}</Text>
          <Text style={styles.bookingFee}>
            {selectedAdventure.feeLabel} {selectedAdventure.fee}
          </Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          accessibilityLabel="Name:"
          autoCapitalize="words"
          onChangeText={setName}
          style={styles.input}
          value={name}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          accessibilityLabel="Email:"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          style={styles.input}
          value={email}
        />

        <Text style={styles.label}>Select Activity:</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setActivityOpen(!activityOpen)}
          style={styles.input}
        >
          <Text style={styles.activityText}>{activity}</Text>
          <Text style={styles.activityArrow}>{activityOpen ? "^" : "v"}</Text>
        </Pressable>
        {activityOpen ? (
          <View style={styles.activityOptions}>
            {activities.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setActivity(option);
                  setActivityOpen(false);
                }}
                style={styles.activityOption}
              >
                <Text style={styles.activityText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <Text style={styles.label}>Number of Bookings:</Text>
        <TextInput
          accessibilityLabel="Number of Bookings:"
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(value) => setBookingQuantity(value.replace(/\D/g, ""))}
          style={styles.input}
          value={bookingQuantity}
        />

        <Text style={styles.label}>Select Date:</Text>
        <TextInput
          accessibilityLabel="Select Date:"
          keyboardType="numbers-and-punctuation"
          onChangeText={setDate}
          style={styles.input}
          value={date}
        />

        <Text style={styles.label}>Message:</Text>
        <TextInput
          accessibilityLabel="Message:"
          multiline
          onChangeText={setMessage}
          style={[styles.input, styles.messageInput]}
          textAlignVertical="top"
          value={message}
        />

        {selectedAdventure ? (
          <View style={styles.calculationPanel}>
            <Text style={styles.panelTitle}>Booking Calculation</Text>
            <Text style={styles.detail}>
              Fee per booking: {selectedAdventure.fee}
            </Text>
            <Text style={styles.detail}>Bookings: {bookingCount}</Text>
            <Text style={styles.detail}>
              Discount: {Math.round(discountRate * 100)}%
            </Text>
            <Text style={styles.detail}>
              Subtotal: {formatCurrency(subtotal)}
            </Text>
            <Text style={styles.detail}>
              Discount amount: {formatCurrency(discountAmount)}
            </Text>
            <Text style={styles.total}>
              Total due: {formatCurrency(totalDue)}
            </Text>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          disabled
          style={[styles.submit, styles.submitDisabled]}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>

      <View style={styles.contactPanel}>
        <Text style={styles.panelTitle}>Adventure Escape SA</Text>
        <Text style={styles.detail}>Email: wamachumangqandu@gmail.com</Text>
        <Text style={styles.detail}>Phone: 0738898423</Text>
        <Text style={styles.detail}>Location: Cape Town, Western Cape</Text>
        <Text style={styles.detail}>Hours: Mon-Sat, 8:00am - 5:00pm</Text>
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
    paddingTop: 62,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  title: {
    color: "#1D4337",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    marginBottom: 20,
  },
  bookingSummary: {
    padding: 16,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 3,
    borderLeftColor: "#E56B3F",
    gap: 6,
  },
  bookingTitle: {
    color: "#1D4337",
    fontSize: 17,
    fontWeight: "800",
  },
  bookingFee: {
    color: "#5F685F",
    fontSize: 14,
  },
  form: {
    gap: 10,
  },
  label: {
    color: "#34473D",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 7,
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D7D9CF",
    backgroundColor: "#FFFFFF",
    color: "#1D4337",
    fontSize: 14,
  },
  activityText: {
    color: "#1D4337",
    fontSize: 14,
  },
  activityArrow: {
    color: "#72796F",
    fontSize: 13,
    fontWeight: "700",
  },
  activityOptions: {
    borderWidth: 1,
    borderColor: "#D7D9CF",
    backgroundColor: "#FFFFFF",
  },
  activityOption: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#E2E3D9",
  },
  messageInput: {
    height: 128,
    paddingTop: 14,
  },
  submit: {
    minHeight: 52,
    marginTop: 12,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D4337",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  submitDisabled: {
    backgroundColor: "#A8ADA5",
  },
  calculationPanel: {
    marginTop: 18,
    padding: 18,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 3,
    borderLeftColor: "#E56B3F",
  },
  contactPanel: {
    marginTop: 30,
    padding: 18,
    gap: 9,
    backgroundColor: "#FFFFFF",
  },
  panelTitle: {
    color: "#1D4337",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3,
  },
  detail: {
    color: "#5F685F",
    fontSize: 12,
    lineHeight: 18,
  },
  total: {
    color: "#1D4337",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },
  footer: {
    color: "#72796F",
    fontSize: 10,
    textAlign: "center",
    paddingTop: 22,
  },
});
