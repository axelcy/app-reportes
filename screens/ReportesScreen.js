import { View, Text, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import FormScreen from './FormScreen'
import Layout from '../components/Layout'

const ReportesScreen = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => setData(await useFetch('/incidentes'))
        fetchData()
    }, [])
    return (
        <Layout>
            <Text>Todos los reportes</Text>
            {/* <Text>{data && JSON.stringify(data)}</Text> */}
            <FlatList
              data={data}
              renderItem={({item}) => <Text key={item.Id}>{item.Id}. {item.Descripcion}</Text>}
            />
        </Layout>
    )
}

export default ReportesScreen