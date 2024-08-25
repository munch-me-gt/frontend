#!/bin/bash

# Install React Native dependencies
yarn add react react-native

# Install React Navigation core and required dependencies
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context

# Install Stack Navigator for navigation
yarn add @react-navigation/stack

# Optional: Install TypeScript (if using TypeScript)
yarn add typescript @types/react @types/react-native

echo "All dependencies have been installed using Yarn!"
