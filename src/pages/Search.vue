<template>
  <form action="/">
    <van-search
        v-model="SearchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>

  </van-row>
  <van-divider content-position="left">标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tags"
  />
    <van-button style="width: 50%;margin: 16px " type="primary" @click="onSearchUser">搜索</van-button>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";
const router = useRouter();
const originTags = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '学习经历',
    children: [
      {text: 'java', id: 'java'},
      {text: 'javascript', id: 'javascript'},
      {text: 'typescript', id: 'typescript'},
    ],
  },
];

let tags =ref(originTags)

const SearchText = ref('');

// 搜索标签
const onSearch = () => {
  if (SearchText.value === '') {
    tags.value = originTags;
    return;
  }
   tags.value = originTags.map((parentTag) => {
    const tempParentTags = {...parentTag};
    const tempChildren = [...parentTag.children];
    tempParentTags.children = tempChildren.filter((child) => {
      return child.text.includes(SearchText.value)
    });
    return tempParentTags;
  });
};

const onCancel = () => {
  activeIds.value = [];
  tags.value = originTags;
};

const close = (tags: string) => {
  activeIds.value = activeIds.value.filter(item => item !== tags)
};

const activeIds = ref([]);
const activeIndex = ref(0);

// 搜索用户
const onSearchUser = () => {

  router.push({
    path: '/searchResult',
    query: {
      tags: activeIds.value
    }
  });
};


</script>

<style scoped>

</style>
