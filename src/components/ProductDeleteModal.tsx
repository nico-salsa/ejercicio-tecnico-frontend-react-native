import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {AppButton, AppText, Surface, colors, radii, spacing} from '../designSystem';

interface ProductDeleteModalProps {
  error?: string | null;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  visible: boolean;
}

export function ProductDeleteModal({
  error = null,
  isLoading = false,
  onClose,
  onConfirm,
  productName,
  visible,
}: ProductDeleteModalProps): React.JSX.Element {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}>
      <View style={styles.overlay}>
        <Pressable
          onPress={onClose}
          style={styles.backdrop}
          testID="delete-modal-backdrop"
        />
        <Surface style={styles.sheet} variant="plain">
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={styles.closeButton}
              testID="close-delete-modal">
              <AppText style={styles.closeText} variant="headingSmall">
                ×
              </AppText>
            </Pressable>
          </View>

          <View style={styles.body}>
            <AppText style={styles.message} variant="headingSmall">
              {`¿Estas seguro de eliminar el producto ${productName}?`}
            </AppText>
            {error ? (
              <AppText style={styles.error} variant="caption">
                {error}
              </AppText>
            ) : null}
          </View>

          <View style={styles.actions}>
            <AppButton
              label={isLoading ? 'Eliminando...' : 'Eliminar'}
              onPress={onConfirm}
              testID="confirm-delete-product"
              variant="warning"
            />
            <AppButton
              disabled={isLoading}
              label="Cancelar"
              onPress={onClose}
              testID="cancel-delete-product"
              variant="secondary"
            />
          </View>
        </Surface>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    borderBottomColor: colors.border,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  closeButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  closeText: {
    color: colors.textMuted,
    lineHeight: 24,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  message: {
    lineHeight: 26,
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.52)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    overflow: 'hidden',
  },
});
