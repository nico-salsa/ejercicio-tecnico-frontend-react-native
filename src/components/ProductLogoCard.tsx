import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, radii, sizing, spacing} from '../designSystem';
import {isRemoteLogo} from '../utils/logo';

interface ProductLogoCardProps {
  logo: string;
}

export function ProductLogoCard({logo}: ProductLogoCardProps): React.JSX.Element {
  if (isRemoteLogo(logo)) {
    return <Image source={{uri: logo}} style={styles.image} />;
  }

  return (
    <View style={styles.placeholder}>
      <View style={styles.placeholderMark} />
      <Text style={styles.placeholderText}>Logo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: radii.sm,
    height: sizing.detailLogoHeight,
    resizeMode: 'cover',
    width: sizing.detailLogoWidth,
  },
  placeholder: {
    alignItems: 'flex-start',
    backgroundColor: colors.warning,
    borderRadius: radii.sm,
    height: sizing.detailLogoHeight,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    width: sizing.detailLogoWidth,
  },
  placeholderMark: {
    backgroundColor: colors.textInverse,
    height: 16,
    marginBottom: 14,
    width: 26,
  },
  placeholderText: {
    color: colors.warningText,
    fontSize: 12,
    fontWeight: '700',
  },
});
