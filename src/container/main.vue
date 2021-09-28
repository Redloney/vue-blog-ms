<template>
  <div class="main">
    <div class="card-wrapper">
      <el-card class="box-card-mid timeline">
        <template #header>
          <div class="card-header">
            <span>时间线</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in state.updates.slice(0, 6)"
            :key="item"
            :timestamp="format(item.createdAt, 'YYYY-MM-DD dddd A HH点 - mm分')"
            placement="top"
          >
            <el-card shadow="always" :body-style="{ padding: '20px' }">
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-for="item in state.updates.slice(0, 6)"
            :key="item"
            :timestamp="format(item.createdAt, 'YYYY-MM-DD dddd A HH点 - mm分')"
            placement="top"
          >
            <el-card shadow="always" :body-style="{ padding: '20px' }">
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-for="item in state.updates.slice(0, 6)"
            :key="item"
            :timestamp="format(item.createdAt, 'YYYY-MM-DD dddd A HH点 - mm分')"
            placement="top"
          >
            <el-card shadow="always" :body-style="{ padding: '20px' }">
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
    <div class="card-wrapper">
      <el-card class="box-card-big newest-art">
        <template #header>
          <div class="card-header">
            <span>最新文章</span>
          </div>
        </template>
        <div
          v-for="article in state.articles.slice(0, 3)"
          :key="article"
          class="text item"
          style="margin-bottom: 25px"
        >
          <p style="font-size: 18px; font-weight: 500; margin-bottom: 5px">
            {{ article.title }}
          </p>
          <span style="color: #777777">{{
            new Date(article.updateTime).toLocaleDateString()
          }}</span>
          <span style="margin-left: 20px; margin-bottom: 20px">
            <!-- <collection-tag style="width: 18px; height: 18px;" color="#777777" /> -->
            {{ article.category }}
          </span>
          <p style="font-size: 15px; font-weight: 400; margin-top: 5px">
            {{ article.summary }}
          </p>
        </div>
      </el-card>

      <el-card class="box-card-big newest-comment" style="margin-top: 20px">
        <template #header>
          <div class="card-header">
            <span>最新留言</span>
          </div>
        </template>
        <div
          class="comment"
          v-for="comment in state.comments.slice(0, 3)"
          :key="comment._id"
        >
          <el-avatar class="avatar" :src="comment.userinfo.avatar"></el-avatar>

          <div class="content">
            <div class="header">
              <span class="nickname">
                {{ comment.userinfo.nickname }}
              </span>
              <span class="date">{{ format(comment.createdAt, "YYYY-MM-DD") }}</span>
            </div>
            <p class="context">{{ comment.content }}</p>
          </div>
        </div>
      </el-card>
    </div>
    <!-- <div class="card-card-wrapper">
      <el-card class="box-card-small" style="margin-top: 0;">
        <template #header>
          <div class="card-header">
            <span>待办事项</span>
          </div>
        </template>
        <div v-for="todo in state.todos.slice(0, 5)" :key="todo" class="text item">
          <span style="color: #777777;">{{ new Date(todo.updateTime).toLocaleDateString() }}</span>
          <p style="font-size: 18px; font-weight: 500;">
            <span v-if="todo.state === 1">
              <close style="width: 20px; height: 20px;" color="#f56c6c" />
            </span>
            <span v-if="todo.state === 2">
              <check style="width: 20px; height: 20px;" color="#67c23a" />
            </span>
            {{ todo.content }}
          </p>
        </div>
      </el-card>
    </div>-->
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { onMounted, reactive } from "vue";
import { getComment } from "../api/comment";
import { getUpdates } from "../api/update";

interface State {
  articles: Array<any>;
  todos: Array<any>;
  comments: Array<any>;
  updates: Array<any>;
}

const state = reactive<State>({
  articles: [],
  todos: [],
  comments: [],
  updates: [],
});

const format = (date: string, format: string) => {
  return dayjs(date).format(format);
};

onMounted(() => {
  load();
});

const load = async () => {
  // 获取时间线
  const { updates } = await getUpdates();
  state.updates = updates;
  // 留言 查询条件是 日期 倒序 5 条
  const comments = await getComment({ size: 5, sorter: "createdAt_descend" });
  state.comments = comments;
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .main {
    flex-direction: column;
    .card-wrapper {
      margin-left: 0% !important;
    }
  }
}
.main {
  display: flex;
  min-height: 100%;
  .card-wrapper {
    &:not(:first-of-type) {
      margin-left: 5%;
    }
    .timeline {
      min-width: 300px;
      margin-bottom: 20px;
    }
    // .newest-art {
    // }
    .newest-comment {
      .comment {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        .avatar {
          margin-right: 20px;
        }

        .content {
          width: 90%;
          padding-bottom: 15px;
          border-bottom: 2px solid #dddddd;
          .header {
            margin: 10px 0;
            .nickname {
              font-size: 13px;
              font-weight: bold;
              margin-right: 10px;
            }
            .date {
              font-size: 12px;
              color: #777;
            }
          }
          .context {
            margin: 10px 0;
            font-size: 14px;
            line-height: 1.35em;
            @include multi-ellipsis(3);
          }
        }
      }
    }
  }
}
</style>
