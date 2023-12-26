import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button
} from 'react-native';
import Onboarding from "./Onboarding";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";
import TakeAPicScreen from "./TakeAPicScreen";
import Favourite from "./Favourite";
import DetailItem from "./DetailItem"
import Meal from "./Meal";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { } from 'react-native-screens'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation }) => {
    return (
        <Tab.Navigator screenOptions={{
            headerTitleAlign: 'center',
            tabBarActiveTintColor: '#C67C4D',
            headerTitleStyle: {
                fontWeight: '700',
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName = focused ? 'home-sharp' : 'home-outline';

                    return <Ionicons name={iconName} size={25} color={color} />
                },
                tabBarLabel: 'Trang chủ',
            }} />
            <Tab.Screen name="TakeAPicScreen" component={TakeAPicScreen} options={{
                tabBarIcon: ({ focused, color }) => {
                    let iconName = focused ? 'camera' : 'camera-outline';

                    return <Ionicons name={iconName} size={28} color={color} />
                },
                tabBarLabel: 'Máy ảnh',
                headerTitle: "Máy ảnh",

                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Feather name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                )
            }} />
            <Tab.Screen name="Favourite" component={Favourite} options={{
                tabBarIcon: ({ focused, color }) => {
                    let iconName = focused ? 'heart' : 'heart-outline';

                    return <Ionicons name={iconName} size={25} color={color} />
                },
                tabBarLabel: 'Yêu thích',
                headerTitle: "Món ăn yêu thích",
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Feather name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused, color }) => {
                    let iconName = focused ? 'person' : 'person-outline';

                    return <Ionicons name={iconName} size={25} color={color} />
                },
                tabBarLabel: 'Cá nhân',
                headerTitle: "Thông tin cá nhân",
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Feather name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 15 }}
                        onPress={{}}
                    >
                        <Feather name="edit" size={25} color="black" />
                    </TouchableOpacity>
                )
            }} />
        </Tab.Navigator>
    );
}

export default RootComponent = function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LogIn">
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
                <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="HomeTabs" component={MyTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="DetailItem" component={DetailItem} options={{ headerShown: false }} />
                <Stack.Screen name="Meal" component={Meal} options={{ headerShown: false }} />
                <Stack.Screen name="Favourite" component={Favourite} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}