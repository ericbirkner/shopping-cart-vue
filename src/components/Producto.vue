<template>
    <div>

      <div class="foto">
        <v-img v-bind:src="item.image" />
        <div class="stock">{{(item.stock>0)?'Disponible':'Sin Stock'}}</div>
      </div>
      <h4 class="capitalize">{{item.title}}</h4>
      <p>Precio: ${{formatNumber(item.price)}}</p>
      <div class="quantity">
        <v-btn
         @click="Add(item)"
        >Agregar al carro
           <v-icon class="fa fa-shopping-cart">fa fa-shopping-cart</v-icon>
         </v-btn>


      </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Producto",
    props: {
      datos: {
        type: Object
      }
    },
    methods:{
      formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      },
      Add(item){
        console.log(item);
        this.$parent.addToCart(item);
      }
    },
    data() {
        return {
          item:this.datos.producto
        }
    },
    created: function() {
      console.log(this.datos.producto)
    }
}
</script>
