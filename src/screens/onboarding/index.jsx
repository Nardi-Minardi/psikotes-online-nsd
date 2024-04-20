import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../constants';
import { slides } from '../../dummies/data';
import Footer from '../../components/onboarding/Footer';
import FloatLogoComp from '../../components/onboarding/FloatLogoComp';

const { width, height } = Dimensions.get('window');

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={item?.image}
        style={styles.image}
      />
      <View style={{ position: 'absolute', top: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={item.id === '1' ? styles.title1 : styles.title2}>
          {item?.title}
        </Text>
        <Text style={item.id === '1' ? styles.subtitle1 : styles.subtitle2}>
          {item?.subtitle}
        </Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
      />
      <FloatLogoComp />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  title1: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle1: {
    color: COLORS.subPrimary,
    fontSize: 20,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    fontWeight: 'bold',
  },
  title2: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle2: {
    color: COLORS.purple,
    fontSize: 28,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
  },
});
export default OnboardingScreen;