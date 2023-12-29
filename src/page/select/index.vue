<template>
    <div class="select-wrapper">
        <h2>请选择操作模式</h2>
        <div class="wrapper">
            <div class="text" @click="test">理论模拟考试</div>
            <div class="actual" @click="practice">实操模拟练习</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();
        const test = () => router.push({ name: "test" });
        const practice = () => router.push({ name: "practice" });
        return { test, practice };
    },
});
</script>
<style lang="less" scoped>
.select-wrapper {
    background: linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157));
    height: 100vh;
    h2 {
        margin: 0px;
        text-align: center;
        padding-top: 20px;
    }
    .wrapper {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 50%;
        width: 70%;
        top: 50%;
        transform: translate(-50%, -50%);
        div {
            width: 100%;
            position: relative;
            height: 100px;
            line-height: 100px;
            border-radius: 5px;
        }
        .text {
            background: #ffadad;
            padding-left: 12px;

            text-align: start;
            color: white;
            box-shadow: -4px -2px 20px 1px #fa6767;
            &::after {
                content: "";
                position: absolute;
                right: -12px;
                top: 0px;
                border-width: 100px 12px;
                border-style: solid;
                border-color: #ffadad transparent transparent transparent;
            }
        }
        .actual {
            background: #7f7fff;

            text-align: end;
            padding-right: 10px;
            color: white;
            margin-left: 12px;
            position: relative;
            box-shadow: 1px 4px 16px 2px #7f7fff;
            &::after {
                content: "";
                position: absolute;
                left: -12px;
                bottom: 0px;
                border-width: 100px 12px;
                border-style: solid;
                border-color: transparent transparent #7f7fff transparent;
            }
        }
    }
}
</style>