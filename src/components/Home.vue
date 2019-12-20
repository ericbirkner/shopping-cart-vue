<template>
<transition name="slide-fade">

<div>
<v-row no-gutters>

  <buscador/>

  <v-col sm="1" md="1" lg="1" xl="1" offset="1" class="text-right" >
    <v-badge>
      <template v-slot:badge>{{canasta.length}}</template>
      <v-icon>fa-shopping-bag</v-icon>
    </v-badge>
  </v-col>

  </v-row>
  <v-row no-gutters v-if="loading">
    <v-col class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Cargando...</span>
     </div>
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col lg="3" md="4" sm="12"  class="news-holder" v-for="(producto, index) in displayedPosts">
         <Producto :datos="{producto}"></Producto>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col class="text-center">
      <router-link :to="`/productos/page/${page-1}`" class="btn btn-sm btn-outline-secondary" v-if="page != 1"> << </router-link>

      <span v-for="pageNumber in pages.slice(page-1, page+5)">
      <router-link :to="`/productos/page/${pageNumber}`" v-on:click="setClase" class="btn btn-sm btn-outline-secondary"> {{pageNumber}} </router-link>
      </span>

      <router-link :to="`/productos/page/${page+1}`" class="btn btn-sm btn-outline-secondary" v-if="page < pages.length"> >> </router-link>
    </v-col>
  </v-row>

</div>
</transition>

</template>

<script>
import axios from 'axios'
import Producto from "./Producto";
import Buscador from "./Buscador";


export default {
    name: "Home",
    components: {Buscador,Producto},
    data() {
        return {
          loading:true,
          posts: [],
          baseUrl: 'productos.json',
          page: 1,
          perPage: 8,
          pages: [],
          busqueda:'',
          categoria:null,
          showModal:false,
          filtered:null,
          canasta:[]
        }
    },
    methods: {
        getPosts () {
            axios.get(this.baseUrl)
            .then(response => {
                this.posts = response.data;
                this.loading = false;
            })
            .catch(response => {
                console.log(response);
            });
        },
        setPages (total) {
            let numberOfPages = Math.ceil(total / this.perPage);
            this.pages = [];
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (posts) {
            let page = this.page;
            if(this.$route.params.page>0){
              //console.log(this.$route.params.page)
              page = this.$route.params.page;
            }
            this.page = parseInt(page);
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  posts.slice(from, to);
        },
        setClase(event){
          console.log(event.target);
        },

        Modal(index){
          this.showModal=true;
          console.log(index);
        },
        close(){
          this.showModal=false;
        },
        addToCart(itemToAdd) {
          let found = false;

          // Add the item or increase qty
    			let itemInCart = this.canasta.filter(item => item.id===itemToAdd.id);
    			let isItemInCart = itemInCart.length > 0;

          if (isItemInCart === false) {
            this.canasta.push(Vue.util.extend({}, itemToAdd));
          } else {
    				itemInCart[0].qty += itemToAdd.qty;
    			}

    			itemToAdd.qty = 1;
        }

    },
    computed: {
        displayedPosts () {
            let filtered = this.posts;
            if(this.busqueda.length>1){
              filtered = filtered.filter(post => {
                return post.title.toLowerCase().includes(this.busqueda)
              })
            }
            this.setPages(filtered.length);
            return this.paginate(filtered)
        }
    },

    created: function() {
      this.getPosts();
    }
}
</script>

<style>

.panel-izquierdo{
  border-right: 1px solid gray;
}

.panel-izquierdo .logo{
  border-bottom: 1px solid gray;
  height: 70px;
  padding: 10px 0;
}

.panel-derecho .head-derecha{
  height: 70px;
  padding: 10px 0;
  border-bottom: 1px solid gray;
  text-align: right;
}

.v-badge__badge{
  background:#000;
}
h2{
  color:gray;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

.has-search{
  width: 60%;
  display: inline-block;
}

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}

.bolso{
  width: 20%;
  display: inline-block;
}

.news-holder{

}

.news-holder h4{
  font-size: 16px;
  line-height: 18px;
}

.news-holder .foto{
  width: 100%;
  position: relative;
}

.news-holder .foto img{
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-holder .foto .stock{
  width: 80%;
  padding: 10px;
  background: #333;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 13px;
  height: 40px;
  opacity: 0.9;
}
.quantity{

}
.quantity button{
  background:#000000;
}


</style>
