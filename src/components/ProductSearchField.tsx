import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export function ProductSearchField(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 6,
    borderWidth: 1,
    color: '#111827',
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
