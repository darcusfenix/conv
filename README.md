# Single Page Application para Más Nómina

### MÓDULOS / CONTAINERS
    Estos son los módulos desarrollados en la SPA.
* Corresponsales
    * [X] Lista de corresponsales. Alta de corresponsal. Activar y descativar
        * Detalles del corresponsal
            * [X] Datos generales y capacidad de pago. Consulta y edición.
            * [ ] Contactos
            * [ ] Plazos
            * [ ] Sucursales
            * [X] Programaciones. Consulta y alta
            * [X] Niveles de puesto. Consulta, agregación y eliminación
            * [X] Dirección. Consulta, alta y edición.
* Catálogos
* Solicitudes
    * [ ] Crédito
    * [ ] Buzón
    
### APIS
    Esta sección se encuentra en src/api.
    Clases que heredan de Request. La clase Request contiene los atributos y métodos para realizar una petición con Axios.
    La definición de los métodos que una clase api debe tener son:
* get(): Solicita un array de registros. 
* getById(): Solicita un registro que cumpla el identificador. 
* getByEntidad(): Solicita un registro que cumpla la condición de la entidad. 
* create(): Solicita una creación de una entidad. 
* update(): Solicita una actualización de uno o más propiedades de un registro en específico. 
* remove(): Solicita una eliminación de un registro en específico. 
* changeStatus(): Solicita un cambio de estatus de un registro en específico. ** 


    ** No debreria existir, pero como el servicio está independiente se requiere.

### ASSETS
    Esta sección se encuentra en src/assets. Carpeta que contiene los recursos estáticos que utiliza la spa.
    Imágenes y estilos CSS.
```
.
├── /.idea                          #     
├── /node_modules                   # 
├── /src                            #  
│   ├── /assets                     # 
│   │   ├── /css                    # 
│   │   ├── /images                 # 
│   │   │   ├── logo_footer.png     # Imagen que se muestra en el footer del menú.
│   │   │   ├── logo_sif.png        # Imagen que se muestra en el header del menú. 
```
### CONSTANTS
    Esta sección se encuentra en src/constants. Carpeta que contiene archivos como constantes.
```
.
├── /.idea                          #     
├── /node_modules                   # 
├── /src                            #  
│   ├── /constants                  #  
│   │   ├── config.es6              # Contantes configuración peticiones rest
│   │   ├── drawerItems.es6         # Definición del menú. 
│   │   ├── routes.jsx              # Mapeo de vistas. Utiliza react-router@3.x 
```
### SERVICES
    Esta sección se encuentra en src/services. Carpeta que contiene clases con metodos estáticos para utilizar en
    cualquier container/componente en la spa. Objetivo de uso: reducir código. Cada método requiere la función dispatch
    que redux proporciona en el componente.
```
.
├── /.idea                          #     
├── /node_modules                   # 
├── /src                            #  
│   ├── /services                   #  
│   │   ├── index.es6               # Exporta e importa todos los servicios que están en esta carpeta.
│   │   ├── LinearProgress.es6      # Servicio que dispara al reducer el control del estado de la línea de progreso.
│   │   ├── Log.es6                 # Servicio para pintar en consola del browser. 
│   │   ├── PageProgress.es6        # Servicio que dispara al reducer el control del estado del spiner de progreso que oculta/bloquea toda la página. 
│   │   ├── SnackBar.es6            # Servicio que dispara al reducer el control del estodo y mensaje del snackbar. 
```

Ejemplos de uso:

```javascript

 // Servicio: LinearProgress.es6

    import {LinearProgress} from "../services/index";
 
    LinearProgress.show(dispatch);

    this.request().then((response) => {
        
        LinearProgress.hide(dispatch);
        
    });
```

```javascript

 // Servicio: PageProgress.es6

    import {PageProgress} from "../services/index";
 
    PageProgress.show(dispatch);

    this.request().then((response) => {
        
        PageProgress.hide(dispatch);
        
    });
```

```javascript

 // Servicio: SnackBar.es6
    
    import {SnackBar} from "../services/index";

    this.request().then((response) => {
        
        SnackBar.show(dispatch, "Registro agregado correctamente");
        
    });
```

```javascript
 // Servicio: Log.es6
 
    import {Log} from "../services/index";

    this.request().catch((error) => {
        
        Log.error(error);
        
    });
```
 
### COMPONENTES / WIDGETS:
    Estos son los componentes que re-utilizan los containers.
* Body
* DataTable
* Drawer
* FloatingActionButton
* Form
* Header
* IconMenu
* Modal
* ProgressBackground
* RowKeyValue
* Spinner
* ThemeFinanciera

##### Form
    Este componente pinta inputs. Requiere la definición de un formulario dado en el store de redux y una función para manejar el evento OnChange de 
    cada input. Inputs disponibles:

* Texto
* Select
* CheckBox
* Date

###### Cómo usar el componente.

```javascript

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {Form} from "./widgets/index";
import {chnageInputForm} from "./main/mainActions";

@connect((store) => {

    return {
        "formAddress": store.forms.direccion
    };

})
export default class Modulo extends Component {

    constructor(props, context) {

        super(props, context);
        this.handleOnChangeInputs = this.handleOnChangeInputs.bind(this);
        this.handleOnChangeInputsName = this.handleOnChangeInputsName.bind(this);

    }

    handleOnChangeInputs = (value, index) => {

        this.props.dispatch(chnageInputForm({
            index,
            value,
            "form": "direccion"
        }));

    };


    handleOnChangeInputsName = (value, name) => {
        
        const {formAddress, dispatch} = this.props;
        
        const index = formAddress.findIndex(input => input.name === name);

        dispatch(chnageInputForm({
            index,
            value,
            "form": "usuer"
        }));

    };

   
    render = () => {

        return <div>
            <Form inputs={this.props.formAddress}
                  onChangeInputs={this.handleOnChangeInputs}/>
                  
            <Form useIndex={false}
                  inputs={this.props.formAddress}
                  onChangeInputs={this.handleOnChangeInputsName}/>
        </div>;

    };
    
}

Modulo.propTypes = {
    "formAddress": PropTypes.array
};

```
###### Propiedades del componente Form
| nombre            | tipo              | valor default     | descripción       |
|:----------        |:------------------|:---------------   |:----------------  |
| onChangeInputs*   | function          |                   | Función callback que se dispara cuando el usuario cambia el valor del input. Sin importar el tipo de input.[1]|
| inputs*           | array             |                   | Definición del formulario.| 
| useIndex          | boolean           |    true           | Indica si retorna el índice en la función onChangeInputs, si es falso retorna la propiedad name del input| 

```
[1] onChangeInputs

 onChangeInputs = (value, index | name) => {};
 
 @param value : Valor que el usuario ingresó seleccionó
 @param index : Por default retorna la posición del input en el array definido.
 @param name  : Nombre de la propiedad name del input definido. Sólo se el valor de useIndex es false.
```

###### Cómo definir un formulario con inputs en el store?
```javascript
const form = [
  {
    "name": "username",
    "label": "Nombre de usuario",
    "pattern": /^[a-z áéíóúÁÉÍÓÚ]+$/i,
    "errorText": "Ingresa un nombre válido"
  }
]
```
###### Propiedades de un INPUT

| nombre    | tipo              | opciones                          |  valor default | descripción                                                                                      |
|:----------|:------------------|:----------------------------------|:---------------|:-------------------------------------------------------------------------------------------------|
| name*     | string            |                                   |                | El identificador del input.                                                                      |
| label     | string            |                                   |                | El texto que se mostrará como identificador del input y placeholder                              |
| pattern   | expresión regular |                                   |                | Expresión regular que se evaluará para validar el input.                                         |    
| errorText | string            |                                   |                | Texto que se mostrará cuando el input no cumple la evaluación de la expresión regular            |
| type      | string            | checkbox, select, date, textfield |  textfield     | Tipo de input disponible                                                                         |
| required  | boolean           |                                   |                | Indica si el input deberá tener un valor. Aplica para los de tipo select                         |
| format    | string            | currency, percentage              |  DD/MM/YYYY    | Representa el formato de texto que se pintará el valor del input                                 |
| valueTrue | string            |                                   |                | Sólo aplica para tipo checkbox y es el valor a mostrar cuando esté seleccionado                |
| valueFalse| string            |                                   |                | Sólo aplica para tipo checkbox y es el valor a mostrar cuando no esté seleccionado             |
| disabled  | boolean           |                                   | false          | Permite o no la edición del valor                                                                |
| unix      | boolean           |                                   | false          | Sólo aplica para tipo date. Considera si el valor deberá ser manejado com unix                   |

    * Propiedad obligatoria
    
### CHARTS:

* Bar

### STORE / REDUX
    La configuración de redux se encuentra en src/store/.
    El json representa el store de redux como dato inicial. La definición es la siguiente.

```json
{
    "widgets": {
        "drawer": {
            "open": false
        },
        "snackBar": {
            "open": false,
            "message": ""
        }
    },
    "main": {
        "pageProgress": false,
        "progress": false,
        "linearProgress": false,
        "titlePage": "Más nómina"
    },
    "forms": {
        "corresponsal": [],
        "contacto": [],
        "programacion": [],
        "direccion": [],
        "filtrosCatalogos": [],
        "altaEdicionCatalogos": [],
        "filtrosCredito": []
    },
    "entities": {
        "corresponsales": [],
        "contactos": [],
        "plazos": [],
        "sucursales": [],
        "programaciones": [],
        "estados": [],
        "nivelesPuesto": [],
        "catNivelesPuesto": [],
        "catalogosGenericos": [],
        "altaEdicionCatalogos": []
    },
    "tmp": {
        "form": []
    }
}
```

    Las propiedades tienen la siguiente descripción:
* <b>widgets</b>: Elementos gráficos que apareerán en toda la spa.
    * <b>drawer</b>: Objeto para manejar el Menú vertical izquierdo
        * <b>open</b>: Propiedad booleana que determina el estado del menú. Si es falso el menú está oculto de lo contrario mestra el menú. 
    * <b>snackBar</b>: Objeto para manejar el mensaje de retroalimentación al usuario. Ejemplo: después de una petición rest.
        * <b>open</b>: Propiedad booleana que determina el estado del snackbar. Si es falso el snackbar está oculto de lo contrario mestra el snackbar.
* <b>main</b>: Objeto que controla los elementos que están únicamente en el componente Main.jsx
    * <b>pageProgress</b>: Propiedad booleana que determina el estado del spinner que oculta todo el contenido de una página. Es decir, este no oculta el Header y Menú. Usar para cargar recursos requeridos para continar con la navegación de la página. Ejemplo: Servicio rest que proporciona los catálogos de una formulario-filtro para obtener los registros de una tabla.
    * <b>progress</b>: Propiedad booleana que determina el estado del spinner génerico. Quiere decir que puede ser usado en cualquier sección de una página o modal. Ejemplo: Usar para consumir servicios rest para obtener los catálogos de un formulario que se mostrará en un Modal.
    * <b>linearProgress</b>: Propiedad booleana que determina el estado de la línea de progreso. Esta línea se muestra en la parte superior del Header. Usar cuando se realice una acción que no bloquee / limite la funcionalidad de la spa al usuario. Ejemplo: Cuando se da alta un registro mostrar la línea hasta recibir respuesta del servicio.   
    * <b>titlePage</b>: Propiedad de texto utilizada para mostrar el título de la página actual. Este texto se refleja en el Header.   
* <b>forms</b>: Objeto que contiene las definiciones de los formularios utilizados en la spa. Un formulario es un array de objetos definidos como Inputs.
    * <b>corresponsal</b>: Ejemplo: Este array de inputs representa el formulario para la alta y edición de un corresponsal.
    * <b>filtrosCatalogos</b>: Ejemplo: El prefijo "filtros" determina un formulario para realizar filtros a una serie de registros que posiblemente se mostrarán en una Tabla.
* <b>entities</b>: Objeto que contiene los arrays para ser mostrados en tablas. Un objeto no tiene definición, es decir, queda abierto. 
* <b>tmp</b>: Objeto que contiene una propiedad form. Básicamente misma definición de "form". Pero, el objetivo es utilizar este como respaldo de valores de los inputs. Ejemplo: Cuando se inicia un formulario pasar el form original a esta propiedad. Los valores del form original se modifican, pero el usuario decide cancelar tal acción, regresaremos este respaldo al form original para asi mostrar al usuario los valores a como estaban.  
