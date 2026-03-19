<template>
  <van-card
      v-for="user in props.userList"
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
</template>

<script setup lang="ts">
import type {UserType} from "../models/user";


interface UserCardListProps {
  userList: UserType[]
}

const props = withDefaults(defineProps<UserCardListProps>(),{
  userList:[]  as UserType[]
})
</script>

<style scoped>

</style>
