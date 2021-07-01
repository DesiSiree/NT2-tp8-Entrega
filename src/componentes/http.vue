
<template>


  <section class="src-componentes-http">
     <div class="container">
        <hr>
            <div v-if="obtenerUsuarios.length" class="table">
            <table class="table  table ">
              <!-- encabezado de la tabla --> 
          
              <tr>
                <th v-for="(col, index) in getCols" :key="index">{{ col }}</th>
              </tr>

              <!-- filas con los datos -->
              <tr v-for="(item, index) in obtenerUsuarios" :key="index">
                <td v-for="(col, index) in getCols" :key="index">{{ item[col] }}</td>
              </tr>
            </table>
          </div>
    
          <div v-else-if="getNoHayItems" class="alert alert-warning mt-1">
              no hay personas para mostrar
          </div>
    
       </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-http',
    props: [],
    beforeCreate(){
    this.$store.dispatch('getUsuarios')
    },
    beforeMount(){
    },
    mounted () {
    
    this.items = this.obtenerUsuarios;
    this.nohay()
    },
    data () {
      return {
          noHayItems:false
      }
    },
    methods: {
           nohay(){
        setTimeout(() => {
         if (!this.obtenerUsuarios.length){
            this.noHayItems= true
          }
          }, 300);   
    },


   
    },
    computed: {
       getCols() {
        return Object.keys(this.obtenerUsuarios[0])
      },
       getNoHayItems(){
        return this.noHayItems
      },
     obtenerUsuarios(){  
        return this.$store.state.usuario
      },
    }
}

</script>

<style scoped lang="css">
 .src-componentes-http {
      color: #333;
  }

.container {
   
    background: rgb(233, 151, 0); /* Old browsers */
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    color: rgb(253, 0, 0);
  }

  hr {
    background-color: rgb(251, 255, 0);
  }  
</style>
