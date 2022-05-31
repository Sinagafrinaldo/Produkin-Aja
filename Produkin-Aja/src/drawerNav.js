import React, { useState, useEffect } from 'react';
import { Button, View, Image, StyleSheet, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Container from './Container'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
function Keranjang({ navigation }) {
    const [Data, setData] = useState([])


    const saveData = async (Data) => {
        try {
            await AsyncStorage.setItem('keranjang', JSON.stringify(Data))
        } catch (error) {
            console.log('Save error', error)
        }
    }
    const deleteData = (Index) => {

        Data.splice(Index, 1)
        saveData(Data)
    }

    // console.log(Data)
    const getData = async () => {
        try {
            let isi_data = await AsyncStorage.getItem('keranjang')

            isi_data = JSON.parse(isi_data);
            if (isi_data !== null) {
                setData(isi_data)
            }
        } catch (error) {
            console.log('Save error', error)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    );
    return (
        <View style={{ flex: 1 }}>

            <FlatList
                contentContainerStyle={{ paddingBottom: 120 }}
                data={Data}
                renderItem={({ item, index }) => (
                    <View style={styles.wrap_main_item}>
                        <View style={styles.item}>
                            <Image
                                style={styles.stretch}
                                source={{ uri: item.link_gambar }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.title}>{((item.nama).length > 20) ?
                                    (((item.nama).substring(0, 20 - 3)) + '...') :
                                    item.nama}</Text>
                                <Text style={{ fontFamily: 'poppins' }} >Rp. {item.harga}</Text>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        style={styles.rating}
                                        source={require('../assets/Star.png')}
                                    />
                                    <Text style={{ fontFamily: 'poppins' }}>{item.rating}</Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        style={styles.lokasi}
                                        source={require('../assets/lokasi.png')}
                                    />

                                    <Text style={{ fontFamily: 'poppins' }}>{item.lokasi}</Text>
                                </View>
                            </View>

                            {/* <Text style={styles.title}>{item.deskripsi}</Text> */}
                        </View>

                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={{ color: 'white', backgroundColor: 'gray', padding: 10, borderRadius: 10, alignSelf: 'flex-end', position: 'absolute', bottom: 30, right: 20 }}
                onPress={() => {


                    Alert.alert('Sukses', 'Data berhasil dihapus dari keranjang..')
                    setData([])
                    saveData([])
                    navigation.navigate('Home')

                }}
            >
                <Text style={{ color: 'white' }} >Hapus Daftar Keranjang</Text>
            </TouchableOpacity>
        </View>
    );
}

function InfoApp({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require("../assets/icon.png")} style={{ width: 200, height: 200, borderRadius: 100 }} />
                </View>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#800a1d', fontFamily: 'poppinsbold' }}>Aplikasi ProdukinAja</Text>
                <Text style={{ textAlign: 'justify', marginTop: 10, fontFamily: 'poppins' }}>         Aplikasi ini merupakan aplikasi yang berfungsi menampilkan daftar produk yang tersedia dari sumber API yang telah dibuat dengan menggunakan framework Laravel. Laravel di hosting di situs heroku agar dapat di fetch dengan menggunakan konsep redux.</Text>
                <Text style={{ color: '#636262', fontSize: 16, fontFamily: 'poppinsbold', marginTop: 40 }}>Dibuat Oleh: </Text>
                <Text style={{ color: '#826791', fontSize: 16, fontFamily: 'poppins' }}>Frinaldo Sinaga | 119140064</Text>
                <Text style={{ color: '#826791', fontSize: 16, fontFamily: 'poppins' }}>Joy Ravelo Tarigan | 1119140037</Text>
            </View>
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: 'white',
                        width: 240,
                        paddingTop: 50,

                    },
                }}
                initialRouteName="Home">

                <Drawer.Screen name="Home" options={{ headerShown: false }}
                    component={Container} />
                {/* <Image source={require("../assets/icon.png")} style={{ width: 70, height: 70 }} /> */}
                <Drawer.Screen name="Info Aplikasi" options={{
                    // headerTransparent: true,
                    title: 'Info Aplikasi',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'gray', },
                    headerTitleStyle: { color: 'white' },
                    headerTitleStyle: {
                        fontFamily: 'poppinsbold',
                        alignSelf: 'center'
                    }
                }}
                    component={InfoApp} />
                <Drawer.Screen name="Keranjang" options={{
                    // headerTransparent: true,
                    title: 'Keranjang',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'gray', },
                    headerTitleStyle: { color: 'white' },
                    headerTitleStyle: {
                        fontFamily: 'poppinsbold',
                        alignSelf: 'center'
                    }
                }}
                    component={Keranjang} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

    container: {
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 2,
        backgroundColor: 'white',
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        height: '100%',
        width: '95%'

    },
    item: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 16,
        fontFamily: 'poppinsbold'
    },
    harga: {

    },
    rating: {
        width: 27,
        height: 20,
        resizeMode: 'stretch',
        marginLeft: -5,
    },
    lokasi: {
        width: 27,
        height: 27,
        resizeMode: 'stretch',
        marginLeft: -7,
    },

    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 5
    },
    wrap_main_item: {
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 2,
        backgroundColor: 'white',
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
})