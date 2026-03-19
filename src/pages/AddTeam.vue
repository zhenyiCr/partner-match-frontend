<template>
  <div id="add-team">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="团队名称"
            placeholder="请填写团队名称"
            :rules="[{ required: true, message: '请填写团队名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
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
                    :placeholder="addTeamData.expireTime ? addTeamData.expireTime.join('-') : '点击选择时间'"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
                  <van-date-picker
                      v-model="addTeamData.expireTime"
                      title="选择日期"
                      :min-date="minDate"
                      @confirm="showPicker = false;"
                  />
                </van-popup>
        <van-field name="stepper" label="请选择最大人数">
          <template #input>
            <van-stepper min="3" max="10" v-model="addTeamData.maxNum"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="Number(addTeamData.status) === 1"
                   v-model="addTeamData.password"
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

import { ref } from "vue";
import myAnxios from "../plugins/myAnxios.ts";
import { showToast } from "vant";
import {useRouter} from "vue-router";
const router = useRouter();

const initFormData = {
  "description": "",
  "expireTime":  [null, null, null],
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 0,
}

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData});

const showPicker = ref(false);

const minDate = new Date();



const onSubmit = async () => {
  // 处理status
  const dateArr = addTeamData.value.expireTime;
  const year = Number(dateArr[0]);
  const month = Number(dateArr[1]) - 1;
  const day = Number(dateArr[2]);
  const targetDate = new Date(year, month, day);
  const postData = {
    ...addTeamData.value,
    expireTime: targetDate,
    status : Number(addTeamData.value.status),
  }
  console.log(postData)
  console.log(postData.expireTime)
  // todo 前端参数校验
  const res = await myAnxios.post("/team/add", postData);
  console.log("fanhuizhi"+res);
  if (res.data.code === 0 && res.data) {
    showToast('创建成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('创建失败');
  }
}
</script>

<style scoped>

</style>
