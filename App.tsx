import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from './screens/HomeScreen';
import { IntegrantesScreen } from './screens/IntegrantesScreen';
import { LocalizacaoScreen } from './screens/Localizacao/LocalizacaoScreen';
import { AbrigoScreen } from './screens/Abrigo/AbrigoScreen';
import { OcupanteScreen } from './screens/Ocupante/OcupanteScreen';
import { RecursoScreen } from './screens/Recurso/RecursoScreen';

const { Screen, Navigator } = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000', // Fundo preto
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#5C0000' }, // Vermelho ainda mais escuro
          headerTintColor: '#FFFFFF', // Ícones e texto do header em branco
          drawerStyle: { backgroundColor: '#1a1a1a' }, // Gaveta escura
          drawerActiveTintColor: '#FF6347', // Tom de vermelho para item ativo
          drawerInactiveTintColor: '#CCCCCC', // Cinza claro para inativos
        }}
      >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Gestão de Localizações" component={LocalizacaoScreen} />
        <Screen name="Gestão de Abrigos" component={AbrigoScreen} />
        <Screen name="Gestão de Ocupantes" component={OcupanteScreen} />
        <Screen name="Gestão de Recursos" component={RecursoScreen} />
        <Screen name="Integrantes" component={IntegrantesScreen} />
      </Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
