<template>
    <div>
        <p class="mt-1 text-secondary">Categorias</p>
        <div class="text-center" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="mt-2" v-else>
            <ul>
              <li v-for="categoria in categorias">
                  <span @click="$parent.categoria=categoria.id">{{categoria.name}}</span>
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Categorias",
    data(){
        return {
            loading:true,
            categorias : []
        }
    },
    created: function() {
      axios
        .get("http://sva.talana.com:8000/api/product-category/")
        .then(res => {
          this.categorias = res.data;
          this.loading = false;
        })
    }
}
/*
created: function() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then(res => {
      this.todos = res.data;
    })
}
*/
</script>
