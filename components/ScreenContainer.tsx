import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

const ScreenContainer: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  container: {
    flex: 1,
  },
});
