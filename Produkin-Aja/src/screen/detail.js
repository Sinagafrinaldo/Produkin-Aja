import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Detail = ({ route, navigation }) => {
    const { nama, harga, deskripsi, rating, jumlah_ulasan, terjual, link_gambar, lokasi } = route.params

    const [deskripsi1, setDeskripsi1] = useState('');
    const [Data, setData] = useState([])
    const createData = (nama, harga, deskripsi, rating, jumlah_ulasan, terjual, link_gambar, lokasi) => {

        Data.push({ nama: nama, harga: harga, deskripsi: deskripsi, rating: rating, jumlah_ulasan: jumlah_ulasan, terjual: terjual, link_gambar: link_gambar, lokasi: lokasi });
        setData(Data)


        saveData(Data)
    }
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

    const saveData = async (Data) => {
        try {
            await AsyncStorage.setItem('keranjang', JSON.stringify(Data))
        } catch (error) {
            console.log('Save error', error)
        }
    }
    const removeSpace = (tempString) => {

        // Replace All Space With Single Space.
        var result = tempString.replace(/\s+/g, ' ');

        // Replace All Space With NO Space.
        //var result = tempString.replace(/ /g, '');

        setDeskripsi1(result);

    }
    useEffect(() => {
        removeSpace(deskripsi)
        getData();
    }, [])

    return (
        <View style={{ flex: 1, }}>
            <ScrollView >
                <View style={styles.container}>
                    <Image
                        style={styles.stretch}
                        source={{ uri: link_gambar }}
                    />
                    <View style={styles.wrap1}>
                        <Text style={styles.judul}>{nama}</Text>
                        <Text style={styles.harga}>Rp. {harga}</Text>
                    </View>
                    {/* <Text>{'\n'}</Text> */}
                    <View style={{ borderBottomWidth: 1, marginTop: 5, borderColor: 'gray' }}></View>
                    <View style={styles.ulasan}>
                        <Image
                            style={styles.rating}
                            source={require('../../assets/Star.png')}
                        />
                        <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: 'poppins' }}>{rating}  </Text>
                        <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'poppins' }}>({jumlah_ulasan} ulasan)</Text>
                        <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: 'poppins' }}>    |    {terjual} </Text>
                        <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'poppins' }}>terjual.</Text>
                    </View>
                    <View style={styles.ulasan}>
                        <Image
                            style={styles.lokasi}
                            source={require('../../assets/lokasi.png')}
                        />
                        <Text style={{ fontSize: 16, fontFamily: 'poppins' }}>{lokasi}</Text>
                    </View>

                    <View style={{ borderBottomWidth: 1, marginTop: 10, borderColor: 'gray' }}></View>
                    <Text style={{ fontSize: 20, marginTop: 20, fontFamily: 'poppinsbold' }}>Deskripsi</Text>


                    <Text style={{ marginTop: 10, textAlign: 'justify', fontFamily: 'poppins' }}>{deskripsi1}</Text>

                </View>

            </ScrollView >
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Sukses Menambah ke Dalam Keranjang', 'Silahkan cek menu keranjang anda.')
                    createData(nama, harga, deskripsi, rating, jumlah_ulasan, terjual, link_gambar, lokasi)

                }}
                style={{ backgroundColor: '#1056c7', padding: 15, borderRadius: 100, position: 'absolute', bottom: 40, right: 40, display: 'flex', flexDirection: 'row' }}
            >

                <Feather name="plus" size={30} color="white" style={{}} />
                {/* <Feather name="shopping-cart" size={30} color="white" style={{}} /> */}


            </TouchableOpacity>
        </View>

    )
}


export default Detail

const styles = StyleSheet.create({
    stretch: {
        width: 300,
        height: 300,
        resizeMode: 'stretch',
        borderRadius: 5,
        alignSelf: 'center',

    },
    ulasan: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
        // justifyContent: 'space-between',
    },
    rating: {
        width: 27,
        height: 20,
        resizeMode: 'stretch',

    },
    lokasi: {
        width: 27,
        height: 27,
        resizeMode: 'stretch',
        marginLeft: -2,
    },
    judul: {
        fontSize: 18,
        maxWidth: 200,
        color: '#780041',
        fontFamily: 'poppinsbold',
    },
    container: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        paddingTop: 40,
        marginHorizontal: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // marginTop: 40
    },
    wrap1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    harga: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#272931',
        padding: 5,
        borderRadius: 5,
        maxHeight: 34,
        fontFamily: 'poppins',
        marginTop: 5
    },

})