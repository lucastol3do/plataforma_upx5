<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Plataforma de Treinamento Digital UPx5</h1>

<p>Este projeto é um aplicativo de cursos desenvolvido em React Native. Ele contém três telas principais: Home, Detalhes do Curso, e Pesquisa. Cada tela é acessível a partir de uma barra de navegação inferior, permitindo uma experiência de navegação simples e intuitiva.</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Home</strong>: Tela inicial que exibe uma lista de cursos populares.</li>
  <li><strong>Detalhes do Curso</strong>: Tela com informações detalhadas do curso, incluindo módulos e tempo de duração.</li>
  <li><strong>Pesquisa</strong>: Tela de busca que permite ao usuário procurar cursos com base em palavras-chave.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>React Native</strong>: Biblioteca para construção da interface mobile.</li>
  <li><strong>React Navigation</strong>: Biblioteca para navegação entre telas.</li>
  <li><strong>Expo</strong>: Ferramenta para desenvolvimento, compilação e publicação de aplicativos React Native.</li>
</ul>

<h2>Pré-requisitos</h2>
<p>Antes de começar, certifique-se de ter o seguinte instalado:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://docs.expo.dev/get-started/installation/">Expo CLI</a></li>
</ul>

<h2>Estrutura do Projeto</h2>
<ul>
  <li><strong>App.js</strong>: Contém a navegação principal do aplicativo com as configurações de navegação por abas e pilha.</li>
  <li><strong>screens/HomeScreen.js</strong>: Tela inicial do aplicativo, onde os cursos populares são exibidos.</li>
  <li><strong>screens/CourseDetailsScreen.js</strong>: Tela de detalhes de um curso específico, exibindo módulos e outras informações.</li>
  <li><strong>screens/SearchScreen.js</strong>: Tela de busca que permite a filtragem de cursos com base em palavras-chave.</li>
</ul>

<h2>Como Executar o Projeto</h2>
<ol>
  <li>Para iniciar o aplicativo em um ambiente de desenvolvimento, use o seguinte comando:
    <pre><code>npx expo start</code></pre>
  </li>
  <li>O Expo CLI abrirá uma página no navegador com um QR Code. Você pode escanear esse código com o aplicativo Expo Go em seu dispositivo Android ou iOS para visualizar o app no seu celular.</li>
</ol>

<h2>Estrutura do Código</h2>

<h3>App.js</h3>
<p>O <code>App.js</code> configura a navegação principal usando <code>react-navigation</code>. Ele define uma navegação por abas (<code>BottomTabNavigator</code>) com duas abas:</p>
<ul>
  <li><strong>HomeStack</strong>: Contém a tela Home e a tela de detalhes do curso.</li>
  <li><strong>Search</strong>: Contém a tela de pesquisa.</li>
</ul>

<h3>HomeScreen.js</h3>
<p>A tela inicial (<code>HomeScreen.js</code>) exibe uma lista de cursos populares. Cada item da lista é clicável e leva à tela de detalhes do curso.</p>

<h3>CourseDetailsScreen.js</h3>
<p>A tela de detalhes (<code>CourseDetailsScreen.js</code>) exibe informações detalhadas de um curso, incluindo módulos, duração e botão de início.</p>

<h3>SearchScreen.js</h3>
<p>A tela de busca (<code>SearchScreen.js</code>) permite que o usuário pesquise cursos digitando palavras-chave no campo 
