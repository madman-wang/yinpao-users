<template>
  <div class="wrap">
    <div class="query">
      <md-field>
        <md-input-item
          v-model="name"
          placeholder="姓名"
          is-title-latent
        ></md-input-item>
        <md-input-item
          v-model="level"
          placeholder="等级"
          is-title-latent
        ></md-input-item>
        <div v-on:click="query()"><md-tag>查询</md-tag></div>
      </md-field>
    </div>

    <div class="query1">
      <md-field>
        <md-input-item
          v-model="name"
          placeholder="姓名"
          is-title-latent
          clearable
        ></md-input-item>
        <md-input-item
          v-model="level"
          placeholder="等级"
          is-title-latent
          clearable
        ></md-input-item>
        <div v-on:click="query()"><md-tag>查询</md-tag></div>
      </md-field>
    </div>

    <md-field>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="scroll-view-list"
      >
        <md-cell-item :title="item.nick" :brief="'音泡id:' + item.id">
          <md-tag
            size="large"
            shape="bubble"
            fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
            type="fill"
          >{{ item.level }}</md-tag>
          <img class="holder" slot="left" :src="item.portrait" />
          <md-tag slot="right"><span v-on:click="update(item, index)">获取最新</span></md-tag>
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
        loading: false,
        page: 1,
        size: 20,
        name: '',
        level: '',
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      query() {
        this.fetch().then((list) => {
          this.list = list;
          this.page = 1;
        });
      },
      update(item, i) {
        axios.get(`https://service.xiangshengclub.com/api/user/info?id=${item.id}`).then((res) => {
          const user = res.data.user;
          return axios({
            method: 'PUT',
            url: `https://leancloud.cn/1.1/classes/users/${item.objectId}`,
            headers: {
              'X-LC-Id': 'xex1U1SPOInuUR7phoObpt8i-gzGzoHsz',
              'X-LC-Key': 'QGh2qW5LhmjWuKjKaLSaj2rn',
            },
            data: user,
          }).then(() => {
            this.list = this.list.map((item, index) => {
              if(index === i) {
                return user;
              };
              return item;
            });
            Toast.succeed('更新成功');
          });
        });
      },
      loadMore() {
        this.page = this.page + 1;
        this.fetch().then((list) => {
          this.list = [].concat(this.list, list);
        });
      },
      fetch() {
        const { page, size, name, level } = this;
        const params = {
          limit: size,
          skip: (page - 1) * size,
          order: '-level',
          where: {},
        };
        if(name) {
          params.where.nick = {
            $regex: name,
            $options: 's',
          };
        }
        if(level) {
          params.where.level = {
            $gte: parseInt(level, 10),
          };
        }
        this.loading = true;
        return axios({
          url: 'https://leancloud.cn/1.1/classes/users',
          params: {
            ...params,
            where: JSON.stringify(params.where),
          },
          headers: {
            'X-LC-Id': 'xex1U1SPOInuUR7phoObpt8i-gzGzoHsz',
            'X-LC-Key': 'QGh2qW5LhmjWuKjKaLSaj2rn',
          }
        }).then((res) => {
          const list = res.data.results;
          this.loading = false;
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
