<template>
    <div class="wrapper">
        <div class="select-pratice">
            <h2>请选择作业练习</h2>
            <div class="work-list">
                <div
                    class="work"
                    v-for="(work, index) in works"
                    :key="index"
                    @click="toSubject(index)"
                >
                    {{ work }}
                </div>
                <div class="work" @click="goBack">返回</div>
            </div>
        </div>
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

import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const form = reactive({
            works: [
                "高压电工作业",
                "低压电工作业",
                "高处安装，维护，拆除作业",
                "登高架设作业",
                "融化焊接与热切割作业",
            ],
        });
        const router = useRouter();

        const toSubject = (id: number) => router.push(`./subject/${id}`);

        const goBack = () => history.go(-1);

        return { ...toRefs(form), goBack, toSubject };
    },
});
</script>
<style lang="less" scoped>
.wrapper {
    // background: linear-gradient(
    //     to right,
    //     rgb(33, 147, 176),
    //     rgb(109, 213, 237)
    // );
    // background: linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237));
    background: linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157));
    height: 100vh;
    h2 {
        margin: 0px;
        text-align: center;
        padding-top: 20px;
    }
    .work-list {
        width: 70%;
        background: rgba(255, 255, 255, 0.6);
        //padding: 20px 30px;

        position: relative;
        margin: 30px auto 0;
        border-radius: 10px;
        box-sizing: border-box;
        .work {
            // background: white;
            height: 70px;
            font-size: 17px;
            color: #666;
            padding-left: 20px;
            line-height: 70px;
            border-bottom: 1px solid #f3f3f3;
        }
        .work:last-child {
            border-bottom: 0px solid transparent;
        }
    }
}
</style>