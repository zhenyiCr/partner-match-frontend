<template>
  <van-form @submit="" style="padding:20px 0">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.currentValue"
          :label="editUser.editTitle"
          :placeholder="`请输入${editUser.editTitle}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRoute} from "vue-router";
const route = useRoute();

// 工具函数：安全提取query中的字符串值（排除null/数组）
const getQueryStr = (key: string): string => {
  const value = route.query[key];
  // 只保留字符串类型的值，其他情况返回空字符串
  return typeof value === 'string' ? value : '';
};

// 初始化编辑数据（确保类型为string）
const editUser = ref({
  editKey: getQueryStr('editKey'),
  editTitle: getQueryStr('editTitle'),
  currentValue: getQueryStr('currentValue'),
});



console.log(route)
console.log(route.query.editKey)
console.log(route.query.currentValue)

</script>

<style scoped>

</style>
