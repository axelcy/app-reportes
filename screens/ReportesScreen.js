import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import FormScreen from './FormScreen'

const ReportesScreen = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => setData(await useFetch('/edificios'))
        fetchData()
    }, [])
    return (
        <View>
            <Text>HomeScreen</Text>
            <Text>{data && JSON.stringify(data)}</Text>
        </View>
    )
}

export default ReportesScreen