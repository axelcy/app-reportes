import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Layout from '../components/Layout'

const FormScreen = ({navigation}) => {

    const [reporte, setReporte] = useState({
        Nombre: "", Descripcion: "",
    })
    const handleChange = (name, value) => setReporte({...reporte, [name]: value})
    const handleSubmit = () => {
        // useFetch('/incidentes', {...reporte})
        console.log(reporte)
        navigation.navigate('ReportesScreen')
    }
    // useEffect(() => {
    //     const fetchData = async () => setReporte(await useFetch('/edificios'))
    //     fetchData()
    // }, [])
    return (
        <Layout>
            <Text style={styles.titulo}>Crea tu reporte{"\n"}</Text>
            <TextInput style={styles.input} placeholder='Nombre' 
                onChangeText={text => handleChange('Nombre', text)}
            />
            <TextInput style={styles.input} placeholder='Descripcion' 
                onChangeText={text => handleChange('Descripcion', text)}
            />
            <TouchableOpacity style={styles.buttonSaveContainer}>
                <Text style={styles.buttonSave} onPress={handleSubmit}>Reportar</Text>
            </TouchableOpacity>
            <Text>{JSON.stringify(reporte)}</Text>
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