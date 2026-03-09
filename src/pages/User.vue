<template>
    <van-cell @click="edit( 'username','用户名' ,user.username)" title="用户名" :value="user.username" is-link/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" :value="user.avatarUrl" >
      <img style="height: 40px" :src="user.avatarUrl" alt="---">
    </van-cell>
    <van-cell @click="edit( 'gender','性别' ,user.gender === 0 ? '男' : '女')" title="性别" :value="user.gender === 0 ? '男' : '女'" is-link/>
    <van-cell @click="edit( 'phone','手机号' ,user.phone)" title="手机号" :value="user.phone" is-link/>
    <van-cell @click="edit( 'email','邮箱' ,user.email)" title="邮箱" :value="user.email" is-link/>
    <van-cell title="创建时间" :value="user.createTime.toLocaleString()"/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

let router = useRouter();
const user = ref(
    {
    id: 123,
    username: '????',
    userAccount: '',
    avatarUrl: '',
    profile: '',
    gender: 0,
    phone: '',
    email: '',
    tags: [],
    createTime: new Date(),
}
)



onMounted(async () => {
  const currentUser  = await getCurrentUser();
  if ( currentUser) {
    user.value = currentUser;
  }
})


const edit = (editKey: string,editTitle: string, currentValue: any) => {
  router.push({
    path: `/user/editUser/`,
    query: {
      editKey,
      editTitle,
      currentValue
    }
  })
}
</script>

<style scoped>

</style>
