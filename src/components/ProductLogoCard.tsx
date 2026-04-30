import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

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
    borderRadius: 4,
    height: 96,
    resizeMode: 'cover',
    width: 100,
  },
  placeholder: {
    alignItems: 'flex-start',
    backgroundColor: '#FACC15',
    borderRadius: 4,
    height: 96,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: 100,
  },
  placeholderMark: {
    backgroundColor: '#FFFFFF',
    height: 16,
    marginBottom: 14,
    width: 26,
  },
  placeholderText: {
    color: '#A16207',
    fontSize: 12,
    fontWeight: '700',
  },
});
