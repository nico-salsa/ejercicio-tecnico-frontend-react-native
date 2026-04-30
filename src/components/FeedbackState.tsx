import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface FeedbackStateProps {
  actionLabel?: string;
  message: string;
  onPress?: () => void;
  title: string;
}

export function FeedbackState({
  actionLabel,
  message,
  onPress,
  title,
}: FeedbackStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onPress ? (
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 36,
    padding: 24,
  },
  message: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  title: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
});
