import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FirstOnBoardingIMG from '../../assets/FirstOnBoardingIMG';
import SecondOnBoardingIMG from '../../assets/SecondOnBoardingIMG';
import ThirdOnBoardingIMG from '../../assets/ThirdOnBoardingIMG';

const {width, height} = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: <FirstOnBoardingIMG/>,
        title: 'what2cook',
        subtitle: 'Cùng nấu ăn nào\n',
    },
    {
        id: '2',
        image: <SecondOnBoardingIMG/>,
        title: 'Xác định nguyên liệu',
        subtitle: 'Thông tin chi tiết về nguyên liệu\ntừ hình ảnh bạn cung cấp',
    },
    {
        id: '3',
        image: <ThirdOnBoardingIMG/>,
        title: 'Khám phá công thức',
        subtitle: 'Hướng dẫn bạn nấu\nnhững món ăn siêu ngon và đơn giản',
    },
];

const Slide = ({item}) => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width, resizeMode: 'contain'}}>
            </View>
            <View>
                {item.image}
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.subtitle}</Text>
            </View>
        </View>
    );
};

export default Onboarding = ({ navigation }) => {
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
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        const offset = lastSlideIndex * width;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
    };

    const Footer = () => {
        return (
            <View
                style={{
                    height: height * 0.25,
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                }}
            >
                {/* Indicator container */}
                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                {/* Render indicator */}
                {slides.map((_, index) => (
                    <View
                    key={index}
                    style={[
                        styles.indicator,
                        currentSlideIndex == index && {
                        backgroundColor: '#fff',
                        width: 25,
                        },
                    ]}
                    />
                ))}
                </View>

                {/* Render buttons */}
                <View style={{marginBottom: 20}}>
                {currentSlideIndex == slides.length - 1 ? (
                    <View style={{height: 50}}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.btnText}>
                        Bắt Đầu
                        </Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                            styles.btn,
                            {
                                borderColor: '#fff',
                                borderWidth: 1,
                                backgroundColor: 'transparent',
                            },
                            ]}
                            onPress={skip}
                        >
                            <Text style={styles.btnText}>
                            Bỏ Qua
                            </Text>
                        </TouchableOpacity>
                        <View style={{width: 15}} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={goToNextSlide}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>
                            Tiếp Theo
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient
            colors={['#FF5C01', 'rgba(255,92,0,0.6)','rgba(128,48,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)', 'transparent']}
            style={styles.background}
        />
        <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={slides}
            pagingEnabled
            renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
    },
    subtitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 23,
        marginTop: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 16,
        backgroundColor: '#C67C4E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    }
});