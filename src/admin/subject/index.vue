<template>
    <div class="wrapper">
        <div class="tool-bar">
            <div class="add-user" @click="user.show = true">添加账户+</div>
            <div
                class="item"
                @click="check"
                v-for="(subject, index) in subjects"
                :key="index"
            >
                {{ subject }}
            </div>
            <div class="item" @click="addProject">增加项目+</div>
        </div>

        <div class="content" v-if="!add">先添加或选择项目</div>
        <div class="content" v-else>
            <div class="subject-admin">
                <label for="">项目名字：</label>
                <a-input
                    v-model:value="content.title"
                    placeholder="如高压电工作业"
                ></a-input>
            </div>
            <div class="subject-admin">
                <label for="">科目列表：</label>
                <div class="subject-content">
                    <div
                        class="add-exam"
                        :class="{ selected: index === currentIndex }"
                        v-for="(exam, index) in content.exams"
                        @click="checkSubject(exam, index)"
                        :key="index"
                    >
                        {{ exam.name }}
                        <span @click="(event) => addSubject(event, exam)"
                            >!</span
                        >
                    </div>

                    <div class="add-exam" @click="addSubject">+</div>
                </div>
            </div>

            <div class="subject-item">
                <label for="">题库列表：</label>
                <div class="question">
                    <div
                        class="question-item"
                        v-for="(question, index) in currentExam.questions"
                        :key="index"
                        @click="editQuestion(question, index)"
                    >
                        {{ index + 1 }}
                    </div>
                    <div class="question-item" @click="addQuestion">+</div>
                </div>
            </div>
            <div>
                <a-button type="primary" @click="save">保存</a-button>
            </div>
        </div>

        <a-modal
            v-model:open="subject.show"
            :title="subject.title"
            @ok="subject.show = false"
            okText="确定"
            cancelText="取消"
        >
            <div class="subject-item">
                <label for="">科目名字：</label>
                <a-input
                    type="text"
                    v-model:value="currentExam.name"
                    placeholder="例如科目一"
                ></a-input>
            </div>
            <div class="subject-item">
                <label for="">科目标题：</label>
                <a-input
                    type="text"
                    v-model:value="currentExam.introduce"
                ></a-input>
            </div>
            <div class="subject-item">
                <label for="">科目说明：</label>
                <a-input
                    type="text"
                    v-model:value="currentExam.instruction"
                ></a-input>
            </div>
            <div class="subject-item">
                <label for="">考试时间：</label>
                <a-input
                    type="text"
                    v-model:value="currentExam.time"
                    placeholder="考试时间默认5分钟"
                ></a-input>
            </div>
            <div class="subject-item">
                <label for="">是否笔试：</label>
                <a-switch v-model:checked="currentExam.canClick"></a-switch>
            </div>
        </a-modal>
        <a-modal
            v-model:open="user.show"
            title="添加学生账户"
            @ok="addUser"
            okText="确定"
            cancelText="取消"
        >
            <a-input
                placeholder="账户名"
                v-model:value="user.username"
                maxlength="12"
            ></a-input>
            <a-input
                maxlength="20"
                placeholder="密码"
                v-model:value="user.password"
            ></a-input>
        </a-modal>
        <a-modal
            v-model:open="question.show"
            :title="question.title"
            @ok="onAddQuestion"
            okText="确定"
            cancelText="取消"
        >
            <div class="question question-box">
                <div class="subject-item">
                    <label for="">题干：</label>
                    <a-input v-model:value="currentQuestion.title"></a-input>
                </div>
                <div class="subject-item">
                    <label for="">题干图片（可选）：</label>
                    <a-upload
                        v-model:file-list="currentQuestion.imgs"
                        name="file"
                        action="/api/upload"
                     
                        @change="handleQuestionChange"
                    >
                        <a-button type="primary">点击上传图片</a-button>
                    </a-upload>
                </div>

                <div
                    class="option"
                    v-for="(option, index) in currentQuestion.options"
                    :key="index"
                >
                    <p>
                        选项{{ index + 1 }} <span>是图片：</span
                        ><a-switch v-model:checked="option.isImg"></a-switch>
                        <span>设为正确答案：</span
                        ><a-switch
                            v-model:checked="option.isCorrect"
                        ></a-switch>
                    </p>
                    <a-input
                        placeholder="请输入选项"
                        v-if="!option.isImg"
                        v-model:value="option.text"
                    ></a-input>
                    <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                        v-else
                    >
                        <a-button type="primary">点击上传图片</a-button>
                    </a-upload>
                </div>
                <div class="add-question" @click="addAnwser">增加选项+</div>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { axios } from "@/utils/axios";
import { message } from "ant-design-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
    setup() {
        const form: any = reactive({
            user: {
                show: false,
                username: "",
                password: "",
            },
            subjects: [],
            question: {
                show: false,
                title: "",
            },
            add: false,
            subject: {
                show: false,
                title: "",
            },
            currentIndex: 0,
            currentExam: {},
            currentQuestion: {},
            content: {
                title: "",
                exams: [],
            },
        });

        const check = () => {};

        const checkSubject = (exam: any, index: number) => {
            form.currentIndex = index;
            form.currentExam = exam;
        };

        const addSubject = (_: any, exam?: any) => {
            // console.log(exam, "e");
            if (exam) {
                form.subject = {
                    show: true,
                    title: "编辑科目",
                };
            } else {
                form.currentExam = {
                    name: `科目${form.content.exams.length + 1}`,
                    introduce: "",
                    instruction: "",
                    canClick: false,
                    time: 5,
                };
                form.content.exams.push(form.currentExam);

                form.subject = {
                    show: true,
                    title: "添加科目",
                };
                form.currentIndex = form.content.exams.length - 1;
            }
        };
        const addProject = () => {
            form.add = true;
        };

        const editQuestion = (question: any) => {
            form.currentQuestion = question;
            form.question.title = "改题";
            form.question.show = true;
        };
        const addAnwser = () => {
            form.currentQuestion.options.push({
                isImg: false,
                isCorrect: false,
                text: "",
            });
        };
        const addQuestion = () => {
            if (!form.currentExam.name) {
                message.warn("先选择一个科目");
                return;
            }
            form.question.title = "加题";
            form.question.show = true;

            if (!form.currentExam.questions) form.currentExam.questions = [];

            form.currentQuestion = {
                title: "",
                imgs: [],
                options: [
                    {
                        isImg: false,
                        url: "",
                        isCorrect: false,
                        text: "",
                    },
                ],
            };
            console.log("add", form.currentQuestion);
            form.currentExam.questions.push(form.currentQuestion);
        };

        const addUser = () => {
            axios.post("/api/adduser", form.user).then((result) => {
                console.log(result, "result");
            });
        };

        const onAddQuestion = () => {
            form.question.show = false;
            const options = JSON.stringify(form.currentQuestion.options);

            axios
                .post("/api/add-subject", { title: form.currentQuestion.title })
                .then((result) => {
                    console.log(result, "result");
                });
        };

        const save = () => {
            const exams = JSON.stringify(form.content.exams);
            axios
                .post("/api/add-project", { exams, title: form.content.title })
                .then((result) => {
                    console.log(result, "result");
                });
            //console.log(axios, "axios");
        };
        return {
            ...toRefs(form),
            onAddQuestion,
            addUser,
            checkSubject,
            editQuestion,
            addAnwser,
            addProject,
            check,
            addSubject,
            save,
            addQuestion,
        };
    },
});
</script>
<style lang="less" scoped>
.add-user {
    background: red;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    border-radius: 4px;
    margin-bottom: 10px;
}
.wrapper {
    background: #f5f5f5;
    height: 100vh;
    .tool-bar {
        float: left;
        width: 30%;
        padding: 12px;
        background: white;
        height: 100vh;
        box-sizing: border-box;
        .item {
            //border-bottom: 1px solid #397cff;
            margin-bottom: 2px;
            border-radius: 4px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: white;
            padding-left: 8px;
            background: #1b9dff;
            position: relative;
        }
    }
    .content {
        width: 68%;
        position: absolute;
        padding: 12px;
        right: 0px;
        top: 0px;
        height: 100vh;
        background: white;
        box-sizing: border-box;
        .title {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .subject-admin {
            display: grid;
            grid-template-columns: 90px 1fr;
            .ant-input {
                //width: 30%;
                margin-bottom: 10px;
            }
            .add-exam {
                width: 45%;
                background: #f3f3f3;
                height: 30px;
                font-size: 12px;
                text-align: center;
                line-height: 30px;
                margin-bottom: 10px;
                color: #333;
                border-radius: 5px;
                float: left;
                margin-right: 3%;

                span {
                    color: white;
                    transform: rotate(30deg);
                    font-weight: bold;
                    display: inline-block;
                }
            }
            .add-exam:last-child {
                color: black;
            }
            .selected {
                background: rgb(59, 59, 230, 0.1);
                color: white;
            }
        }

        .question-detail {
            padding-left: 90px;
        }

        .question {
            .question-item {
                width: 40px;
                float: left;
                margin-right: 10px;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                height: 40px;
                background: #f3f3f3;
            }
        }
        .question-detail {
            p {
                span {
                    margin-left: 20px;
                }
            }
        }
    }
}
.subject-item {
    display: grid;
    margin-top: 16px;
    grid-template-columns: 90px 1fr;
}
.ant-switch {
    width: 30px;
}
.add-question {
    background: #f3f3f3;
    margin-top: 13px;
    padding: 6px;
}
.question-box {
    max-height: 80vh;
    overflow-y: scroll;
}
</style>