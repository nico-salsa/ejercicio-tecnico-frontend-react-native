import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {ProductLogoCard} from '../components/ProductLogoCard';
import {ScreenLayout} from '../components/ScreenLayout';
import {AppButton, AppText, spacing} from '../designSystem';
import type {FinancialProduct} from '../types/financialProduct';
import {formatProductDate} from '../utils/date';

interface ProductDetailScreenProps {
  onBack: () => void;
  product: FinancialProduct;
}

interface DetailRowProps {
  label: string;
  value?: React.ReactNode;
}

function DetailRow({label, value}: DetailRowProps): React.JSX.Element {
  return (
    <View style={styles.detailRow}>
      <AppText style={styles.detailLabel} variant="label">
        {label}
      </AppText>
      <View style={styles.detailValueWrapper}>
        {typeof value === 'string' ? (
          <AppText style={styles.detailValue} variant="bodyStrong">
            {value}
          </AppText>
        ) : (
          value
        )}
      </View>
    </View>
  );
}

export function ProductDetailScreen({
  onBack,
  product,
}: ProductDetailScreenProps): React.JSX.Element {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText onPress={onBack} style={styles.backText} variant="link">
          ‹ Volver
        </AppText>

        <AppText style={styles.heading} variant="heading">
          ID: {product.id}
        </AppText>
        <AppText variant="subtitle">Información extra</AppText>

        <View style={styles.section}>
          <DetailRow label="Nombre" value={product.name} />
          <DetailRow label="Descripción" value={product.description} />
          <DetailRow label="Logo" value={<ProductLogoCard logo={product.logo} />} />
          <DetailRow
            label="Fecha liberación"
            value={formatProductDate(product.date_release)}
          />
          <DetailRow
            label="Fecha revisión"
            value={formatProductDate(product.date_revision)}
          />
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <AppButton disabled label="Editar" variant="secondary" />
        <AppButton disabled label="Eliminar" variant="danger" />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
    paddingBottom: 18,
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
  },
  backText: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  content: {
    paddingBottom: 24,
  },
  detailLabel: {
    width: 104,
  },
  detailRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailValue: {
    textAlign: 'right',
  },
  detailValueWrapper: {
    alignItems: 'flex-end',
    flex: 1,
  },
  heading: {
    marginBottom: 4,
  },
  section: {
    marginTop: spacing.xxxl,
  },
});
