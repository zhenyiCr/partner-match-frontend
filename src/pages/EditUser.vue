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
      <van-button round block type="primary" native-type="submit" @click="submitForm">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRoute, useRouter} from "vue-router";
import myAnxios from "../plugins/myAnxios.ts";
import {getCurrentUser} from "../services/user.ts";
import { showToast } from "vant";
const route = useRoute();
const router = useRouter();
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



const submitForm = async (): Promise<void> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  // 提交表单逻辑
   const response = await myAnxios.post("/user/update",
       {
         id: currentUser.id,
         [editUser.value.editKey]: editUser.value.currentValue
       }
   )
   if ((response as any).code === 0) {
      // 编辑成功，返回用户详情页
     showToast('编辑成功');
      await router.push('/user');
   } else {
     showToast('编辑失败');
   }
  console.log(response);
}


</script>

<style scoped>

</style>
