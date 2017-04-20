##### Form
    Este componente pinta inputs. Requiere la definición de un formulario dado en el store de redux 
    y una función para manejar el evento OnChange de cada input. Inputs disponibles:

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
 
 @param value : Valor que el usuario ingresó o seleccionó. Si el input es tipo select el valor 
                de la propiead es value = {"text": "", value: ""}
 @param index : Por default retorna la posición del input en el array definido.
 @param name  : Nombre de la propiedad "name" del input definido. Sólo se el valor de useIndex es false.
```
