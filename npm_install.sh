#!/bin/bash

# Install React Native dependencies
npm install react react-native

# Install React Navigation core and required dependencies
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

# Install Stack Navigator for navigation
npm install @react-navigation/stack

npm install @react-native-async-storage/async-storage

# Optional: Install TypeScript (if using TypeScript)
npm install typescript @types/react @types/react-native

echo "All dependencies have been installed using npm!"
