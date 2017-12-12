<style scoped lang="less">
.message-container{
  .message-tip{
    line-height: 30px;
    padding: 15px 5px;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="message-container">
    <Tooltip class="message-tip" :content="value > 0 ? '有'+value+'条未读信息':'无未读信息'" type="ios-bell" placement="bottom">
      <Badge :count="value" dot>
        <Icon type="ios-bell" size="22"></Icon>
      </Badge>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: "messageTip",
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>
