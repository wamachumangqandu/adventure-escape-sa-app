# Adventure Escape SA App

An Expo and React Native mobile app for exploring Adventure Escape SA and its guided outdoor activities in Cape Town and the Western Cape.

## Features

- Home screen with the company overview, mission, and featured experiences.
- About screen with the company story and values.
- Adventures screen with package and individual activity details and prices.
- Contact screen with an inquiry form and business contact information.
- Booking buttons carry the selected adventure into the Contact screen.
- Bottom tab navigation between Home, About, Adventures, and Contact.

## Requirements

- Node.js and npm.
- Expo Go on a device, or an Android/iOS simulator for native previews. iOS Simulator requires macOS.

## Run the app

From the project directory, install dependencies and start Expo:

```bash
npm install
npm start
```

To launch a specific target:

```bash
npm run web
npm run android
npm run ios
```

Use the Expo terminal menu to open the project on a connected device or simulator. The iOS command requires macOS and an available iOS Simulator or device.

## Project structure

```text
.
├── App.js
├── index.ts
├── app.json
├── screens/
│   ├── AboutScreen.js
│   ├── AdventuresScreen.js
│   ├── ContactScreen.js
│   └── HomeScreen.js
└── assets/
	└── images/
```

## Booking form status

The Contact screen currently provides a booking inquiry interface, but its Submit button is disabled. No booking data is sent or stored; connecting a backend or form service is still required.
