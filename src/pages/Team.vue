<template>
  <div id="team">
    <van-button type="primary" @click="doJoinTeam">主要按钮</van-button>
    <team-card-list :teamList="teamlist"/>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myaniox from "../plugins/myAnxios.ts";
import {showToast} from "vant";
import type {TeamType} from "../models/team";

const router = useRouter()

const teamlist = ref<TeamType[]>([])

const doJoinTeam = () => {
  router.push('/team/add');
}

// 页面加载时只加载一次团队列表
onMounted(async () => {
  const res = await myaniox.get("/team/list");
  if (res.code === 0) {
    teamlist.value = res.data;
  } else {
    showToast(res.data.msg);
  }

})
</script>

<style scoped>
#team {
}
</style>
