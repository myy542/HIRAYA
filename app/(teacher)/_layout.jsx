// app/(teacher)/_layout.jsx - Teacher Portal Layout
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../src/theme';

export default function TeacherLayout() {
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
      <Stack.Screen name="dashboard" options={{ title: 'Teacher Portal' }} />
    </Stack>
  );
}
