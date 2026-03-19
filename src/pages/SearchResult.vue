<template>
  <van-card v-if="userList.length > 0"
      v-for="user in userList"
      :desc="user.profile || '暂无介绍'"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin: 0 5px 5px 0;">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <div v-else>暂无用户</div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myaniox from "../plugins/myAnxios.ts";
import qs from "qs"
import type {UserType} from "../models/user";

const route = useRoute()
const {tags} = route.query

const userList = ref<UserType[]>([])

onMounted(async () => {
  const response = await myaniox.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => qs.stringify(params, {indices: false})
  })
  console.log(response);
  const userResponse = response.data || [];
  if (userResponse) {
    userResponse.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log(user.tags);
      }
    })

    userList.value = userResponse;
  }
})
</script>

<style scoped>
</style>
