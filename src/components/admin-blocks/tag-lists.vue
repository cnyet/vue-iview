<style scoped lang="less"></style>

<template>
  <div class="tag-container">
    <Tag
        type="dot"
        v-for="(item, index) in openedTags"
        :key="item.name"
        :name="item.title"
        :closable="item.name==='admin'?false:true"
        @on-close="closeTag"
        :color="item.name===currentTag?'blue':'default'">{{item.title}}</Tag>
  </div>
</template>

<script>
export default {
  name: "tagLists",
  props: {
    openedTags: Array,
    currentTag: {
      type: String,
      default: "admin"
    }
  },
  data(){
    return {

    };
  },
  methods: {
    closeTag(){

    }
  },
  created(){
    console.log(this.openedTags);
  }
};
</script>
