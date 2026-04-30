import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {FeedbackState} from '../components/FeedbackState';
import {ProductFormField} from '../components/ProductFormField';
import {ScreenLayout} from '../components/ScreenLayout';
import {AppButton, AppText, spacing} from '../designSystem';
import {
  calculateRevisionDate,
  createInitialProductFormValues,
  hasProductFormErrors,
  type ProductFormErrors,
  type ProductFormValues,
  validateProductForm,
} from '../utils/productForm';

interface ProductFormScreenProps {
  heading: string;
  initialValues?: ProductFormValues;
  isIdEditable?: boolean;
  onBack: () => void;
  onBeforeSubmit?: (values: ProductFormValues) => Promise<ProductFormErrors>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitErrorTitle: string;
  submitLabel: string;
}

export function ProductFormScreen({
  heading,
  initialValues,
  isIdEditable = true,
  onBack,
  onBeforeSubmit,
  onSubmit,
  submitErrorTitle,
  submitLabel,
}: ProductFormScreenProps): React.JSX.Element {
  const resolvedInitialValues = useMemo(
    () => initialValues ?? createInitialProductFormValues(),
    [initialValues],
  );
  const [values, setValues] = useState<ProductFormValues>(resolvedInitialValues);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expectedRevisionDate = useMemo(
    () => calculateRevisionDate(values.date_release),
    [values.date_release],
  );

  function updateField<K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) {
    setValues(currentValues => {
      const nextValues = {
        ...currentValues,
        [field]: value,
      };

      if (field === 'date_release') {
        nextValues.date_revision = calculateRevisionDate(value);
      }

      return nextValues;
    });

    setErrors(currentErrors => {
      const nextErrors = {...currentErrors};
      delete nextErrors[field];

      if (field === 'date_release') {
        delete nextErrors.date_revision;
      }

      return nextErrors;
    });
    setSubmitError(null);
  }

  function resetForm() {
    setValues(resolvedInitialValues);
    setErrors({});
    setSubmitError(null);
  }

  async function handleSubmit() {
    setSubmitError(null);

    const localErrors = validateProductForm(values);

    if (hasProductFormErrors(localErrors)) {
      setErrors(localErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      if (onBeforeSubmit) {
        const preSubmitErrors = await onBeforeSubmit(values);

        if (hasProductFormErrors(preSubmitErrors)) {
          setErrors(preSubmitErrors);
          return;
        }
      }

      await onSubmit(values);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Ocurrio un error inesperado al procesar el formulario.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText onPress={onBack} style={styles.backText} variant="link">
          {'< Volver'}
        </AppText>

        <AppText style={styles.heading} variant="heading">
          {heading}
        </AppText>

        <View style={styles.formCard}>
          <ProductFormField
            autoCapitalize="none"
            editable={isIdEditable}
            error={errors.id}
            label="ID"
            onChangeText={value => updateField('id', value)}
            placeholder="Ingresa el id"
            testID="product-form-id"
            value={values.id}
          />
          <ProductFormField
            error={errors.name}
            label="Nombre"
            onChangeText={value => updateField('name', value)}
            placeholder="Ingresa el nombre"
            testID="product-form-name"
            value={values.name}
          />
          <ProductFormField
            error={errors.description}
            label="Descripcion"
            multiline
            numberOfLines={4}
            onChangeText={value => updateField('description', value)}
            placeholder="Ingresa la descripcion"
            testID="product-form-description"
            value={values.description}
          />
          <ProductFormField
            autoCapitalize="none"
            error={errors.logo}
            label="Logo"
            onChangeText={value => updateField('logo', value)}
            placeholder="Ingresa la URL del logo"
            testID="product-form-logo"
            value={values.logo}
          />
          <ProductFormField
            autoCapitalize="none"
            error={errors.date_release}
            label="Fecha Liberacion"
            onChangeText={value => updateField('date_release', value)}
            placeholder="YYYY-MM-DD"
            testID="product-form-date-release"
            value={values.date_release}
          />
          <ProductFormField
            autoCapitalize="none"
            editable={false}
            error={errors.date_revision}
            label="Fecha Revision"
            placeholder="YYYY-MM-DD"
            testID="product-form-date-revision"
            value={values.date_revision}
          />
          {expectedRevisionDate ? (
            <AppText style={styles.helperText} variant="caption">
              Fecha de revision calculada: {expectedRevisionDate}
            </AppText>
          ) : null}
        </View>

        {submitError ? (
          <FeedbackState message={submitError} title={submitErrorTitle} />
        ) : null}
      </ScrollView>

      <View style={styles.actions}>
        <AppButton
          disabled={isSubmitting}
          label={isSubmitting ? `${submitLabel}...` : submitLabel}
          onPress={() => {
            void handleSubmit();
          }}
          testID="product-form-submit"
        />
        <AppButton
          disabled={isSubmitting}
          label="Reiniciar"
          onPress={resetForm}
          testID="product-form-reset"
          variant="secondary"
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    paddingBottom: 18,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  backText: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  formCard: {
    marginTop: spacing.xl,
  },
  heading: {
    marginBottom: spacing.sm,
  },
  helperText: {
    marginTop: -spacing.sm,
  },
});
