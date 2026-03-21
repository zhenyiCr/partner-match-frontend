<template>
  <div id="team">
    <van-search v-model="seacrhText" placeholder="请输入要搜索的队伍" @search="onSearch(seacrhText)"/>
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <team-card-list :teamList="teamlist"/>
    <van-empty v-if="teamlist?.length < 1" description="暂无队伍"/>
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
const seacrhText = ref ("")
const teamlist = ref<TeamType[]>([])

const doJoinTeam = () => {
  router.push('/team/add');
}
const listTeam = async (val = "") => {
  const res = await myaniox.get("/team/list/myTeam",
      {
        params: {
          searchText: val,
          pageNum: 1,
        }
      });
  if (res.code === 0) {
    teamlist.value = res.data;
  } else {
    showToast(res.description);
  }
}

// 页面加载时只加载一次团队列表
onMounted(async () => {
  listTeam()

})
const onSearch = (val) => {
  listTeam(val)
}
</script>

<style scoped>
#team {
}
</style>
