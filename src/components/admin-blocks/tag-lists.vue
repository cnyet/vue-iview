<style scoped lang="less">
  .tag-container{
    height: 44px;
    overflow: hidden;
    padding-right: 120px;
    position: relative;
    .tag-group{
      overflow: visible;
      white-space: nowrap;
      padding: 5px 0 5px 10px;
      position: absolute;
      left: 0;
      top: 0;
      transition: left .3s ease;
    }
    .tag-list-drop{
      position: absolute;
      right: 0;
      top: 0;
      width: 120px;
      height: 44px;
      padding: 8px 10px;
      background-color: white;
      box-shadow: -3px 2px 15px 3px rgba(0,0,0,.1);
    }
  }
</style>

<template>
  <div class="tag-container">
      <div class="tag-group">
        <transition-group tag="div" name="taglist-moving-animation">
          <Tag
            type="dot"
            v-for="(item, index) in openedTags"
            :key="item.name"
            :name="item.name"
            :closable="item.name==='admin'?false:true"
            @click.native="linkTo(item)"
            @on-close="closeTag"
            :color="item.name===currentTag?'blue':'default'">{{item.title}}</Tag>
        </transition-group>
      </div>
      <div class="tag-list-drop">
        <Dropdown transfer trigger="click" placement="bottom-start" style="margin-left: 10px" @on-click="handleTagsOption">
          <Button size="small" type="primary">
            标签选项 <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="clearAll">关闭所有</DropdownItem>
            <DropdownItem name="clearOthers">关闭其他</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
      console.log(this.$el.offsetWidth);
      localStorage.currentTag = item.name;
      this.$router.push({
        name: item.name,
        params: ""
      });
    },
    handleTagsOption(name){
      if (name === 'clearAll') {
          this.$store.commit('clearTags');
          this.$router.push({
              name: 'admin'
          });
      } else {
          this.$store.commit('clearTags', this.currentTag);
      }
    }
  },
  created(){

  }
};
</script>
