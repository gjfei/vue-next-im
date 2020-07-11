<template>
  <div class="container">
    <div class="user">
      <div class="user-info">
        <img
          src=""
          class="head-img"
          alt=""
        >
        <div class="user-name">
          {{userInfo.userName}}
        </div>
        <div class="menu">
          <icon icon-name='menu' />
        </div>
      </div>
      <div class="contact-list">
        <div class="contact-item active">
          <img
            src=""
            class="head-img"
            alt=""
          >
          <div class="info">
            <div class="top">
              <span class="name">联系人</span>
              <span class="time">12:10</span>
            </div>
            <div class="msg">123456</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="chat-header">
        联系人
      </div>
      <div class="msg-wrap">
        <div class="msg-list">
          <div
            class="msg-item"
            v-for="item in msgList"
            :key='item.id'
          >
            <div class="msg-time">{{item.time}}</div>
            <div class="msg-left">
              <img
                src=""
                class="head-img"
                alt=""
              >
              <div
                class="msg-text"
                v-html="item.msg"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="edit-wrap">
        <div class="tool-bar">
          <icon icon-name='smile' />
          <icon icon-name='image' />
        </div>
        <div
          class="input-wrap"
          ref="inputWrapRef"
        >
          <pre
            contenteditable="true"
            class="input"
            ref="msgInputRef"
            @input="changeMsg"
            @keydown.prevent.enter.exact="sendOut"
            @keydown.prevent.enter.shift="setWrap"
          ></pre>
        </div>
        <div class="footer">
          <span class="tips">按下Ctrl+Enter换行</span>
          <div
            class="btn"
            :class="{disabled:permit}"
            @click.enter="sendOut"
          >发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { getUserInfo } from '@/api'
export default {
  name: 'Home',
  setup(props, ctx) {

    onMounted(() => {
      getUserInfo().then(res => {
        console.log(res)
      })
    })

    const userInfo = reactive({
      userName: '前端切图仔'
    })

    const msgList = reactive([])
    const permit = ref(true)
    const msgInputRef = ref(null)
    const inputWrapRef = ref(null)
    const changeMsg = () => {
      if (msgInputRef.value.innerHTML != '') {
        permit.value = false
      } else {
        permit.value = true
      }
    }
    const sendOut = (e) => {
      if (msgInputRef.value.innerHTML != '') {
        msgList.push({
          id: msgList.length + 1,
          time: new Date().getTime(),
          msg: msgInputRef.value.innerHTML
        })
        msgInputRef.value.innerHTML = ''
      }
    }
    const setWrap = (e) => {
      msgInputRef.value.innerHTML += '<div><br/></div>'
      const range = window.getSelection() || document.selection.createRange()
      range.selectAllChildren(msgInputRef.value)
      range.collapseToEnd()
      if (msgInputRef.value.offsetHeight > 80) {
        inputWrapRef.value.scrollTop = msgInputRef.value.offsetHeight
      }
    }
    return {
      userInfo,
      msgList,
      permit,
      msgInputRef,
      inputWrapRef,
      changeMsg,
      setWrap,
      sendOut
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 650px;
  display: flex;
  align-items: center;
  .head-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: red;
    flex-shrink: 0;
  }
  .user {
    width: 280px;
    height: 100%;
    background-color: #f7f7f7;
    .user-info {
      display: flex;
      align-items: center;
      height: 80px;
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      border-right: 1px solid #eee;
      padding: 0 16px;
      box-sizing: border-box;
      .user-name {
        flex: 1;
        max-width: 165px;
        font-size: 18px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        padding: 0 5px;
        box-sizing: border-box;
      }
      .menu {
        cursor: pointer;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        color: #bababa;
      }
    }
    .contact-item {
      display: flex;
      height: 76px;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
      box-sizing: border-box;
      &.active {
        background-color: #fff;
      }
      .info {
        flex: 1;
        padding-left: 5px;
        box-sizing: border-box;
        .top {
          display: flex;
          align-items: center;
        }
        .name {
          flex: 1;
          color: #474747;
          font-size: 14px;
        }
        .time {
          color: #bababa;
          margin-left: 8px;
          font-size: 13px;
        }
        .msg {
          font-size: 13px;
          color: #bababa;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
      }
    }
  }
  .chat {
    flex: 1;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    .chat-header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #282828;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .msg-wrap {
      width: 100%;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 16px;
      box-sizing: border-box;
      .msg-list {
        .msg-time {
          font-size: 12px;
          line-height: 17px;
          padding: 16px 0;
          text-align: center;
          color: #bababa;
        }
        .msg-left,
        .msg-right {
          display: flex;
          box-sizing: border-box;
          margin-bottom: 15px;
          .msg-text {
            background-color: #f5f5f5;
            color: #282828;
          }
        }
        .msg-left {
          justify-content: flex-start;
          padding-right: 130px;
          .msg-text {
            margin-left: 10px;
            border-radius: 2px 20px 20px 20px;
          }
        }
        .msg-right {
          justify-content: flex-end;
          padding-left: 130px;
          flex-direction: row-reverse;
          .msg-text {
            background: #24d4d0;
            margin-right: 10px;
            color: #fff;
            border-radius: 20px 2px 20px 20px;
          }
        }
        .msg-text {
          padding: 8.5px 12px;
          font-size: 15px;
          font-weight: 300;
          word-wrap: break-word;
          box-sizing: border-box;
          line-height: 23px;
        }
      }
    }
    .edit-wrap {
      width: 100%;
      height: 180px;
      border-top: 1px solid #eee;
      .tool-bar {
        padding: 6px 16px;
        box-sizing: border-box;
        .iconfont {
          font-size: 30px;
          margin-right: 10px;
          cursor: pointer;
          color: #282828;
        }
      }
      .input-wrap {
        padding: 0 16px;
        height: 80px;
        overflow-y: auto;
        .input {
          min-height: 80px;
          line-height: 23px;
          font-size: 15px;
          color: #282828;
          white-space: pre-wrap;
          word-break: break-word;
          outline: none;
          font-family: inherit;
          margin: 0;
          -webkit-box-direction: normal;
        }
      }
      .footer {
        padding: 10px 16px 16px;
        height: 56px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        .tips {
          font-size: 14px;
          color: #bababa;
        }
        .btn {
          cursor: pointer;
          background: #fff;
          border: 1px solid #a9a9a9;
          border-radius: 4px;
          font-size: 15px;
          color: #282828;
          height: 30px;
          width: 90px;
          text-align: center;
          line-height: 28px;
          margin-left: 16px;
          &.disabled {
            color: #a9a9a9;
            border: 1px solid #e0e0e0;
            pointer-events: none;
            cursor: default;
          }
        }
      }
    }
  }
}
</style>
