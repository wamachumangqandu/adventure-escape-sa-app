import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Same names and prices as the website.
const activities = [
  { name: "Ultimate Adventure Day", fee: 1500 },
  { name: "Family Explorer Package", fee: 1500 },
  { name: "Mountain Adventure Package", fee: 1500 },
  { name: "Corporate Team Challenge", fee: 1500 },
  { name: "Ziplining Adventure", fee: 750 },
  { name: "Kayaking Experience", fee: 750 },
  { name: "Rock Climbing Session", fee: 750 },
];

const VAT_RATE = 0.15; // South African VAT
const MAX_BOOKINGS = 20;
const MAX_MESSAGE = 500;
const MAX_MONTHS_AHEAD = 12;
const FORM_ENDPOINT = "https://formsubmit.co/ajax/hello@adventureescapesa.co.za";

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

function startOfToday() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

// Each check returns an error message, or "" when the value is fine.
function validate({ name, email, activity, bookings, date, message }) {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedDate = date.trim();

  if (!trimmedName) errors.name = "Please enter your name.";
  else if (trimmedName.length < 2) {
    errors.name = "Your name must be at least 2 letters.";
  } else if (!/^[\p{L}][\p{L}\s'’-]*$/u.test(trimmedName)) {
    errors.name =
      "Your name can only use letters, spaces, hyphens and apostrophes.";
  }

  if (!trimmedEmail) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (!activities.some((item) => item.name === activity)) {
    errors.activity = "Please choose an activity from the list.";
  }

  if (!bookings) errors.bookings = "Please enter the number of bookings.";
  else {
    const count = Number(bookings);
    if (count < 1) errors.bookings = "You need at least 1 booking.";
    else if (count > MAX_BOOKINGS) {
      errors.bookings = `You can book up to ${MAX_BOOKINGS} at a time. For bigger groups, please contact us.`;
    }
  }

  if (!trimmedDate) errors.date = "Please enter a date for your adventure.";
  else {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmedDate);
    const chosen = match
      ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
      : null;
    const isRealDate =
      chosen &&
      chosen.getFullYear() === Number(match[1]) &&
      chosen.getMonth() === Number(match[2]) - 1 &&
      chosen.getDate() === Number(match[3]);
    const latest = startOfToday();
    latest.setMonth(latest.getMonth() + MAX_MONTHS_AHEAD);

    if (!isRealDate) {
      errors.date = "Please enter a real date as YYYY-MM-DD, like 2026-11-09.";
    } else if (chosen < startOfToday()) {
      errors.date = "Please choose today or a future date.";
    } else if (chosen > latest) {
      errors.date = `We take bookings up to ${MAX_MONTHS_AHEAD} months ahead. Please choose an earlier date.`;
    } else if (chosen.getDay() === 0) {
      errors.date = "We’re closed on Sundays. Please choose Monday to Saturday.";
    }
  }

  if (message.length > MAX_MESSAGE) {
    errors.message = `Your message must be ${MAX_MESSAGE} characters or fewer.`;
  }

  return errors;
}

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  activity: "Activity",
  bookings: "Number of Bookings",
  date: "Date",
  message: "Message",
};

export default function ContactScreen({ selectedAdventure }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState(
    selectedAdventure?.bookingActivity ?? activities[0].name,
  );
  const [bookings, setBookings] = useState("1");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [activityOpen, setActivityOpen] = useState(false);
  const [triedToSend, setTriedToSend] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [statusMessage, setStatusMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedAdventure?.bookingActivity) {
      setActivity(selectedAdventure.bookingActivity);
    }
  }, [selectedAdventure]);

  const values = { name, email, activity, bookings, date, message };
  const errors = validate(values);
  const visibleErrors = triedToSend ? errors : {};
  const errorKeys = Object.keys(visibleErrors);

  // The price always follows the activity that is chosen.
  const fee = activities.find((item) => item.name === activity)?.fee ?? 0;
  const bookingCount = Math.min(
    MAX_BOOKINGS,
    Math.max(1, Number.parseInt(bookings || "1", 10) || 1),
  );
  const discountRate = getDiscountRate(bookingCount);
  const subtotal = fee * bookingCount;
  const discountAmount = subtotal * discountRate;
  const afterDiscount = subtotal - discountAmount;
  const vat = afterDiscount * VAT_RATE;
  const totalDue = afterDiscount + vat;

  async function handleSubmit() {
    setTriedToSend(true);
    setStatus("idle");
    setStatusMessage("");

    if (Object.keys(errors).length > 0) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "New Adventure Escape SA booking inquiry (app)",
          _template: "table",
          name: name.trim(),
          email: email.trim(),
          activity,
          bookings: bookingCount,
          date: date.trim(),
          message: message.trim(),
          total_incl_vat: formatCurrency(totalDue),
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== "true") {
        throw new Error(
          result.message || "The booking service could not accept your inquiry.",
        );
      }

      setStatus("sent");
      setStatusMessage(
        `Thank you, ${name.trim()}! Your inquiry for ${activity} has been sent. We'll reply to ${email.trim()} soon.`,
      );
      setName("");
      setEmail("");
      setBookings("1");
      setDate("");
      setMessage("");
      setTriedToSend(false);
    } catch (error) {
      setStatus("failed");
      setStatusMessage(
        error.name === "AbortError"
          ? "Sending took too long. Check your internet connection and try again."
          : error.message === "Network request failed" ||
              error.message === "Failed to fetch"
            ? "You seem to be offline. Check your internet connection and try again."
            : `Your inquiry wasn't sent: ${error.message}`,
      );
    } finally {
      clearTimeout(timeout);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  }

  const fieldError = (key) =>
    visibleErrors[key] ? (
      <Text style={styles.errorText} accessibilityLiveRegion="polite">
        ⚠ {visibleErrors[key]}
      </Text>
    ) : null;

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Get in Touch</Text>

      {status === "sent" ? (
        <View style={[styles.notice, styles.noticeSuccess]} accessibilityRole="alert">
          <Text style={styles.noticeTitle}>Inquiry sent</Text>
          <Text style={styles.noticeText}>{statusMessage}</Text>
        </View>
      ) : null}

      {status === "failed" ? (
        <View style={[styles.notice, styles.noticeError]} accessibilityRole="alert">
          <Text style={[styles.noticeTitle, styles.errorTitle]}>Not sent</Text>
          <Text style={styles.noticeText}>{statusMessage}</Text>
        </View>
      ) : null}

      {errorKeys.length > 0 ? (
        <View style={[styles.notice, styles.noticeError]} accessibilityRole="alert">
          <Text style={[styles.noticeTitle, styles.errorTitle]}>
            Please fix {errorKeys.length}{" "}
            {errorKeys.length === 1 ? "problem" : "problems"} before sending:
          </Text>
          {errorKeys.map((key) => (
            <Text key={key} style={styles.noticeText}>
              • {FIELD_LABELS[key]}
            </Text>
          ))}
        </View>
      ) : null}

      {selectedAdventure ? (
        <View style={styles.bookingSummary}>
          <Text style={styles.bookingTitle}>{selectedAdventure.title}</Text>
          <Text style={styles.bookingFee}>
            {selectedAdventure.feeLabel} {selectedAdventure.fee}
          </Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <Text style={styles.note}>Fields marked * are required.</Text>

        <Text style={styles.label}>Name: *</Text>
        <TextInput
          accessibilityLabel="Name"
          autoCapitalize="words"
          autoComplete="name"
          maxLength={60}
          onChangeText={setName}
          style={[styles.input, visibleErrors.name && styles.inputError]}
          value={name}
        />
        {fieldError("name")}

        <Text style={styles.label}>Email: *</Text>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          maxLength={100}
          onChangeText={setEmail}
          style={[styles.input, visibleErrors.email && styles.inputError]}
          value={email}
        />
        {fieldError("email")}

        <Text style={styles.label}>Select Activity: *</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Activity: ${activity}. Tap to change.`}
          accessibilityState={{ expanded: activityOpen }}
          onPress={() => setActivityOpen(!activityOpen)}
          style={[styles.input, visibleErrors.activity && styles.inputError]}
        >
          <Text style={styles.activityText}>{activity}</Text>
          <Text style={styles.activityArrow}>{activityOpen ? "▲" : "▼"}</Text>
        </Pressable>
        {activityOpen ? (
          <View style={styles.activityOptions}>
            {activities.map((option) => (
              <Pressable
                key={option.name}
                accessibilityRole="button"
                onPress={() => {
                  setActivity(option.name);
                  setActivityOpen(false);
                }}
                style={[
                  styles.activityOption,
                  option.name === activity && styles.activityOptionSelected,
                ]}
              >
                <Text style={styles.activityText}>{option.name}</Text>
                <Text style={styles.optionFee}>
                  {formatCurrency(option.fee)}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        {fieldError("activity")}

        <Text style={styles.label}>Number of Bookings: *</Text>
        <TextInput
          accessibilityLabel="Number of Bookings"
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(value) => setBookings(value.replace(/\D/g, ""))}
          style={[styles.input, visibleErrors.bookings && styles.inputError]}
          value={bookings}
        />
        {fieldError("bookings")}

        <Text style={styles.label}>Select Date: *</Text>
        <TextInput
          accessibilityLabel="Date, written as year, month, day"
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#9AA096"
          style={[styles.input, visibleErrors.date && styles.inputError]}
          value={date}
        />
        <Text style={styles.hint}>We run adventures Monday to Saturday.</Text>
        {fieldError("date")}

        <Text style={styles.label}>Message:</Text>
        <TextInput
          accessibilityLabel="Message"
          multiline
          maxLength={MAX_MESSAGE}
          onChangeText={setMessage}
          style={[
            styles.input,
            styles.messageInput,
            visibleErrors.message && styles.inputError,
          ]}
          textAlignVertical="top"
          value={message}
        />
        <Text style={styles.hint}>
          {message.length} / {MAX_MESSAGE} characters
        </Text>
        {fieldError("message")}

        <View style={styles.calculationPanel}>
          <Text style={styles.panelTitle}>Booking Calculation</Text>
          {errors.bookings ? (
            <Text style={styles.errorText}>
              ⚠ Enter a number of bookings from 1 to {MAX_BOOKINGS} to see your
              total.
            </Text>
          ) : (
            <>
          <Text style={styles.detail}>
            Fee per booking: {formatCurrency(fee)}
          </Text>
          <Text style={styles.detail}>Bookings: {bookingCount}</Text>
          <Text style={styles.detail}>Subtotal: {formatCurrency(subtotal)}</Text>
          <Text style={styles.detail}>
            Discount ({Math.round(discountRate * 100)}%): −
            {formatCurrency(discountAmount)}
          </Text>
          <Text style={styles.detail}>
            Price after discount: {formatCurrency(afterDiscount)}
          </Text>
          <Text style={styles.detail}>VAT (15%): {formatCurrency(vat)}</Text>
          <Text style={styles.total}>
            Total due (incl. VAT): {formatCurrency(totalDue)}
          </Text>
            </>
          )}
          <Text style={styles.rules}>
            1 booking: no discount · 2: 5% · 3: 10% · 4 or more: 15%
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: status === "sending" }}
          disabled={status === "sending"}
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submit,
            pressed && styles.submitPressed,
            status === "sending" && styles.submitDisabled,
          ]}
        >
          {status === "sending" ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : null}
          <Text style={styles.submitText}>
            {status === "sending" ? "Sending…" : "Send inquiry"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.contactPanel}>
        <Text style={styles.panelTitle}>Adventure Escape SA</Text>
        <Text style={styles.detail}>Email: hello@adventureescapesa.co.za</Text>
        <Text style={styles.detail}>Phone: +27 21 555 0199</Text>
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
  notice: {
    padding: 16,
    marginBottom: 18,
    gap: 4,
    borderWidth: 1,
  },
  noticeSuccess: {
    backgroundColor: "#E6F2E8",
    borderColor: "#9CCBA3",
  },
  noticeError: {
    backgroundColor: "#FDECEA",
    borderColor: "#F2B8B5",
  },
  noticeTitle: {
    color: "#1D4337",
    fontSize: 15,
    fontWeight: "800",
  },
  errorTitle: {
    color: "#B3261E",
  },
  noticeText: {
    color: "#34473D",
    fontSize: 13,
    lineHeight: 19,
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
  note: {
    color: "#72796F",
    fontSize: 12,
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
  inputError: {
    borderWidth: 2,
    borderColor: "#B3261E",
    backgroundColor: "#FDECEA",
  },
  errorText: {
    color: "#B3261E",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  hint: {
    color: "#72796F",
    fontSize: 12,
  },
  activityText: {
    color: "#1D4337",
    fontSize: 14,
  },
  activityArrow: {
    color: "#72796F",
    fontSize: 11,
  },
  activityOptions: {
    borderWidth: 1,
    borderColor: "#D7D9CF",
    backgroundColor: "#FFFFFF",
  },
  activityOption: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#E2E3D9",
  },
  activityOptionSelected: {
    backgroundColor: "#EEF4EF",
  },
  optionFee: {
    color: "#72796F",
    fontSize: 12,
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
    gap: 10,
    backgroundColor: "#E56B3F",
  },
  submitPressed: {
    opacity: 0.85,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 14,
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
    fontSize: 13,
    lineHeight: 19,
  },
  total: {
    color: "#1D4337",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
  rules: {
    color: "#72796F",
    fontSize: 11,
    marginTop: 4,
  },
  footer: {
    color: "#72796F",
    fontSize: 10,
    textAlign: "center",
    paddingTop: 22,
  },
});
