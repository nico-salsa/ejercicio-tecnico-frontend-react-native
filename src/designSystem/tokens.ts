import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';

// Tokens fundacionales del sistema de diseno. Las pantallas los consumen
// a traves de primitivas para evitar estilos visuales repetidos.
export const colors = {
  accent: '#18315F',
  accentSoft: '#E5EAF5',
  background: '#FFFFFF',
  border: '#E5E7EB',
  borderSoft: '#E2E8F0',
  danger: '#DC2626',
  info: '#1D4ED8',
  surfaceMuted: '#F8FAFC',
  textInverse: '#FFFFFF',
  textMuted: '#64748B',
  textSoft: '#94A3B8',
  textStrong: '#111827',
  textSubtle: '#475569',
  warning: '#FACC15',
  warningText: '#A16207',
} as const;

export const spacing = {
  none: 0,
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 34,
  section: 40,
} as const;

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
} as const;

export const borders = {
  thin: 1,
} as const;

export const sizing = {
  detailLogoHeight: 96,
  detailLogoWidth: 100,
  headerMarkHeight: 12,
  headerMarkWidth: 15,
  listRowHeight: 66,
  touch: 46,
} as const;

export const shadows = StyleSheet.create({
  card: Platform.select<ViewStyle>({
    android: {
      elevation: 1,
    },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.04,
      shadowRadius: 6,
    },
  }),
});

export const typography = StyleSheet.create({
  body: {
    color: colors.textStrong,
    fontSize: 14,
  } satisfies TextStyle,
  bodyStrong: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: '600',
  } satisfies TextStyle,
  caption: {
    color: colors.textMuted,
    fontSize: 12,
  } satisfies TextStyle,
  field: {
    color: colors.textStrong,
    fontSize: 13,
  } satisfies TextStyle,
  heading: {
    color: colors.textStrong,
    fontSize: 30,
    fontWeight: '700',
  } satisfies TextStyle,
  headingSmall: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: '700',
  } satisfies TextStyle,
  label: {
    color: colors.textSubtle,
    fontSize: 13,
  } satisfies TextStyle,
  metric: {
    color: colors.textSoft,
    fontSize: 11,
  } satisfies TextStyle,
  link: {
    color: colors.info,
    fontSize: 13,
    fontWeight: '600',
  } satisfies TextStyle,
  overline: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  } satisfies TextStyle,
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
  } satisfies TextStyle,
});
