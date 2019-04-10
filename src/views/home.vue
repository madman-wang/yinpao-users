<template>
  <md-field>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="scroll-view-list"
    >
      <md-field-item :title="item.nick" :brief="'音泡id:' + item.id">
        <md-tag
          size="large"
          shape="bubble"
          fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
          type="fill"
        >{{ item.level }}</md-tag>
        <img class="holder" slot="left" :src="item.portrait" />
      </md-field-item>
    </div>
    <md-button type="primary" size="small" inline>Primary</md-button>
  </md-field>
</template>

<script>
  import {ScrollView, ScrollViewMore, Field, FieldItem, Tag, Button} from 'mand-mobile';
  import axios from 'axios';

  export default {
    name: 'scroll-view-demo-2',
    components: {
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [Tag.name]: Tag,
      [Button.name]: Button,
    },
    data() {
      return {
        list: [],
        isFinished: false,
        page: 1,
        size: 20,
      }
    },
    mounted() {
      this.fetch();
    },
    methods: {
      fetch() {
        const { page, size } = this;
        return axios({
          url: `https://leancloud.cn/1.1/classes/users?limit=${size}&skip=${(page - 1) * size}&order=-level`,
          headers: {
            'X-LC-Id': 'xex1U1SPOInuUR7phoObpt8i-gzGzoHsz',
            'X-LC-Key': 'QGh2qW5LhmjWuKjKaLSaj2rn',
          }
        }).then((res) => {
          const list = res.data.results;
          this.list = list;
          return list;
        });
      },
    },
  }

</script>

<style lang="stylus">
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
  .holder
    display block
    width 88px
    height 88px
    border-radius 44px
    background-color #E6E6E6
</style>
