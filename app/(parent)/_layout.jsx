// app/(parent)/_layout.jsx - Parent Portal Layout
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../src/theme';

export default function ParentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="dashboard" options={{ title: 'Parent Portal' }} />
    </Stack>
  );
}
