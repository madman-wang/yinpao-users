<template>
  <div class="wrap">
    <md-field>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="scroll-view-list"
      >
        <md-cell-item :title="item.user.nick" :brief="'音泡id:' + item.user.id">
          <div>
            总消费<md-tag shape="circle" type="fill" fill-color="#FC7353">￥{{ Math.ceil(item.count / 10) }}</md-tag>
          </div>
          <div>
            10分钟前<md-tag shape="circle" type="fill" fill-color="#FC7353">￥{{ Math.ceil(item.oldCount / 10) }}</md-tag>
          </div>
          <div>
            上升<md-tag>￥{{ Math.ceil(item.diffCount / 10) }}</md-tag>
          </div>
          <img class="holder" slot="left" :src="item.user.portrait" />
<!--          <md-tag slot="right"><span v-on:click="currentLive(item, index)">所在房间</span></md-tag>-->
        </md-cell-item>
      </div>
      <md-button :type="loading ? 'disabled': 'primary'" size="small" inline v-on:click="loadMore" :inactive="loading">{{ loading ? '正在加载': '加载更多' }}</md-button>
    </md-field>
  </div>
</template>

<script>
  import {ScrollView, ScrollViewMore, Field, CellItem, Tag, Button, Toast, InputItem} from 'mand-mobile';
  import axios from 'axios';

  export default {
    name: 'scroll-view-demo-2',
    components: {
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      [Field.name]: Field,
      [CellItem.name]: CellItem,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [InputItem.name]: InputItem,
    },
    data() {
      return {
        list: [],
        totalList: [],
        loading: false,
        page: 1,
        size: 100,
      }
    },
    mounted() {
      this.fetch();
      setTimeout(() => {
        alert('数据已更新，点击刷新');
        window.location.reload();
      }, 1000 * 60 * 6);
    },
    methods: {
      currentLive(item) {
        axios.get(`https://service.xiangshengclub.com/api/current/live?uid=${144444}&other_id=${item.user.id}`).then((res) => {
          console.log(res)
        });
      },
      loadMore() {
        this.page = this.page + 1;
        this.list = [].concat(this.list, this.totalList.slice((this.page - 1) * this.size, this.page * this.size));
      },
      fetch() {
        const { size } = this;
        const { gender } = this.$route.query;
        const params = {
          order: '-createdAt',
          limit: 1,
        };
        this.loading = true;
        return axios({
          url: 'https://leancloud.cn/1.1/classes/Diff',
          params,
          headers: {
            'X-LC-Id': 'xex1U1SPOInuUR7phoObpt8i-gzGzoHsz',
            'X-LC-Key': 'QGh2qW5LhmjWuKjKaLSaj2rn',
          }
        }).then((res) => {
          const list = res.data.results[0].list.filter(item => item.user.gender === parseInt(gender, 10));
          this.loading = false;
          this.totalList = list;
          this.list = list.slice(0, size);
        });
      },
    },
  }

</script>

<style lang="stylus">
  .scroll-view-item
    padding 30px 0
    text-align center
    /*font-size 32px*/
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
  .holder
    display block
    width 88px
    height 88px
    border-radius 44px
    background-color #E6E6E6
  .query
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    padding-bottom 10px
    border-bottom 1px solid #dfdfdf
</style>
