<template>
  <section class="manage">
    <header class="header">
      <router-link
        :to="{ path: '/', query: { time } }"
        class="return-btn"
        tag="span"
        >&lt;</router-link
      >
      <h3 class="title">日志管理</h3>
    </header>

    <div class="record-form">
      <div class="record-form-item">
        <h4 class="record-form-item__label">日志标题：</h4>
        <div class="record-form-item__input">
          <input
            v-if="mode === 'add'"
            v-model="formData.title"
            type="text"
            class="record-title"
          />
          <div v-else>{{ formData.title }}</div>
        </div>
      </div>
      <div class="record-form-item">
        <h4 class="record-form-item__label">日志内容：</h4>
        <div class="record-form-item__input">
          <textarea
            v-if="mode === 'add'"
            v-model="formData.content"
            class="record-content"
          ></textarea>
          <div v-else>{{ formData.content }}</div>
        </div>
      </div>
      <div class="record-form-item">
        <button v-if="mode === 'add'" class="add-record-btn" @click="addRecord">
          新增
        </button>
        <button v-else class="delete-record-btn" @click="deleteRecord">
          删除
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mode: this.$route.query.id ? 'delete' : 'add',
      time: this.$route.query.time,
      id: this.$route.query.id,
      formData: {
        title: '',
        content: '',
      },
    }
  },
  created() {
    if (this.mode === 'delete') {
      const record = this.$storage.get(this.time, this.id)
      this.formData = {
        title: record.title,
        content: record.content,
      }
    }
  },
  methods: {
    addRecord() {
      if (!this.formData.title || !this.formData.content) {
        alert('输入不能为空！')
        return
      }
      this.$storage.set(this.time, this.formData.title, this.formData.content)
      this.$router.push({ path: '/', query: { time: this.time } })
    },
    deleteRecord() {
      this.$storage.del(this.time, this.id)
      this.$router.replace({ path: '/', query: { time: this.time } })
    },
  },
}
</script>

<style lang="less" scoped>
@border-color: #d0d0d0;

.manage {
  .header {
    position: relative;
    color: #fff;
    background-color: #0fc37c;
    .return-btn {
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
    }
    .title {
      height: 1.2rem;
      line-height: 1.2rem;
      margin: 0;
      text-align: center;
    }
  }
  .record-form {
    padding: 0.3rem;
    .record-form-item {
      margin-bottom: 0.3rem;
      .record-form-item__label {
        margin: 0 0 0.1rem;
      }
      .record-form-item__input {
        .record-title {
          box-sizing: border-box;
          width: 100%;
          height: 0.8rem;
          padding: 0.1rem;
          font-size: 1em;
          border: 1px solid @border-color;
          border-radius: 4px;
        }
        .record-content {
          box-sizing: border-box;
          width: 100%;
          height: 2.4rem;
          padding: 0.1rem;
          font-size: 1em;
          border: 1px solid @border-color;
          border-radius: 4px;
        }
      }
      .add-record-btn,
      .delete-record-btn {
        width: 1.4rem;
        height: 0.8rem;
        font-size: 1em;
        border: none;
        color: #fff;
        background-color: #0fc37c;
      }
    }
  }
}
</style>
