import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Layout from '../components/Layout'

const FormScreen = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => setData(await useFetch('/edificios'))
        fetchData()
    }, [])
    return (
        <Layout>
            <Text style={styles.titulo}>Crea tu reporte{"\n"}</Text>
            <TextInput style={styles.input} placeholder='Nombre'/>
            <TextInput style={styles.input} placeholder='Descripcion'/>
            <TouchableOpacity style={styles.buttonSaveContainer}>
                <Text style={styles.buttonSave}>Reportar</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        fontSize: 16,
        padding: 10,
        borderWidth: 3,
        borderColor: 'grey',
        borderRadius: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonSave: {
        fontSize: 20,
        textAlign: 'center',
    },
    buttonSaveContainer: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderWidth: 3,
        borderColor: 'darkcyan',
        borderRadius: 10,
        width: '100%',
    }
})

export default FormScreen