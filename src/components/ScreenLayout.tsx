import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ScreenContainer, spacing} from '../designSystem';
import {AppHeader} from './AppHeader';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export function ScreenLayout({children}: ScreenLayoutProps): React.JSX.Element {
  return (
    <ScreenContainer>
      <AppHeader />
      <View style={styles.content}>{children}</View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 18,
  },
});
