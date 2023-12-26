import * as React from 'react';
import { StyleSheet, View, Alert, Text, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../../assets/back.svg';
import Trash from '../../assets/trash.svg'
import { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// require the module
// var RNFS = require('react-native-fs');
// var path = RNFS.DocumentDirectoryPath + '/test.txt';

export default function DetaiItem({ route, navigation }) {

    const [data, setData] = useState({
        title: 'Bông cải xanh',
        description: 'Bông cải xanh là một loại cây thuộc loài Cải bắp dại, có hoa lớn ở đầu, thường được dùng như rau. Bông cải xanh thường được chế biến bằng cách luộc hoặc hấp, nhưng cũng có thể được ăn sống như là rau sống trong những đĩa đồ nguội khai vị.',
        type: 'Củ'
    })
    const { title, description, type } = data
    const { photo } = route.params
    // console.log(photo.base64)

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    const saveItem = async () => {
        const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.post('http://192.168.0.106:5000/user/ingredients', { photo: `data:image/jpg;base64,${photo.base64}` })
            .then(res => console.log(res.data))
            .catch(error => console.log(error))

        navigation.navigate('Home')

        // let fileUri = FileSystem.documentDirectory + "text.txt";
        // console.log(fileUri)
        // await FileSystem.writeAsStringAsync(fileUri, photo, { encoding: FileSystem.EncodingType.UTF8 });

        // let result = null;
        // let content = await FileSystem.writeAsStringAsync(fileUri, photo.base64, { encoding: FileSystem.EncodingType.UTF8 }).then(function (data) {
        //     result = data;
        // }).catch(function (error) {
        //     console.log(error);
        // });
        // return result;
        // RNFS.writeFile(path, photo, 'utf8')
        //     .then((success) => {
        //         console.log('FILE WRITTEN!');
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
    }
    //192.168.0.103:8081

    return (
        <SafeAreaView style={{ marginTop: 50, marginHorizontal: 30, flexDirection: 'column', justifyContent: 'space-around', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Back />
                <Text style={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', marginLeft: 80 }}>Nguyên Liệu</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 24, fontFamily: 'Roboto', fontWeight: 'bold' }}>{title}</Text>
                <Trash />
            </View>
            <View style={{ height: 0.5, backgroundColor: 'grey' }} />
            <View>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold' }}>Mô Tả</Text>
                <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                    style={{ fontSize: 14, fontFamily: 'Roboto', color: '#9B9B9B', lineHeight: 22 }}>{description}</Text>

                {
                    lengthMore ? <Text
                        onPress={toggleNumberOfLines}
                        style={{ fontSize: 14, fontFamily: 'Roboto', marginTop: 5 }}>{textShown ? 'Rút Gọn' : 'Đọc Thêm'}</Text>
                        : null
                }
            </View>

            <View>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold' }}>
                    Phân Loại
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ borderRadius: 15, height: 40, width: 110, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                        }}>Chính</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ borderRadius: 15, height: 40, width: 110, backgroundColor: '#C67C4E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                        }}>Mặc Định</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ borderRadius: 15, height: 40, width: 110, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                        }}>Phụ</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={saveItem}
                        style={styles.button}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                        }}>Lưu Lại</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    preview: {
        resizeMode: 'contain',
        height: 300,
        width: 220,
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
