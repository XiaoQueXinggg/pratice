<template>
    <div class="content">
        <div class="exam-wrapper">
            <div class="user-info">
                <div class="user-mode">
                    <div class="time-left">剩余时间:{{}}</div>
                    <h1>考生信息</h1>
                    <div class="avatar"></div>
                    <div class="info">
                        <p>考生姓名：{{}}</p>
                        <p>准考证号：{{}}</p>
                        <p>考试项目：{{}}</p>
                    </div>
                </div>
                <div class="score">
                    <h1>答题卡</h1>
                    <div class="score-result">
                        <div v-for="(subject, key) in subjects" :key="key">
                            <span>{{ key }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="exam-list">
                <div class="title"></div>
                <div class="selection">
                    <div class="selection-option"></div>
                </div>
                <img src="" class="instruction" />
                <div class="submit-button">
                    <a-button>上一题</a-button>
                    <a-button>下一题</a-button>
                </div>
            </div>
        </div>
        <!-- <div class="to-exam">
            <div
                class="exam"
                v-for="(subject, index) in subjects"
                :key="index"
                @click="exam(index)"
            >
                <span class="mark">考</span>
                {{ subject }}
            </div>
            <div class="exam" @click="goBack">
                <span class="mark">{{ back }}</span>
                返回
            </div>
        </div> -->
    </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";

import {
    defineComponent,
    computed,
    reactive,
    toRefs,
    watch,
    onBeforeMount,
    ref,
} from "vue";

import { useRouter, useRoute } from "vue-router";
const back = "<";
export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        const form = reactive({
            subjects: ["科目一", "科目二", "科目三", "科目四"],
        });

        const exam = (id: number) =>
            router.push(`../exam/${id}?subject=${route.query.id}`);

        const goBack = () => history.go(-1);

        return { ...toRefs(form), back, exam, goBack };
    },
});
</script>
<style lang="less" scoped>
h1 {
    font-size: 17px;
}
.content {
    background: #cce1f3;
    height: 100vh;
    padding: 12px;
    padding-top: 50px;
    .exam-wrapper {
        display: grid;
        grid-template-columns: 40% 1fr;
    }
    .exam-list {
        background: white;
        border-radius: 10px;
        padding: 12px;
        margin-left: 12px;
        .exam-item {
            border: 1px solid #397cff;
            margin-bottom: 18px;
            border-radius: 4px;
            height: 60px;
            padding-left: 8px;
            background: #eaf6ff;
            position: relative;
            &::before {
                position: absolute;
                left: 0px;
                height: 100%;
                content: "";
                width: 3px;
                background: #397cff;
            }
        }
    }
    .user-info {
        display: flex;
        flex-direction: column;
        .user-mode {
            background: white;
            padding: 16px;
            border-radius: 10px;
            flex: 1;
            margin-bottom: 12px;

            .info {
                p {
                    font-size: 15px;
                    color: #999;
                }
            }
        }
        .score {
            flex: 1;
            background: white;
            padding: 8px;
            border-radius: 10px;
        }
        .score-result {
            display: flex;
            justify-content: space-between;
            width: 100%;
            div {
                width: 19%;
                text-align: center;
                position: relative;
            }
        }
    }
    .to-exam {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        .exam {
            height: 130px;
            width: 19%;
            border-radius: 10px;
            background: #397cff;
            color: white;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .mark {
                display: inline-block;
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                text-align: center;
                margin-bottom: 12px;
                line-height: 30px;
                font-size: 14px;
            }
        }
    }
}
</style>