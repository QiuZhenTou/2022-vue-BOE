<template>
  <div>
    <span class="dot" :style="{ background: localColor.color }" />
  </div>
</template>

<script>
export default {
  props: {
    dotColor: {
      type: String,
      default: '#f08b40'
    }
  },
  data() {
    return {
      localColor: {
        color: this.dotColor
      }
    }
  }
  // methods:{

  // }
}
</script>

<style lang="scss" scoped>
.dot {
  position: relative;
  top: -1px;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 8px;
  margin-right: 10px;
}
</style>
