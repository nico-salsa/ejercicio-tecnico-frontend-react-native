import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export function LoadingState(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#1D4ED8" size="small" />
      <Text style={styles.text}>Cargando productos financieros...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  text: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 12,
  },
});
