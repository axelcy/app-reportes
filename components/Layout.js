import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Layout = ({children}) => {

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#ffffff'/> */}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c4c4c4',
        padding: 20,
        flex: 1,
        alignItems: "center",
    }
})


export default Layout