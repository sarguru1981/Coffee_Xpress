This documentation tells about the dependencies needs for the application with the details about the dependencies

| Dependency Name  | Description | Command |
| ------------- | ------------- | ------------- |
| Navigation  | Navigation between screens  | npm install @react-navigation/native  |
| Navigation  | Handling navigation  | npm install react-native-screens react-native-safe-area-context  |
| Stack Navigation  | Navigation between screens where each new screen is placed on top of a stack  | npm install @react-navigation/native-stack  |
| Bottom Tab  | A simple tab bar on the bottom of the screen  | npm install @react-navigation/bottom-tabs  |
| Vector Icons  | customizable vector icons  | npm i --save-dev @types/react-native-vector-icons  |
| ReAnimation  | ReAnimation (**See below for further setup**)  | npm i react-native-reanimated  |
| NativeWind  | NativeWind uses Tailwind CSS as scripting language to create a universal style system   | (**See below for further setup**)  |
| Linear Gradient  | Linear Gradient for element  | npm i react-native-linear-gradient  |
| Community Blue  | Blur Effect for element  | npm i @react-native-community/blur  |
| Lottie  | Animation  | npm i lottie-react-native  |
| Zustand  | State management  | npm i zustand  |
| Async Storage  | An asynchronous, unencrypted, persistent, key-value storage system for React Native.  | npm i @react-native-async-storage/async-storage  |
| Animatable  | Animation  | npm i react-native-animatable  |
| Immer  | Handling immutable data structures  | npm i immer  |

**Note:** New dependencies can be added in the future and will be modified here

### ReAnimation Setup

1. Add Reanimated's babel plugin
   Add react-native-reanimated/plugin plugin to your babel.config.js.

   ```javascript
   module.exports = {
      plugins: [
         ...
         'react-native-reanimated/plugin',
      ],
   };

**CAUTION:** __react-native-reanimated/plugin has to be listed last.__

2. Clear Metro bundler cache

   ```bash
   npm start -- --reset-cache

3. Platform specific setup (only for iOS)

   ```bash
   cd ios && pod install && cd ..

### NativeWind Setup

1. Install NativeWind plugin:

   ```bash
   npm install nativewind
   npm install --save-dev tailwindcss@3.3.2

2. Setup Tailwind CSS

   Run `npx tailwindcss init` to create a `tailwind.config.js` file

   ```javascript
   module.exports = {
   content: ["./App.{js,jsx,ts,tsx}", "./src/features/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {},
   },
   plugins: [],
   }

3. Add the Babel plugin

   ```javascript
   module.exports = {
      presets: [
         ... 
      ],
      plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
   };