# Ejercicio 1: React Issues

## Descripción

En este proyecto, desarrollaremos una aplicación en React que consulte la API de los issues del proyecto de React en GitHub y muestre un listado de los issues en la pantalla. La aplicación debe cumplir con las siguientes características:

1. Al cargar la página, se mostrará el listado de issues.
2. Cada ítem del listado deberá:
   - Mostrar el ID del issue.
   - Mostrar el título del issue.
   - Mostrar el nombre del usuario que abrió el issue.
3. Al hacer clic en un título, se deberá redirigir al enlace con el detalle del issue en GitHub.

### Plus:
- Mostrar los labels a los que pertenece cada issue (ejemplo: Status: Unconfirmed, React 18, etc.).
- Elaborar una barra de búsqueda que permita filtrar los resultados traídos por la API.

## Consideraciones

- Las llamadas a la API deberán estar dentro del hook de React `useEffect()`.
- El endpoint a utilizar con la información de los issues es: `https://api.github.com/repos/facebook/react/issues`.

## Ejemplo

Puedes ver un ejemplo funcional aquí: [React Issues App](https://josemiguelvazquez.github.io/react-issues-app/).

## Instalación

Para instalar y ejecutar la aplicación localmente, sigue estos pasos:

1. Clona este repositorio:
    ```sh
    git clone https://github.com/tu-usuario/react-issues-app.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd react-issues-app
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia la aplicación:
    ```sh
    npm start
    ```

## Uso

Al iniciar la aplicación, se mostrará una lista de los issues del proyecto React en GitHub. Puedes hacer clic en el título de cualquier issue para ir al detalle del issue en GitHub.

Para filtrar los issues, utiliza la barra de búsqueda en la parte superior de la página.

## Código de Ejemplo

A continuación, se muestra un ejemplo básico del componente principal que realiza las llamadas a la API y muestra los issues:

```jsx
import React, { useEffect, useState } from 'react';

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then(response => response.json())
      .then(data => setIssues(data));
  }, []);

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar issues"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
            <p>ID: {issue.id}</p>
            <p>Usuario: {issue.user.login}</p>
            <p>Labels: {issue.labels.map(label => label.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;
