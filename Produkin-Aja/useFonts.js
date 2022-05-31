import * as Font from 'expo-font';
const useFonts = async () =>
    await Font.loadAsync({
        poppins: require('./src/poppins/Poppins-Regular.ttf'),
        poppinsbold: require('./src/poppins/Poppins-Bold.ttf'),
    });

export default useFonts