import { View, StyleSheet } from 'react-native'
import React from 'react'
// import { StatusBar } from 'expo-status-bar'

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
        backgroundColor: 'lightgrey',
        padding: 20,
        flex: 1,
        alignItems: "center",
        gap: 20,
    }
})


export default Layout