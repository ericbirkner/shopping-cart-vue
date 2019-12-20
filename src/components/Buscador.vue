<template>
      <v-col sm="10" md="10" lg="10" >
        <v-text-field
          append-icon="search"
          v-on:keyup="buscar"
          placerholder="Buscar"
        >
          Buscar
        </v-text-field>
      </v-col>
</template>

<script>
export default {
    name: "Buscador",

    methods:{
      buscar(event){
        this.$parent.busqueda = event.target.value;
      }
    }
}
</script>
