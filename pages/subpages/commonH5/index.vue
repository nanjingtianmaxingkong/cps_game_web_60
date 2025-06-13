<template>
  <view class="contend">
    <!-- <web-view :src="url"></web-view> -->
    <image mode="aspectFit" :src="url" style="width: 100%;height: 100vh"></image>
  </view>
</template>
<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(options) {
    this.url = decodeURIComponent(options.url);
  }
};
</script>
<style> 
.contend{
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
