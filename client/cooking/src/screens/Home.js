import React, { Component, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    Pressable,
    TextInput
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import FindRecipesIMG from '../../assets/FindRecipesIMG';
// import { categoryData } from '../constants';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


export default Home = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = React.useState('Củ')
    const [categories, setCategories] = React.useState([])
    const [ingredients, setFoods] = React.useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        getCategories()
        // getFoods()
    }, [isFocused])

    const handleChangeCategory = (categoryName) => {
        setActiveCategory(categoryName)
        getFoods(categoryName)
    }

    const getCategories = async () => {
        const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.get('http://192.168.0.106:5000/user/ingredients')
            .then(res => {
                console.log(res.data)
                setCategories(res.data.data)
            })
            .catch(error => console.log(error))

        getFoods()
    }

    const getFoods = (categoryName) => {
        const category = categories.filter((cat) => cat.name === categoryName)

        if (category.length === 0) {
            setFoods(categories.filter((cat) => cat.name === 'Củ')[0].foodData)
        } else {
            console.log(category[0].foodData)
            setFoods(category[0].foodData)
        }
    }

    return (
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
            <StatusBar barStyle='auto' />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {/* Background Linear Gradient */}
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0.00, 1.00]}
                        colors={['#FFA573', '#212020']}
                        style={styles.background}
                    />

                    <View style={{ flex: 1 }}>
                        {/* Account */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 20 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Hà Thùy Dương</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Avatar.Image
                                    size={50}
                                    source={{ uri: 'https://img.ws.mms.shopee.vn/4ecc0b21d86d2ff90688c0c28cc6ad0a' }}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Take A Picture */}
                        <View style={styles.takeAPic}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => navigation.navigate('TakeAPicScreen')}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '700', marginRight: 10 }}>
                                    Chụp nguyên liệu
                                </Text>
                                <Ionicons name={"camera-outline"} size={28} color='#000' />
                            </TouchableOpacity>
                        </View>

                        {/* Find Recipes */}
                        <View style={{ marginTop: 45 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FindRecipesIMG />
                            </View>

                            <View style={styles.findRecipes}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '700', marginRight: 10 }}>
                                        Tìm món ăn
                                    </Text>
                                    <Ionicons name="search-outline" size={28} color='#000' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Categories */}
                        <View style={{ margin: 30, flexDirection: 'row', justifyContent: 'center' }}>
                            <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                        </View>

                        {/* Ingredient */}
                        <View style={{}}>
                            <Ingredients ingredients={ingredients} />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// Categories Component
function Categories({ categories, activeCategory, handleChangeCategory }) {
    function handleColor(cat) {
        if (cat.name === activeCategory) {
            return { backgroundColor: '#D86117', fontWeight: '700', color: '#fff' };
        }
        return { backgroundColor: '#F3F3F3', fontWeight: '600', color: '#000' };
    }

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    categories.map((cat, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.categoryButton,
                                    { backgroundColor: handleColor(cat).backgroundColor },
                                ]}
                                onPress={() => handleChangeCategory(cat.name)}
                            >
                                <Text style={[
                                    styles.categoriesText,
                                    { fontWeight: handleColor(cat).fontWeight },
                                    { color: handleColor(cat).color },]}
                                >
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

// Ingredients Component
function Ingredients({ ingredients }) {
    return (
        <View style={{ marginHorizontal: 30 }}>
            {
                ingredients.length == 0 ? null : (
                    <MasonryList
                        data={ingredients}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => <IngredientCard item={item} index={i} />}
                        onEndReachedThreshold={0.1}
                    />
                )
            }
        </View>
    );
};

function IngredientCard({ item, index }) {
    let isEven = index % 2 === 0;
    const hanleDelItem = async () => {
        const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.delete(`http://192.168.0.106:5000/user/ingredients/${item.id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <View>
            <Pressable style={[styles.card, { margingLeft: isEven ? 0 : 8.5 }, { marginRight: isEven ? 8.5 : 0 }]}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.title}
                    {/* {
                        item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name
                    } */}
                </Text>
                <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }}
                    onPress={hanleDelItem}
                >
                    <Ionicons name={"close-circle-outline"} size={28} color='#000' />
                </TouchableOpacity>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 280,
    },
    takeAPic: {
        backgroundColor: '#B3B3B1',
        opacity: 0.8,
        borderRadius: 10,
        padding: 15,
        alignSelf: 'center',
        marginTop: 30,
    },
    findRecipes: {
        backgroundColor: '#B3B3B1',
        opacity: 0.8,
        borderRadius: 10,
        marginHorizontal: '20%',
        paddingVertical: 15,
        position: 'absolute',
        alignSelf: 'center',
        top: 40
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignContent: 'space-between',
        marginRight: 8,
    },
    categoriesText: {
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'nowrap',
    },
    card: {
        paddingTop: 10,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
        marginBottom: 24,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
    itemImage: {
        width: 142,
        height: 132,
        borderRadius: 20,
    },
    itemName: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        flexWrap: 'wrap',
        paddingTop: 19,
        paddingBottom: 40,
    },
});