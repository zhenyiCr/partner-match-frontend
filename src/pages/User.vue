<template>
  <van-cell title="当前用户" :value="user?.username" />
  <van-cell title="个人账户" is-link to="/user/update" />
  <van-cell title="创建的队伍" is-link to="user/team/create" />
  <van-cell title="加入的队伍" is-link to="user/team/join" />
</template>

<script setup lang="ts">
// import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
//
// let router = useRouter();
const user = ref({})



onMounted(async () => {
  const currentUser  = await getCurrentUser();
  if ( currentUser) {
    user.value = currentUser;
  }
})
//
//
// const edit = (editKey: string,editTitle: string, currentValue: any) => {
//   router.push({
//     path: `/user/editUser/`,
//     query: {
//       editKey,
//       editTitle,
//       currentValue
//     }
//   })
// }
</script>

<style scoped>

</style>
