<template>
  <user-card-list :userList="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="暂无用户"></van-empty>
  <div>
    <van-pagination :v-model="currentPage" :page-count="12" mode="simple" />
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myaniox from "../plugins/myAnxios.ts";
import qs from "qs"
import type {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const userList = ref<UserType[]>([])
const currentPage = ref(1);
// const showPageSize = ref(8);

onMounted(async () => {
  const response = await myaniox.get('/user/recommend', {
    params: {
      pageNUm:1,
      pageSize:4
    },
    paramsSerializer: params => qs.stringify(params, {indices: false})
  })
  console.log(response);
  const userResponse = response.data.records || [];
  if (userResponse) {
    userResponse.forEach((user: UserType) => {
      console.log(user.tags);
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userResponse;
    console.log(userList.value);
  }
})
</script>

<style scoped>
</style>
