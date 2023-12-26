import * as React from 'react';
import { StyleSheet, View, Alert, Text, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../../assets/back.svg';
import Trash from '../../assets/trash.svg'
import { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Meal({ navigation }) {

    const [data, setData] = useState({
        title: 'Bông cải xanh xào nấm',
        description: 'Bông cải xanh là một loại cây thuộc loài Cải bắp dại, có hoa lớn ở đầu, thường được dùng như rau. Bông cải xanh thường được chế biến bằng cách luộc hoặc hấp, nhưng cũng có thể được ăn sống như là rau sống trong những đĩa đồ nguội khai vị.',
        type: 'C'
    })
    const { title, description, type } = data

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    return (
        <SafeAreaView style={{ marginTop: 50, marginHorizontal: 30, flexDirection: 'column', justifyContent: 'space-around', flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 340 }}>
                <Back />
                <Text style={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', marginLeft: 80 }}>Món Ăn</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', height: 50, width: 290, borderRadius: 15 }}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ borderRadius: 10, height: 40, width: 140, backgroundColor: '#C67C4E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>Tên</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ borderRadius: 10, height: 40, width: 140, backgroundColor: '#EDEDED', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#2F2D2C'
                    }}>Công Thức</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={styles.preview} source={require('../data/meal1.png')} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold' }}>{title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: 220, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ borderRadius: 12, height: 30, width: 100, borderColor: '#C67C4E', borderWidth: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            fontWeight: 'semibold'
                        }}>Sửa Tên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ borderRadius: 12, height: 30, width: 100, borderColor: '#C67C4E', borderWidth: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            fontWeight: 'semibold'
                        }}>Ghi Chú</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ height: 0.5, width: 400, backgroundColor: '#2F2D2C' }} />
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', height: 200 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold' }}>Nguyên Liệu Bao Gồm</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto' }}>Bông Cải Xanh</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto' }}>Cà Rốt</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto' }}>Nấm Đông Cô</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto' }}>Hành Khô</Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.button}
                >
                    <Text style={{
                        fontSize: 16,
                        color: '#ffffff',
                        fontFamily: 'Roboto',
                    }}>Lưu Lại</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    preview: {
        resizeMode: 'contain',
        width: 200,
        borderRadius: 30,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#C67C4E',
        paddingLeft: 140,
        paddingRight: 140,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20
    },
});
