import { Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReportesScreen from './screens/ReportesScreen'
import FormScreen from './screens/FormScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='FormScreen' component={FormScreen}
          options={({navigation}) => ({
            title: "Reportar",
            headerStyle: {
              backgroundColor: 'lightcoral'
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('ReportesScreen')}>
                <Text>Mis reportes</Text>
              </TouchableOpacity>
            )
        })} />
        <Stack.Screen name='ReportesScreen' component={ReportesScreen}
          options={() => ({
            title: "Mis reportes",
            headerStyle: {
              backgroundColor: 'lightblue'
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App