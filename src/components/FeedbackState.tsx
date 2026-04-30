import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton, AppText, Surface, colors, spacing} from '../designSystem';

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
    <Surface padded style={styles.container} variant="muted">
      <AppText style={styles.title} variant="headingSmall">
        {title}
      </AppText>
      <AppText style={styles.message}>{message}</AppText>
      {actionLabel && onPress ? (
        <AppButton label={actionLabel} onPress={onPress} />
      ) : null}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
  },
  message: {
    color: colors.textSubtle,
    lineHeight: 20,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
});
