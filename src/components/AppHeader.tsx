import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({title = 'BANCO'}: AppHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeMark}>◫</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  badgeMark: {
    color: '#1E3A8A',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
