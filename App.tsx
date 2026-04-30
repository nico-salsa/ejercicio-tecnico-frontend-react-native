import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  formatGovernanceSummary,
  projectGovernance,
} from './src/config/projectGovernance';

function App(): React.JSX.Element {
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Frontend React Native listo</Text>
        <Text style={styles.subtitle}>{projectGovernance.stackLabel}</Text>
        <Text style={styles.body}>{formatGovernanceSummary()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    color: '#334155',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
