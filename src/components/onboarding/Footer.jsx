import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react'
import { COLORS } from '../../constants';
import { slides } from '../../dummies/data';
import { ArrowRightIcon } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Footer = ({ currentSlideIndex, goToNextSlide }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width,
        backgroundColor: 'transparent',
        position: 'absolute',
        alignItems: 'center',
        bottom: 70,
      }}>
      {/* Indicator container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          borderRadius: 100,
        }}>
        {/* Render indicator */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: COLORS.gray,
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex == slides.length - 1 ? (
          <>
            <TouchableOpacity
              style={{
                height: 50,
                width: width - 200,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 25,
              }}
              onPress={() => navigation.replace('Home')}>
              <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: COLORS.white,
                    marginLeft: -10,
                  }}>
                  Masuk
                </Text>
                <Image
                  source={ArrowRightIcon}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    left: 50,
                  }}
                />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={goToNextSlide}
              style={{
                height: 50,
                width: width - 200,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 25,
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: COLORS.white,
                    marginLeft: -10,
                  }}>
                  Lanjut
                </Text>
                <Image
                  source={ArrowRightIcon}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    left: 50,
                  }}
                />
              </View>

            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 3,
    borderRadius: 50,
  },
});

export default Footer