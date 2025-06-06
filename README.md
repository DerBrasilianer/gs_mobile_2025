# 🏕️ Gestão de Abrigos - Global Solution 2025

Aplicativo mobile desenvolvido em **React Native com Expo**, criado como solução para a **Global Solution** do 1º semestre de 2025, com o objetivo de facilitar o gerenciamento de abrigos, ocupantes, recursos e localizações em situações de emergência humanitária.

---

## 👨‍💻 Integrantes

- **Enzo Prado Soddano** – RM: 557937  
  [GitHub](https://github.com/DerBrasilianer)

- **Lucas Resende Lima** – RM: 556564  
  [GitHub](https://github.com/lucasresendelima)

- **Vinicius Prates Altafini** – RM: 559183  
  [GitHub](https://github.com/vinicius945)

---

## 📽️ Apresentação do Projeto

Vídeo de Demonstração no YouTube:  
🔗 **[Link para o vídeo](https://www.youtube.com/watch?v=SEU-LINK-AQUI)**

---

## 📱 Sobre o Projeto

Este aplicativo foi idealizado como uma solução digital para ajudar autoridades e organizações a **gerenciar abrigos temporários**, **organizar recursos** e **controlar a entrada e saída de ocupantes**, garantindo eficiência e agilidade no atendimento a populações afetadas por desastres naturais ou crises.

### Funcionalidades

- Cadastro, listagem, atualização e remoção de:
  - **Abrigos**
  - **Localizações**
  - **Ocupantes**
  - **Recursos**

- **Busca por ID** em todas as entidades, com múltiplas barras de pesquisa em abrigos e ocupantes.
- Dashboard com resumo das quantidades de dados em tempo real.
- Layout intuitivo com tema escuro e botões padronizados.
- Navegação fluida entre telas com **Drawer** e **Bottom Tabs**.

> Os dados são obtidos a partir de uma **API externa** utilizando Java e interagindo com um banco de dados.

---

## 🚀 Como Rodar o Projeto Localmente

### ✅ Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Expo CLI**
- **Emulador Android configurado** ou o **aplicativo Expo Go** instalado no celular

### 📦 Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SeuUsuario/gs_mobile_2025.git
   cd gs_mobile_2025
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Instale as bibliotecas de navegação**:
   ```bash
   npm install @react-navigation/native
   expo install react-native-screens react-native-safe-area-context
   npm install @react-navigation/drawer
   expo install react-native-gesture-handler react-native-reanimated
   npm install @react-navigation/bottom-tabs
   ```

4. **Outras bibliotecas utilizadas**:
   - Armazenamento local:
     ```bash
     expo install @react-native-async-storage/async-storage
     ```
   - Ícones:
     ```bash
     npm install @expo/vector-icons
     ```
   - Gráficos e SVG:
     ```bash
     npm install react-native-chart-kit react-native-svg
     ```
   - Tipagem e suporte a TypeScript:
     ```bash
     npm install --save-dev typescript @types/react @types/react-native
     ```

5. **Execute o projeto com Expo**:
   ```bash
   npx expo start
   ```

   **Execute o projeto na Web**:
   ```bash
   npm install react-dom react-native-web
   npm run web
   ```

6. **Abra no dispositivo ou emulador**:
   - **No celular**: escaneie o QR Code com o app **Expo Go**.
   - **No emulador**: pressione `a` (Android) ou `i` (iOS - somente em Mac).

---

## 🧩 Estrutura de Navegação

O app utiliza **Drawer Navigation** como estrutura principal:

- **Home (Dashboard)**
- **Abrigos**  
  (com abas: _Cadastrar_ / _Listar_)
- **Localizações**  
  (com abas: _Cadastrar_ / _Listar_)
- **Ocupantes**  
  (com abas: _Cadastrar_ / _Listar_)
- **Recursos**  
  (com abas: _Cadastrar_ / _Listar_)

---

## 📁 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **TypeScript**
- **Axios**
- **React Navigation (Drawer + Tabs)**
- **AsyncStorage**
- **React Native Chart Kit**
- **Componentes Funcionais com Hooks**
- **Estilo escuro customizado com StyleSheet**

---

## 🧪 Testado em

- Dispositivos **Android** com **Expo Go**
- **Emuladores Android Studio**

---

## 🎯 Objetivo da Global Solution

O projeto busca criar um **sistema móvel de gerenciamento humanitário**, aplicável em situações reais de desastres naturais, onde o controle de **recursos**, **pessoas** e **infraestrutura temporária** é vital para uma resposta rápida e organizada. O aplicativo simula as operações de um órgão público ou ONG responsável por coordenar o atendimento às vítimas em abrigos temporários.

---

> Projeto desenvolvido para a disciplina de **Global Solution** – FIAP | 1º semestre de 2025.
