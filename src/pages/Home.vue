<template>
  <div class="home">
    <!-- 日历插件 -->
    <div class="calendar">
      <calendar @choseDay="choseDay" :markDate="mark"></calendar>
    </div>

    <!-- 日志列表 -->
    <div class="records">
      <div v-if="records.length === 0" class="tip">暂无数据</div>
      <ul v-else class="records__inner">
        <li v-for="item in records" :key="item.id" class="record">
          <router-link
            :to="{ path: '/manage', query: { time: mark[0], id: item.id } }"
            tag="div"
          >
            <div class="record__inner">
              <span class="record__time">{{ item.time }}</span>
              <div class="record__main">
                <h3 class="record__title">{{ item.title }}</h3>
                <p class="record__content">{{ item.content }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 新增按钮 -->
    <router-link
      :to="{ path: '/manage', query: { time: mark[0] } }"
      class="add-btn"
      tag="button"
    ></router-link>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      mark: [],
      records: [],
    }
  },
  created() {
    this.mark = [this.$storage.formatDate(new Date())]
    const time = this.$route.query.time
    if (time) {
      this.mark = [decodeURIComponent(time)]
    }
    this.initData()
  },
  methods: {
    // 日期切换
    choseDay(time) {
      this.mark = [this.$storage.formatDateString(time)]
      this.initData()
    },

    // 获取数据
    initData() {
      const time = this.mark[0]
      this.records = this.$storage.get(time)
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .records {
    flex: 1;
    overflow: auto;
    padding: 0.3rem;
    .records__inner {
      padding-left: 0.4rem;
      .record {
        .record__inner {
          display: flex;
          align-items: baseline;
          .record__time {
            margin-right: 0.2rem;
          }
          .record__main {
            overflow: hidden;
            .record__title {
              margin: 0;
              padding: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .record__content {
              margin-top: 0.2rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .add-btn {
    position: absolute;
    bottom: 0.6rem;
    right: 0.3rem;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    color: #fff;
    background-color: #0fc37c;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 22px;
      margin-left: -11px;
      margin-top: -1px;
      border-top: 2px solid;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 2px;
      margin-left: -1px;
      margin-top: -11px;
      border-top: 22px solid;
    }
  }
}
</style>
