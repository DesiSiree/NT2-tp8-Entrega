<template>

  <section class="src-componentes-api-rest-full">
      <div class="jumbotron">
        <h2>Formulario</h2>
        <hr>


        <vue-form :state="formState" @submit.prevent="enviar(formData.nombre, formData.edad, formData.email)">
            <!-- Campo nombre -->
            
            <validate tag="div">
                <label for="nombre">Nombre</label>
                  <input 
                  type="text" 
                  id="nombre" 
                  name="nombre"
                  class="form-control"
                  autocomplete="off"
                  v-model.trim="formData.nombre"
                  required
                  :minlength="nombreLengthMin"
                  :maxlength="nombreLengthMax"
                  no-espacios
                >
                <!-- Carteles de validación de campo -->
                
                <field-messages name="nombre" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="no-espacios" class="alert alert-danger mt-1">
                  No se permiten espacios intermedios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se deben ingresar como mínimo {{nombreLengthMin}} caracteres
                </div>
                <div v-if="formData.nombre.length == nombreLengthMax" class="alert alert-danger mt-1">
                  Máximo de caracteres ({{nombreLengthMax}}) alcanzados
                </div>
              </field-messages>
            </validate>
            <br>

            

            <!-- Campo edad -->
              <validate tag="div">
              <label for="edad">edad</label>
              <input 
                type="number" 
                id="edad" 
                class="form-control"
                name="edad"
                autocomplete="off"
                v-model.number="formData.edad"
                required
                :min="edadMin"
                :max="edadMax"
              >
              <!-- Carteles de validación de campo -->
              <field-messages name="edad" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="min" class="alert alert-danger mt-1">La edad mínima es de {{edadMin}} años</div>
                <div slot="max" class="alert alert-danger mt-1">La edad máxima es de {{edadMax}} años</div>
              </field-messages>
            </validate>
            <br>

            <!-- Campo email -->
          <validate tag="div">
            <label for="email">email</label>
            <input 
              type="email" 
              id="email" 
              class="form-control"
              name="email"
              autocomplete="off"
              v-model.trim="formData.email"
              required
            >
            <!-- Carteles de validación de campo -->
            <field-messages name="email" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
              <div slot="email" class="alert alert-danger mt-1">Email no válido</div>
            </field-messages>
          </validate>
          <br>
        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Enviar</button>
        </vue-form>
       <hr>

      </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'src-componentes-api-rest-full',
    props: [],
//}

    data () {
      return {
      urlUsuarios : 'https://60c13689b8d3670017556a6d.mockapi.io/usuario/user',
      usuarios : [],
      refInterval : null,
      nombreLengthMin : 3,
      nombreLengthMax: 15,
      formData : this.getInicialData(),
      edadMin: 18,
      edadMax: 120,
      formState: {},
      }
    },
    methods: {
      getInicialData() {
      return {
        nombre: '',
        edad: '',
        email: ''
      }
    },
        methods: {
      getInicialData() {
      return {
        nombre: '',
        edad: '',
        email: ''
      }
    },
  /*    enviar(n, e, m) { 
        console.log({...this.formData})
        this.postUsuario(n, e, m)
        this.formData = this.getInicialData()
        this.formState._reset()
        
    },*/

      enviar() { 
        this.$store.dispatch("addUsuario", this.formData);
        this.formData = this.getInicialData()
        this.formState._reset()
        },
      convertirFmtFyh(fyh) {
        return new Date(fyh).toLocaleString()
      },

      async getUsuarios() {
        console.log('getUsuarios')
        try {
          let respuesta = await this.axios(this.urlUsuarios)
          console.log('AXIOS GET',respuesta.data)
          this.usuarios = respuesta.data
        }
        catch(error) {
          console.log(error)
        }
      },

      async postUsuario(n, e, m) {
        console.log('postUsuario')
         let usuario = {
           nombre: n,
           edad: e,
           email: m
         }
        try {
          let respuesta = await this.axios.post(this.urlUsuarios, usuario, {'content-type':'application/json'})
          console.log('AXIOS POST',respuesta.data)
          //this.getUsuarios()
          
          this.usuarios.push(usuario)
        }
        catch(error) {
          console.log(error)
        }
      },
 
      async deleteUsuario(id) {
        console.log('deleteUsuario',id)
        try {
          let respuesta = await this.axios.delete(this.urlUsuarios+id)
          console.log('AXIOS DELETE',respuesta.data)
          let user = respuesta.data
          //this.getUsuarios()
          //https://www.w3schools.com/jsref/jsref_splice.asp
          let indice = this.usuarios.findIndex(usuario => usuario.id == user.id)
          this.usuarios.splice(indice,1)          
        }
        catch(error) {
          console.log(error)
        }        
      }
    },
 

    },
    computed: {
    }
}
</script>

<style scoped lang="css">
  .src-componentes-api-rest-full {
    background-color: rgb(126, 126, 126);

  }


.jumbotron {
    background-color: rgb(238, 133, 173);
    color: white;
}

hr {
    background-color: rgba(0, 0, 0, 0);
}

pre {
    color: white;
}

.btn-success my-4{
    color: black;
    background-color:  rgb(255, 251, 0);

}
</style>