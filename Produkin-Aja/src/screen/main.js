import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduk } from '../redux/actions';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

// import { SafeAreaView } from 'react-native-safe-area-context';


const Main = ({ navigation }) => {

    const { produk } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const [search, setSearch] = useState('');
    const data_proses = produk.data
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const searchFilterFunction = (text) => {
        if (text != '') {

            setMasterDataSource(data_proses)
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.nama
                    ? item.nama.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);

            setSearch(text);
        } else {
            setFilteredDataSource(data_proses);
            setSearch(text);
        }
    };

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            dispatch(getAllProduk());

        }
        return () => { unmounted = true };

    }, []);


    return (

        // <ScrollView>
        <View style={{ flex: 1, }}>
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require("../../assets/icon.png")} style={{ width: 40, height: 40, borderRadius: 100 }} />
                </View>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#800a1d', fontFamily: 'poppinsbold' }}>ProdukinAja</Text>
            </View>
            <View style={styles.wrap}>
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" size={30} color="black" />
                </TouchableOpacity>
                <View>
                    <TextInput
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        style={styles.box_cari}
                        placeholder='Cari Produk'
                    ></TextInput>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    search == '' && (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 120 }}
                            numColumns={2}
                            data={data_proses}

                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.wrap_main_item}
                                    onPress={() => {
                                        navigation.navigate('Detail', {
                                            nama: item.nama,
                                            harga: item.harga,
                                            deskripsi: item.deskripsi,
                                            rating: item.rating,
                                            jumlah_ulasan: item.jumlah_ulasan,
                                            terjual: item.terjual,
                                            link_gambar: item.link_gambar,
                                            lokasi: item.lokasi
                                        })
                                    }}
                                >

                                    <View style={styles.item}>
                                        <Image
                                            style={styles.stretch}
                                            source={{ uri: item.link_gambar }}
                                        />
                                        <View style={{ marginLeft: 5 }}>
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
                                                    source={require('../../assets/Star.png')}
                                                />
                                                <Text style={{ fontFamily: 'poppins' }}>{item.rating}</Text>
                                            </View>
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}>
                                                <Image
                                                    style={styles.lokasi}
                                                    source={require('../../assets/lokasi.png')}
                                                />

                                                <Text style={{ fontFamily: 'poppins' }}>{item.lokasi}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
                }

                {
                    search != '' && (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 120 }}
                            data={filteredDataSource}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.wrap_main_item}
                                    onPress={() => {
                                        navigation.navigate('Detail', {
                                            nama: item.nama,
                                            harga: item.harga,
                                            deskripsi: item.deskripsi,
                                            rating: item.rating,
                                            jumlah_ulasan: item.jumlah_ulasan,
                                            terjual: item.terjual,
                                            link_gambar: item.link_gambar,
                                            lokasi: item.lokasi
                                        })
                                    }}
                                >

                                    <View style={styles.item}>
                                        <Image
                                            style={styles.stretch}
                                            source={{ uri: item.link_gambar }}
                                        />
                                        <View style={{ marginLeft: 5 }}>
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
                                                    source={require('../../assets/Star.png')}
                                                />
                                                <Text style={{ fontFamily: 'poppins' }}>{item.rating}</Text>
                                            </View>
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}>
                                                <Image
                                                    style={styles.lokasi}
                                                    source={require('../../assets/lokasi.png')}
                                                />

                                                <Text style={{ fontFamily: 'poppins' }}>{item.lokasi}</Text>
                                            </View>
                                        </View>
                                        {/* <Text style={styles.title}>{item.deskripsi}</Text> */}

                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
                }
            </View>
        </View >

    )
}

export default Main


const styles = StyleSheet.create({
    item: {
        // flexDirection: 'row',
    },

    wrap: {
        // marginTop: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    wrap_main_item: {

        width: 160,
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 2,
        backgroundColor: 'white',
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    box_cari: {
        borderWidth: 1,
        minWidth: '80%',
        height: 35,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 5,
        fontFamily: 'poppins'
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
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: 'poppinsbold'
        // color: 'white'
    },
    stretch: {
        width: 120,
        height: 120,
        resizeMode: 'stretch',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 5
    },
})