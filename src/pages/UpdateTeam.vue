<template>
  <div id="add-team">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="UpdateTeamData.name"
            name="name"
            label="团队名称"
            placeholder="请填写团队名称"
            :rules="[{ required: true, message: '请填写团队名称' }]"
        />
        <van-field
            v-model="UpdateTeamData.description"
            rows="4"
            autosize
            label=""
            type="textarea"
            name=""
        />
        <van-field
            is-link
            readonly
            name="datePicker"
            label="时间选择"
            :placeholder="UpdateTeamData.expireTime ? UpdateTeamData.expireTime.toString() : '点击选择时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
              v-model="UpdateTeamData.expireTime"
              title="选择日期"
              :min-date="minDate"
              @confirm="showPicker = false;"
          />
        </van-popup>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="UpdateTeamData.status" direction="horizontal">
              <van-radio name="0" >公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="Number(UpdateTeamData.status) === 1"
                   v-model="UpdateTeamData.password"
                   name="password"
                   label="密码"
                   placeholder="请填写密码"
                   :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAnxios from "../plugins/myAnxios.ts";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import myaniox from "../plugins/myAnxios.ts";

const router = useRouter();
const route = useRouter();
const initFormData = {
  "description": "",
  "expireTime": [null, null, null],
  "name": "",
  "password": "",
  "status": "",
}

// 要用户修改的表单数据
const UpdateTeamData = ref({...initFormData});

const showPicker = ref(false);

const minDate = new Date();

const id = Number(route.currentRoute.value.query.id);

onMounted(async () => {
  if (id <= 0) {
    showToast('队伍ID错误')
    return
  }
  const res = await myaniox.get("/team/get/" ,{
    params: {
      id: id,
    }
  })
  if (res?.code === 0) {
    const timeString = res?.data?.expireTime;
    const [datePart] = timeString.split('T');
    const expireTime = datePart.split('-').map(Number);
    UpdateTeamData.value = res.data;
    UpdateTeamData.value.expireTime = expireTime;
    UpdateTeamData.value.status = String(res.data.status);
  } else {
    showToast('获取队伍信息失败')
  }
})

const onSubmit = async () => {
  // 处理status
  const dateArr = UpdateTeamData.value.expireTime;
  const year = Number(dateArr[0]);
  const month = Number(dateArr[1]) - 1;
  const day = Number(dateArr[2]);
  const targetDate = new Date(year, month, day);
  const postData = {
    ...UpdateTeamData.value,
    expireTime: targetDate,
    status: Number(UpdateTeamData.value.status),
  }
  console.log(postData)
  console.log(postData.expireTime)
  // todo 前端参数校验
  const res = await myAnxios.post("/team/update", postData);
  console.log("fanhuizhi" + res);
  if (res.code === 0) {
    showToast('更新成功');
     await router.push({
       path: '/team',
       replace: true,
     });
  } else {
    showToast('更新失败');
  }
}
</script>

<style scoped>

</style>
