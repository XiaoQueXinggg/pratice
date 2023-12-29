<template>
    <div class="wrapper">
        <div class="transaction-wrapper">
            <h1>管理员后台</h1>
            <div class="player-username">
                <label for="">账号：</label>
                <a-input placeholder="输账号"></a-input>
            </div>
            <div class="player-username">
                <label for="">密码：</label>
                <a-input placeholder="输密码" type="password"></a-input>
            </div>

            <div class="step-button">
                <a-button type="primary" @click="login">登录</a-button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const form = reactive({
    player: "",
    phone: "",
    QQ: "",
    money: "",
});
const router = useRouter();
const login = () => router.push("../lihuixian-admin");
// import { Input, Button } from "ant-design-vue";

// const form = reactive({
//     username: "",
//     password: "",
// });

// const onInputChange = ($event: { target: HTMLInputElement }) => {
//     const value = $event.target.value;

//     if (props.max && value) {
//         emits("update:value", value.slice(0, props.max));
//         return;
//     }
//     emits("update:value", value);
// };
// const count = ref(0);
</script>


<style lang="less" scoped>
.wrapper {
    background: #cce1f3;
    height: 100vh;
}
h1 {
    text-align: center;
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
    margin-bottom: 30px;
}
.transaction-wrapper {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    background: rgba(255, 255, 255, 0.6);
    padding: 32px;
    transform: translate(-50%, -50%);
    .ant-btn {
        width: 100%;
    }
    .player-username {
        display: grid;
        grid-template-columns: 50px 1fr;
        margin-bottom: 12px;
        label {
            font-size: 12px;
            color: #333;
            height: 30px;
            width: 50px;
            line-height: 30px;
        }
    }
    .step-button {
        margin-top: 30px;
    }
}
</style>
