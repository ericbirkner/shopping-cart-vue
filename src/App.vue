<template>

    <v-container class="fluid">
      <router-view/>
    </v-container>

</template>

<script>
export default {
    name: 'app',
    data () {
      return {
        todos:[]
      }
    }
}
</script>
