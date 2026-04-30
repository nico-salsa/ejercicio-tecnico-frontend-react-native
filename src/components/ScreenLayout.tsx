import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppHeader} from './AppHeader';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export function ScreenLayout({children}: ScreenLayoutProps): React.JSX.Element {
  return (
    <View style={styles.safeArea}>
      <AppHeader />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
});
