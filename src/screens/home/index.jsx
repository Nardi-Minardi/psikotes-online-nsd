import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';

const HomeScreen = () => {
    const navigation = useNavigation();
    const webviewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('https://nsd.id/auth');

    const loading = () => <ActivityIndicator 
        color={COLORS.primary}
        size="large"
        style={styles.loading}
    />

    const backAction = () => {
        if(canGoBack) {
            webviewRef.current.goBack()
        } else {
            // navigation.goBack()
            //exit app
            BackHandler.exitApp()
        }

        return true;
    }

    const fowardAction = () => {
        if(webviewRef.current) webviewRef.current.goForward()
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [canGoBack])

    return (
        <>
        <WebView
            ref={webviewRef}
            source={{uri: currentUrl}}
            startInLoadingState
            renderLoading={loading}
            onNavigationStateChange={navState => {
                setCanGoBack(navState.canGoBack);
                setCanGoForward(navState.canGoForward);
                setCurrentUrl(navState.url);
            }}
            userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36"
            originWhitelist={['*']}
        />
        {/* <View style={styles.navigationContainer}>
            <TouchableOpacity disabled={!canGoBack} onPress={backAction}>
                <Text style={[styles.btn, !canGoBack && {color: '#666666'}]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!canGoForward} onPress={fowardAction}>
                <Text style={[styles.btn, !canGoForward && {color: '#666666'}]}>Forward</Text>
            </TouchableOpacity>
        </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    navigationContainer: {
        backgroundColor: '#ffd233',
        padding: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    btn: {
        color: '#000',
        fontSize: 18
    }
})

export default HomeScreen;