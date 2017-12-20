<style scoped lang="less"></style>

<template>
  <div class="tag-container">
    <Tag
        type="dot"
        v-for="(item, index) in openedTags"
        :key="item.name"
        :name="item.name"
        :closable="item.name==='admin'?false:true"
        @click.native="linkTo(item)"
        @on-close="closeTag"
        :color="item.name===currentTag?'blue':'default'">{{item.title}}</Tag>
  </div>
</template>

<script>
import mixin from "../../util/mixin";
export default {
  name: "tagLists",
  mixins: [mixin],
  data(){
    return {

    };
  },
  methods: {
    closeTag(event, name){
      let openedTags = this.openedTags;
      let lastOpenedTag = openedTags[0];
      if(this.currentTag === name){
        let len = openedTags.length;
        for(let i=1; i<len; i++){
          if(openedTags[i].name === name){
            if(i < (len-1)){
              lastOpenedTag = openedTags[i+1];
            }else{
              lastOpenedTag = openedTags[i-1];
            }
            break;
          }
        }
      }
      this.$store.commit("deleteOpenedTags", name);
      openedTags = this.openedTags;
      localStorage.setItem("openedTags", JSON.stringify(openedTags));
      if(this.currentTag === name){
        this.linkTo(lastOpenedTag);
      }
    },
    linkTo(item){
      this.$router.push({
        name: item.name,
        params: ""
      });
    }
  },
  created(){

  }
};
</script>
