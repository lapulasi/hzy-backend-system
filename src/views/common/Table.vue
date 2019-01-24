<template>
  <b-card :header="caption">
    <table class="table">
      <tr>
        <th v-for="(item, index) in fields">{{item.label}}</th>
      </tr>
      <tr v-for="(list, index) in items">
        <td>list.username</td>
        <td>list.registered</td>
        <td>list.role</td>
        <td>list.Staff</td>
        <td>list.status</td>
      </tr>
    </table>
  </b-card>
</template>

<script>
    export default {
        props: {
          caption: '',
          fields: [],
          items: []
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
