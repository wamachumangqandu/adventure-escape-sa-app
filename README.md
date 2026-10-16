# Adventure Escape SA App

An Expo and React Native mobile app for exploring Adventure Escape SA and its guided outdoor activities across Cape Town and the Western Cape.

## Features

- Home screen with the company overview, mission, and featured experiences
- About screen with the company story and values
- Adventures screen with package and individual activity details and prices
- Contact screen with an inquiry form and business contact information
- Booking calculation logic with quantity-based discounts
- Bottom tab navigation between Home, About, Adventures, and Contact
- Mobile-first design for Expo app experiences

## Booking discount logic

The Contact screen calculates the total cost based on the selected package and the number of bookings:

- 1 booking: 0% discount
- 2 bookings: 5% discount
- 3 bookings: 10% discount
- 4 or more bookings: 15% discount

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

## Booking form status

The Contact screen provides a booking inquiry interface with the calculation summary, but the Submit button is disabled. No booking data is sent or stored yet; connecting a backend or form service would be the next step.

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
