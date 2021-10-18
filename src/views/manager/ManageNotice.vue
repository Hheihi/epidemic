<template>
  <div>
    <CustomPageHeader title="通知管理">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写通知</a-button>
      </template>
    </CustomPageHeader>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a-tag color="blue" @click="update(record)">修改</a-tag>
        <a-tag color="red" @click="del(record)">删除</a-tag>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="填写通知"
      @ok="submitReport"
      @cancel="hideReport"
    >
      <a-form-model layout="inline" :model="form" ref="ruleForm" :rules="rules">
        <a-form-model-item label="主题" prop="theme">
          <a-input v-model="form.theme" type="text"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="内容" prop="content">
          <a-input v-model="form.content" type="textarea"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="对象" prop="address">
          <a-cascader
            :options="options"
            @change="onChange"
            v-model="form.address"
            size="large"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import CustomPageHeader from "@/components/CustomPageHeader";
import {
  MNOTICE_COLUMNS,
  MNOTICE_RULES,
} from "@/columns/manager-columns/mNotice-columns";
const data = [
  {
    key: "1",
    time: "2021-1-10",
    theme: "123231",
    content: "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
  },
  {
    key: "2",
    time: "2021-1-10",
    theme: "123231",
    content:
      "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
  },
  {
    key: "3",
    time: "2021-1-10",
    theme: "123231",
    content: "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
  },
];
const options = [
  {
    value: "18级",
    label: "18级",
    children: [
      {
        value: "传媒技术学院",
        label: "传媒技术学院",
        children: [
          {
            value: "软件工程",
            label: "软件工程",
          },
          {
            value: "广播电视工程",
            label: "广播电视工程",
          },
        ],
      },
       {
        value: "播音主持艺术学院",
        label: "播音主持艺术学院",
        children: [
          {
            value: "123213",
            label: "123213",
          },
        ],
      },
    ],
  },
  {
    value: "17级",
    label: "17级",
    children: [
      {
        value: "传媒技术学院",
        label: "传媒技术学院",
        children: [
          {
            value: "软件工程",
            label: "软件工程",
          },
        ],
      },
      {
        value: "播音主持艺术学院",
        label: "播音主持艺术学院",
        children: [
          {
            value: "123123",
            label: "123123",
          },
        ],
      },
    ],
  },
];

export default {
  name: "ManageNotice",
  data() {
    return {
      columns: MNOTICE_COLUMNS,
      data: data,
      visible: false,
      rules: MNOTICE_RULES,
      form: {
        theme: "",
        content: "",
        address: undefined,
      },
      options: options,
    };
  },
  components: {
    CustomPageHeader,
  },
  methods: {
    update(record) {
      console.log(record);
    },
    del(record) {
      console.log(record);
    },
    report() {
      this.visible = true;
    },
    hideReport() {
      this.visible = false;
      this.form = {
        theme: "",
        content: "",
      };
    },
    submitReport() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onChange(value) {
      console.log(value);
    },
  },
};
</script>

<style>
</style>