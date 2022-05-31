import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Main from './screen/main';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Detail from './screen/detail';




const Stack = createStackNavigator();

const Container = () => {
    return (

        <Provider store={Store}>

            <Stack.Navigator initialRouteName="Beranda">
                <Stack.Screen options={{ headerShown: false }} name="Beranda" component={Main} />
                <Stack.Screen name="Detail"
                    options={{
                        // headerTransparent: true,
                        title: 'Detail Produk',
                        headerTitleAlign: 'center',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: 'gray', },
                        headerTitleStyle: { color: 'white' },
                        headerTitleStyle: {
                            fontFamily: 'poppinsbold',
                            alignSelf: 'center'
                        }
                    }}
                    component={Detail} />
            </Stack.Navigator>

        </Provider>
    )
}

export default Container