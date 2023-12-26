import React, { Component, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Avatar, Button } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';




export default Profile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        username: null,
        email: null,
        phone: null,
        password: null
    })

    const handleProfile = async () => {
        const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.get('http://192.168.0.106:5000/auth')
            .then(res => {
                console.log(res.data)
                const data = res.data.user
                setProfile({
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: 'xxxxxxxx'
                })
            })
            .catch(error => console.log(error))

    }
    useEffect(() => {
        handleProfile()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.avatarContainer}>
                <Avatar.Image
                    size={150}
                    source={{ uri: 'https://img.ws.mms.shopee.vn/4ecc0b21d86d2ff90688c0c28cc6ad0a' }}
                />
                <Text style={{ fontSize: 24, fontWeight: '500', padding: 10, textAlign: 'center', textTransform: 'capitalize' }}>
                    {profile.username}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <View style={{ marginRight: 15 }}>
                        <Feather name="user" size={25} color="#000" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{profile.username}</Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={{ marginRight: 15 }}>
                        <Feather name="phone" size={25} color="#000" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{profile.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={{ marginRight: 15 }}>
                        <Feather name="mail" size={25} color="#000" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{profile.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={{ marginRight: 15 }}>
                        <Feather name="lock" size={25} color="#000" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{profile.password}</Text>
                </View>
            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                >
                    <View style={{ marginRight: 15 }}>
                        <Feather name="log-out" size={25} color="#fff" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '500', textTransform: 'capitalize', color: '#fff' }}>Đăng xuất</Text>
                </TouchableOpacity>
                <View></View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    infoContainer: {
        marginHorizontal: 40,
        marginVertical: 40,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    logoutContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 40,
        marginVertical: 40,

    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#C67C4D",
        padding: 14,
        borderRadius: 10,
        width: '50%'
    }
});