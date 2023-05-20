import { View, Text, FlatList, TextInput } from 'react-native'
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
            {/* <Text>FormScreen</Text> */}
            {/* <Text>{JSON.stringify(data)}</Text> */}
            <Text>Edificios:{"\n"}</Text>
            <FlatList
              data={data}
              // keyExtractor={({id}) => id}
              renderItem={({item}) => <Text key={item.id}>Edificio {item.Id}: {item.Descripcion}</Text>}
            />
            <TextInput />
        </Layout>
    )
}

export default FormScreen