# Adventure Escape SA App

An Expo and React Native mobile app for exploring Adventure Escape SA and its guided outdoor activities across Cape Town and the Western Cape.

## Features

- Home screen with the company overview, mission, and featured experiences
- About screen with the company story and values
- Adventures screen with package and individual activity details and prices
- Contact screen with an inquiry form, error checking, and business contact information
- Booking calculation with quantity-based discounts and 15% VAT
- Bottom tab navigation between Home, About, Adventures, and Contact
- Mobile-first design for Expo app experiences

## Booking calculation

The Contact screen works out the cost of the chosen activity and number of bookings. The price always follows the activity selected in the drop-down list, and tapping **Book Now** on the Adventures screen fills in that adventure for you.

Discounts are based on the number of bookings:

| Bookings | Discount |
| --- | --- |
| 1 | None |
| 2 | 5% |
| 3 | 10% |
| 4 or more (up to 20) | 15% |

South African VAT of 15% is then added to the discounted price. These are the same prices and rules as the website.

Example: 3 × Ziplining Adventure (R750) = R2,250, minus 10% (R225) = R2,025, plus 15% VAT (R303.75) = **R2,328.75**.

## Error handling

When **Send inquiry** is pressed, every field is checked. A red summary appears at the top listing what needs fixing, and a message appears under each field:

| Field | Rule |
| --- | --- |
| Name | Required, at least 2 letters, letters, spaces, hyphens and apostrophes only |
| Email | Required, must look like `name@example.com` |
| Activity | Must be one of the listed activities |
| Number of bookings | 1 to 20 (the total is hidden until the number is valid) |
| Date | Written as YYYY-MM-DD, a real date, not in the past, not more than 12 months ahead, and not a Sunday |
| Message | Optional, up to 500 characters (a counter shows how many are used) |

If sending fails, the app explains why: no internet connection, the request taking too long, or the form service refusing the inquiry.

## Project structure

```text
.
├── App.js
├── index.ts
├── app.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── assets/
│   └── images/
├── screens/
│   ├── AboutScreen.js
│   ├── AdventuresScreen.js
│   ├── ContactScreen.js
│   └── HomeScreen.js
└── .gitignore
```

## Requirements

- Node.js
- npm
- Expo CLI
- Expo Go on a mobile device, or an Android/iOS simulator

## Run the app

From the project directory, install dependencies and start Expo:

```bash
npm install
npx expo start
```

To open a specific target:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

Use the Expo terminal menu to open the project on a connected device or simulator. The iOS command requires macOS and an available iOS Simulator or device.

## Sending inquiries

The **Send inquiry** button sends the inquiry, including the booking total, to `hello@adventureescapesa.co.za` through FormSubmit, the same free service the website uses. The button shows "Sending…" while it works, and a green message confirms when the inquiry has been sent.

The first time an inquiry is sent, FormSubmit emails an activation link to that address. Inquiries are only delivered after the link has been clicked.

## Useful commands

```bash
npx expo start
npx expo start --android
npx expo start --ios
npx expo start --web
npx tsc --noEmit
```

## App overview

The app is designed to help Adventure Escape SA present its services professionally and provide a simple customer booking flow for outdoor experiences in the Western Cape.
