import { View, Text, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import FormScreen from './FormScreen'
import Layout from '../components/Layout'

const ReportesScreen = () => {

    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        const fetchData = async () => setData(await useFetch('/incidentes'))
        fetchData()
    }, [])
    const handleRefresh = async() => {
        setRefreshing(true)
        setData(await useFetch('/edificios'))
        setRefreshing(false)
    }
    return (
        <Layout>
            <Text>Todos los reportes</Text>
            {/* <Text>{data && JSON.stringify(data)}</Text> */}
            <FlatList refreshControl={
                <RefreshControl onRefresh={async() => await handleRefresh()} 
                    // colors={['lightcoral']}
                    progressBackgroundColor={'lightblue'}
                    refreshing={refreshing}
                />
            }
              data={data}
              renderItem={({item}) => <Text key={item.Id}>{item.Id}. {item.Descripcion}</Text>}
            />
        </Layout>
    )
}

export default ReportesScreen