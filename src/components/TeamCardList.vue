<template>
  <van-card
      v-for="team in props.teamList"
      :desc="team.description || '暂无介绍'"
      :title="team.name"
  >
    <template #tags>
      <van-tag plain type="primary" style="margin: 0 5px 5px 0;">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
     <div>
       {{ "最大人数：" + team.maxNum }}
     </div>
      <div>
        {{ "过期时间：" + team.expireTime }}
      </div>
    </template>
    <template #footer>
      <van-button style="height: 30px;width: 100px" type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import type {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import myaniox from "../plugins/myAnxios.ts";
import { showToast } from "vant";


interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(),{
  teamList: [] as TeamType[]
})

const doJoinTeam = async (id :number) => {
  const res = await myaniox.post("/team/join", {
    id,
  });
  if (res.code === 0) {
    showToast("加入队伍成功");
  } else {
    showToast(res.description);
  }
}
</script>

<style scoped>

</style>
