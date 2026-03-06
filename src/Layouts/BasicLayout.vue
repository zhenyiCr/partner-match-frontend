<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" @click="onClickSearch" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>


  <van-tabbar route @change="onChange">
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import {useRouter} from "vue-router";
const router = useRouter();

const onClickLeft = () => {
  history.back();
};

const onClickRight = () => {
  showToast({ message: '按钮' });
};
const onChange = (index: any) => showToast(`标签 ${index}`);

const onClickSearch = () => {
  router.push('/search');
}
</script>

<style scoped>
</style>
