import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    TextInput,

} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const widthHeight = Dimensions.get('window').height;

export default SignUp = ({ navigation }) => {
    const [username, setUsername] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const handleSignUp = async () => {
        await axios.post('http://192.168.0.106:5000/auth/register', { username, email, password, phone })
            .then(async res => {
                const token = res.data.accessToken
                await AsyncStorage.setItem('my-token', token);
            })
            .catch(error => console.log(error))

        navigation.navigate('HomeTabs')
    }

    return (
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{}}>
                <View style={{ width: '100%', height: '100%' }}>
                    {/* Title */}
                    <Text style={styles.title}>đăng kí</Text>

                    {/* Username & Phone & Email & Password Input */}
                    <View style={styles.inputContainer}>

                        {/* Username Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="user" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='ascii-capable'
                                placeholder='Họ Tên'
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setUsername}
                                value={username}
                            />
                        </View>

                        {/* Phone Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="phone" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='numeric'
                                placeholder='Số điện thoại'
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setPhone}
                                value={phone}
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="mail" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='email-address'
                                placeholder='Địa chỉ Email'
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="lock" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='visible-password'
                                placeholder='Mật khẩu'
                                secureTextEntry={!isVisible}
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity
                                style={styles.visibleButton}
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                <Feather name={isVisible ? 'eye' : 'eye-off'} size={20} color="#7C808D" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* LogIn Button & SignUp Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleSignUp}
                        >
                            <Text style={styles.signupButtonText}>đăng kí</Text>
                        </TouchableOpacity>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginContainerText}>Bạn đã có tài khoản?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LogIn')}
                            >
                                <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        textTransform: 'capitalize',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 0.2 * widthHeight,
    },
    inputContainer: {
        marginTop: 40,
        marginHorizontal: 40,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 1.5,
        paddingBottom: 10,
        borderBottomColor: "#eee",
        fontSize: 16,
    },
    visibleButton: {
        position: 'absolute',
        right: 0,
    },
    buttonContainer: {
        marginHorizontal: 40,
    },
    signupButton: {
        backgroundColor: "#C67C4D",
        padding: 14,
        borderRadius: 10,
        marginTop: 40,
    },
    signupButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        textTransform: 'capitalize',
    },
    loginContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
    },
    loginContainerText: {
        marginRight: 10,
        fontSize: 16,
        color: '#7C808D',
    },
    loginButtonText: {
        fontSize: 16,
        color: '#C67C4E',
        fontWeight: '500',
    },

});