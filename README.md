### Iniciar proyecto desde cero sin react
-Iniciamos instalando vite y seleccionamos , vanilla y JavaScript

```bash
npm create vite@latest
```

- instalamos el plugin de react

```bash
npm install @vitejs/plugin-react -E
```

- Instalamos las 2 dependencias de react

```bash
npm install react react-dom -E
```

- creamos el archivo de configuración de vite, ``vite.config.js``

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
})
```

- Cambiamos ``main.js`` a ``main.jsx`` tanto en el propio archivo como en la importación en el ``index.html``
- En el ``main.jsx`` creamos el punto de entrada obteniendo la id del _DOM_ ,creamos un elemento root y lo renderizamos en el _DOM_

```jsx
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- Instalamos el ``eslinter``

```bash
npm install standard -D      
```

- En package.json añadimos la configuración de eslint

```json
"eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
```

- Vamos a la ruta del extends en nuestro proyecto y en el ``eslintrc.json`` escribimos la regla para que no marque como error los punto y comas.

```json
{
  "extends": ["standard", "standard-jsx"],
  "rules": {
    "semi": ["error", "always"]
  }
}
```

- En el ``settings.json`` de VSC añadimos una linea para que se auto formatee al guardar:

```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
```

### Descripción Prueba técnica
APIs:
- Facts Random: https://catfact.ninja/fact
- Imagen random: https://cataas.com/cat/says/hello

- Recupera un hecho aleatorio de gatos de la primera API 
- Recupera la primera palabra del hecho
- Muestra una imagen de un gato con la primera palabra .

#### Cuerpo del proyecto
- Creamos el archivo ``App.jsx`` 

```jsx
export function App () {
  return (
    <h1>App de gatitos</h1>
  );
}
```

- lo importamos en el ``main.jsx``

```jsx
import { App } from './App.jsx';
```

#### Recuperamos un hecho aleatorio de gatos de la primera API

- la primera api "https://catfact.ninja/fact" devuelve un JSON con 2 clave/valor aleatorios:
```json
{
	"fact":"Tylenol and chocolate are both poisionous to cats.",
	"length":50
}
```

- Caso de uso con Promesa

![Pasted image 20240219073727](https://github.com/Mileccc/App_gatitos/assets/121825748/b7a85671-aaee-4b8c-8ccf-84de89eac2fe)


- Caso de uso con async/await
- 
![Pasted image 20240219075322](https://github.com/Mileccc/App_gatitos/assets/121825748/8e2bc343-7101-4345-9b0d-0d0563217040)

##### Recuperamos las tres primeras palabras

![Pasted image 20240219082458](https://github.com/Mileccc/App_gatitos/assets/121825748/a1260d86-e7f5-4e57-8c98-27e22e59123b)


- Ejemplo para recuperar las 3 primeras palabras:

```jsx
const firstWord = fact.split(' ').slice(0, 3).join(' ')
```
 o 
``` jsx
const firstWord = fact.split(' ', 3)
```


##### Petición a la segunda api 

![Pasted image 20240219090422](https://github.com/Mileccc/App_gatitos/assets/121825748/4c06f062-45b8-413e-bbd1-bcc17772eb29)

##### Centrar la imagen y un poco de estilo

- Alineado en columna
- 
![Pasted image 20240220072410](https://github.com/Mileccc/App_gatitos/assets/121825748/238a86ea-ee47-488c-ae53-3c29629a6c7a)

- Alineado en fila
- 
![Pasted image 20240220073039](https://github.com/Mileccc/App_gatitos/assets/121825748/2e8d859c-43ff-4412-ae52-8cac5ca81e86)

##### Dividir el hook useEffect en 2 useEffect
Utiliza dos `useEffect` hooks para gestionar la recuperación de datos de dos endpoints diferentes: uno para obtener un hecho aleatorio sobre gatos y otro para obtener una imagen de gato personalizada basada en las primeras tres palabras de ese hecho.

![Pasted image 20240220075548](https://github.com/Mileccc/App_gatitos/assets/121825748/4b8b65f9-3ea2-4d38-863c-f2721e112182)

#### Botón para refrescar los cambios

- Para ello refactorizaremos la funcionalidad del botón que es la misma que se encarga de recuperar un hecho aleatorio sobre gatos

![Pasted image 20240220111236](https://github.com/Mileccc/App_gatitos/assets/121825748/d0175efd-ad14-4409-9ed5-fa07fbf107a0)

- Otra manera de crear la función para el fact.js con promesas

```js
const CAT_ENDPOINT_RANDOM_FACTS = 'https://catfact.ninja/fact';

export const getRandomFact = () => {
    return fetch(CAT_ENDPOINT_RANDOM_FACTS)
      .then(res => res.json())
      .then(data => {
        const { fact } = data;
        return fact;
      });
  };
```

1. **Primer `return` (la llamada a `fetch`)**: El primer `return` devuelve el resultado de la llamada a `fetch(CAT_ENDPOINT_RANDOM_FACTS)`. `fetch` es una función que realiza una solicitud HTTP y devuelve una promesa que eventualmente se resuelve con la respuesta de esa solicitud. Al retornar esta promesa, estás permitiendo que quien llame a `getRandomFact` pueda encadenar más operaciones (como `.then`) después de que se complete la solicitud HTTP. Esencialmente, estás exponiendo la promesa de `fetch` para que el código externo pueda interactuar con ella.
    
2. **Segundo `return` (dentro del segundo `.then`)**: Dentro de la cadena de promesas, después de convertir la respuesta a JSON con `res.json()`, usas otro `.then` para trabajar con los datos convertidos (`data`). Aquí, extraes `fact` de `data` y luego lo devuelves. Este `return` no devuelve la promesa al código externo directamente; en su lugar, resuelve la promesa original de `fetch` con el valor de `fact`. Es decir, cambias el valor con el que se resuelve la promesa original: en lugar de resolverla con el objeto de respuesta completo o los datos JSON completos, resuelves la promesa con el valor específico de `fact` que extrajiste de los datos.
    

Al encadenar `.then` de esta manera y usar `return` dentro de ellos, estás transformando los datos a medida que pasan por la cadena de promesas. El primer `return` asegura que el resultado de `fetch` (la promesa) esté disponible para ser utilizado más adelante, mientras que el segundo `return` modifica los datos que finalmente se pasan a cualquier manejador `.then` que se haya agregado después de llamar a `getRandomFact`.


### Custom Hooks

#### Mover lógica para obtener la URL de la imagen

![Pasted image 20240221073007](https://github.com/Mileccc/App_gatitos/assets/121825748/a53ea7f5-12a9-47a8-a46c-562048578ea2)

- Extraerlo a un archivo separado:
- 
![Pasted image 20240221073646](https://github.com/Mileccc/App_gatitos/assets/121825748/d3739776-0b75-44e5-bcbf-da88c13ac70a)

#### Mover la lógica para obtener los Facts

![Pasted image 20240221080144](https://github.com/Mileccc/App_gatitos/assets/121825748/f39a0d39-1a8a-4c47-adbd-4c0f4ba6e12c)

![Pasted image 20240222072252](https://github.com/Mileccc/App_gatitos/assets/121825748/0aac4cdd-dff3-4a22-b5f8-fc03f064e2d9)

- Extraerlo a un archivo separado
- 
![Pasted image 20240222101817](https://github.com/Mileccc/App_gatitos/assets/121825748/15a0052f-3c4d-4711-a846-cb213cfe5c29)

#### Añadir nuevo componente y retornar imageURL con concatenación

![Pasted image 20240222103500](https://github.com/Mileccc/App_gatitos/assets/121825748/1ffa539f-1a9c-4d9c-8ab3-633a660de334)

![Pasted image 20240225073059](https://github.com/Mileccc/App_gatitos/assets/121825748/a8f9eae0-d1b0-487b-8425-7bae230b1135)
