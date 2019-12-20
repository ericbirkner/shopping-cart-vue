<template>
    <div>
        <h5>Indicadores</h5>
        <div class="link-container">
            <ul class="list-group">
              <li class="list-group-item">UF: ${{formatNumber(uf)}}</li>
              <li class="list-group-item">UTM: ${{formatNumber(utm)}}</li>
              <li class="list-group-item">Dolar: ${{formatNumber(dolar)}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LinksHolder",
    data(){
        return{
            dolar:'',
            uf:'',
            utm:''
        }
    },
    created: function() {
      axios
        .get("https://mindicador.cl/api")
        .then(res => {
          this.uf = res.data.uf.valor;
          this.utm = res.data.utm.valor;
          this.dolar = res.data.dolar.valor;
        }).catch(e => {
            console.log(e);
        })
    },
    methods:{
      formatNumber(num) {
        num = num.toFixed(0)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }
    }
}
</script>
