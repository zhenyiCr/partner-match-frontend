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
    <template #footer style="display: flex;gap: 10px">
      <van-button  id="button" type="primary"
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
      <van-button  id="button" type="primary"
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.createUser.id === currentUser?.id" id="button" type="primary"
                  @click="doUpdateTeam(team.id)">修改信息
      </van-button>
      <van-button id="button" type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import type {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import myaniox from "../plugins/myAnxios.ts";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
let currentUser = ref()

onMounted(async () => {
  currentUser = await getCurrentUser()
})

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[]
})

const doJoinTeam = async (id: number) => {
  const res = await myaniox.post("/team/join", {
    id,
  });
  if (res.code === 0) {
    showToast("加入队伍成功");
  } else {
    showToast(res.description);
  }
}
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update/',
    query: {
      id: id,
    }
  })
}

const doQuitTeam = async (id: number) => {
  const res = await myaniox.post("/team/quit", {
    id,
  });
  if (res.code === 0) {
    showToast("退出队伍成功");
  } else {
    showToast(res.description);
  }
}

const doDeleteTeam = async (id: number) => {
  const res = await myaniox.post("/team/delete", {
    id,
  });
  if (res.code === 0) {
    showToast("解散队伍成功");
  } else {
    showToast(res.description);
  }
}
</script>

<style scoped>
#button {
  margin: 0 5px 5px 0;
  height: 30px;
  width: 100px
}
</style>
