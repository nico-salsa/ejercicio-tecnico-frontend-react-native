import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ProductLogoCard} from '../components/ProductLogoCard';
import {ScreenLayout} from '../components/ScreenLayout';
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
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailValueWrapper}>
        {typeof value === 'string' ? (
          <Text style={styles.detailValue}>{value}</Text>
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
        <Pressable onPress={onBack} style={styles.backLink}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>

        <Text style={styles.heading}>ID: {product.id}</Text>
        <Text style={styles.subheading}>Información extra</Text>

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
        <Pressable disabled style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>
        <Pressable disabled style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
    paddingBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  backText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    paddingBottom: 24,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 4,
    justifyContent: 'center',
    minHeight: 46,
    opacity: 0.95,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  detailLabel: {
    color: '#4B5563',
    fontSize: 13,
    width: 104,
  },
  detailRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailValue: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  detailValueWrapper: {
    alignItems: 'flex-end',
    flex: 1,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: '#E5EAF5',
    borderRadius: 4,
    justifyContent: 'center',
    minHeight: 46,
  },
  editButtonText: {
    color: '#355089',
    fontSize: 14,
    fontWeight: '700',
  },
  heading: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  section: {
    marginTop: 34,
  },
  subheading: {
    color: '#6B7280',
    fontSize: 14,
  },
});
