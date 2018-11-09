<style lang="less" scoped>
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

<style>
  .tag-group .ivu-tag i{
    width: 8px;
  }
</style>

<template>
  <div class="tag-container">
      <div class="tag-group" :style="styleObj">
        <transition-group tag="div" name="taglist-moving-animation">
          <Tag
            type="dot"
            :ref="item.name"
            v-for="(item, index) in openedTags"
            :key="item.name"
            :name="item.name"
            :closable="item.name==='admin'?false:true"
            @click.native="linkTo(item, index)"
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
import mixin from "../../utils/mixin";
export default {
  name: "tagLists",
  mixins: [mixin],
  props: ["shrink"],
  data(){
    return {
      styleObj: null
    };
  },
  watch: {
    shrink: function(val, oldVal){
      if(val && this.styleObj){
        this.styleObj = {
          left: 0
        };
      }
    },
    currentTag: function(val, oldVal){
      this.$nextTick(function(){
        this.computeOffset(val);
      });
    }
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
    linkTo(item, index){
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
    },
    computeOffset(name){
      let index = this.openedTags.findIndex(function(item, index){
        return item.name === name;
      });
      let tagWrap = this.$el;
      let tagWrapWidth = tagWrap.offsetWidth-120;
      let tagGroup = tagWrap.firstChild;
      let tagGroupWidth = tagGroup.offsetWidth;
      let groupArr = tagGroup.firstChild.children;
      let currentTagLeft = groupArr[index].offsetLeft;
      if(tagGroupWidth > tagWrapWidth){
        let tagGroupLeft = tagGroup.offsetLeft;
        let tagGroupRight = tagGroupWidth-tagWrapWidth-Math.abs(tagGroupLeft);
        if(currentTagLeft < tagGroupWidth/2){
          let num = this.openedTags[index-1] ? index-1 : index;
          let previousTag = groupArr[num];
          let previousTagLeft = previousTag.offsetLeft;
          if(tagGroupLeft < 0){
            /*向右移动*/
            this.styleObj = {
              left: parseFloat(-previousTagLeft+10)+"px"
            };
            console.log("向右移动"+this.styleObj.left);
          }else{
            console.log("不向右移动");
          }
        }else{
          let num = this.openedTags[index+1] ? index+1 : index;
          let nextTag = groupArr[num];
          let nextTagLeft = nextTag.offsetLeft;
          let nextTagWidth = nextTag.offsetWidth;
          let moveLeft = parseFloat(nextTagLeft+nextTagWidth-tagWrapWidth);
          if(tagGroupRight > 0 && moveLeft > 0){
            /*向左移动*/
            this.styleObj = {
              left: parseFloat(-moveLeft-5)+"px"
            };
            console.log("向左移动"+this.styleObj.left);
          }else{
            console.log("不向左移动");
          }
        }
      }else{
        console.log("不移动");
      }
    }
  },
  created(){

  },
  mounted(){
    this.computeOffset(this.currentTag);
  }
};
</script>
