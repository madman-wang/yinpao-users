<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button type="primary" @click="go('home')">查询用户</md-button>
    <md-button type="warning" @click="go('rank', 1)">实时消费排行榜(男)</md-button>
    <md-button type="warning" @click="go('rank', 0)">实时消费排行榜(女)</md-button>
  </div>
</template>

<script>
  import {Button} from 'mand-mobile'

  export default {
    components: {
      [Button.name]: Button,
    },
    methods: {
      go(name, gender) {
        this.$router.push({ path: name, query: { gender } })
      }
    }
  }

</script>
