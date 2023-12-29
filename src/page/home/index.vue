<template>
    <div class="wrapper">
        <h1>安全培训实操通用单元考核系统</h1>
        <div class="user-name">
            <div class="name-box">
                <a-input
                    placeholder="请输入准考证号"
                    @focus="currentInput = 'userName'"
                    v-model:value="userName"
                ></a-input>
                <a-input
                    placeholder="请输入密码"
                    @focus="currentInput = 'passWord'"
                    v-model:value="passWord"
                    type="password"
                ></a-input>
            </div>
        </div>
        <div class="keyboard">
            <div class="keyboard-wrapper">
                <div
                    class="word"
                    v-for="word in list"
                    :key="word"
                    @click="addWord(word)"
                >
                    {{ word }}
                </div>
                <div class="word" @click="delWord">删除</div>
            </div>
        </div>
        <div class="login-wrapper">
            <div class="button" @click="login">
                登录
                <!-- <a-button type="primary">登录</a-button> -->
            </div>
        </div>
    </div>
    <!-- <div class="create-remember" @click="toPage">+</div> -->
</template>
  
<script lang="ts">
import { reactive, defineComponent, toRefs } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const form = reactive({
            list: [1, 2, 3, "x", 4, 5, 6, 0, 7, 8, 9],
            userName: "",
            passWord: "",
            currentInput: "userName",
        });

        const addWord = (word: string) => {
            const current = form.currentInput as "userName" | "passWord";
            form[current] = `${form[current]}` + word;
        };

        const delWord = () => {
            const current = form.currentInput as "userName" | "passWord";
            form[current] = form[current].slice(0, form[current].length - 1);
        };

        const login = () => router.push({ name: "select" });

        return { ...toRefs(form), login, addWord, delWord };
    },
});
</script>


<style lang="less" scoped>
.wrapper {
    background: linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157));
    height: 100vh;
    h1,
    h3 {
        color: white;
        text-align: center;
    }
    h1 {
        padding-top: 30px;
        margin-top: 0px;
        text-shadow: 2px -2px 2px black;
    }
    .user-name {
        display: flex;
        justify-content: center;

        .name-box {
            width: 70%;
            background: rgba(255, 255, 255, 0.3);
            padding: 20px 30px;
            box-sizing: border-box;
            .ant-input {
                margin-bottom: 20px;
                font-size: 20px;
            }
        }
    }
    .keyboard {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        .keyboard-wrapper {
            width: 70%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .word {
            width: 23%;
            margin-bottom: 10px;
            float: left;
            color: #2193b0;
            background: white;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 30px;
        }
        .word:last-child {
            font-size: 22px;
        }
    }
    .login-wrapper {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        .button {
            background: #1d8ba8;
            padding: 20px 30px;
            color: white;
            text-align: center;
            font-size: 25px;
            font-weight: bold;
            //border: 2px solid white;
            border-radius: 3px;
            box-sizing: border-box;
            width: 70%;
            //background: linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237));

            background-color: #f1c40f;
            // text-shadow: -2px 2px 2px rgb(209 132 0),
            //     -2px 2px 2px rgb(209 132 0), -2px 2px 2px rgb(209 132 0),
            //     -2px 2px 2px rgb(209 132 0), -2px 2px 2px rgb(209 132 0),
            //     -2px 2px 2px rgb(209 132 0);
            box-shadow: 0px 15px 0px 0px #f39c12;
            .ant-btn {
                width: 100%;
            }
        }
    }
}
</style>
