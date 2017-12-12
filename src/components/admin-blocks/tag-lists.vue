<style scoped lang="less"></style>

<template>
  <div class="tag-container">
    <Tag
        type="dot"
        v-for="(item, index) in pageTagList"
        :key="item.name"
        :name="item.title"
        :closable="item.name==='admin'?false:true"
        @on-close="closeTag"
        :color="item.name===currentPageName?'blue':'default'">{{item.title}}</Tag>
  </div>
</template>

<script>
  export default {
    name: "tagLists",
    props: {
      pageTagList: Array
    },
    data(){
      return {
        currentPageName: this.$route.name
      };
    },
    watch: {
      "$route" (to, from){
        this.currentPageName = to.name;
        this.$nextTick(() => {

        });
      }
    },
    methods: {
      closeTag(){

      }
    },
    created(){
      console.log(this.$route.name);
    }
  };
</script>
