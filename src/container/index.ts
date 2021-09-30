import { reactive } from 'vue'

// 表格
export const taballFields = [
  // {
  //   label: 'ID',
  //   prop: '_id',
  // },
  // {
  //   label: '作者',
  //   prop: 'author',
  // },
  {
    label: '标题',
    prop: 'title',
    width: '150px',
  },
  {
    label: '描述',
    prop: 'desc',
    width: '200px',
  },
  {
    label: '查看',
    prop: 'watchNum',
    width: '80px',
  },
  {
    label: '点赞',
    prop: 'thumbNum',
    width: '80px',
  },
  {
    label: '分类',
    prop: 'classify.label',
    width: '80px',
  },
  {
    label: '状态',
    prop: 'artState.label',
    width: '80px',
  },
  {
    label: '更新时间',
    prop: 'updatedAt',
    width: '150px',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    width: '150px',
  },
]

export const rules = {
  title: {
    required: true,
    message: '请填写文章标题',
    trigger: ['blur', 'change'],
  },
  author: {
    required: true,
    message: '请填写作者',
    trigger: ['blur', 'change'],
  },
  classify: {
    required: true,
    message: '请选择文章分类',
    trigger: ['blur', 'change'],
  },
  artState: {
    required: true,
    message: '请选择文章状态',
    trigger: ['blur', 'change'],
  },
  desc: [
    {
      required: true,
      message: '请填写文章描述',
      trigger: ['blur', 'change'],
    },
    {
      min: 5,
      message: '文章描述不少于5个字符',
      trigger: ['blur', 'change'],
    },
  ],
  // cover: [
  //   // {
  //   //   required: true,
  //   //   type: "string",
  //   //   message: "请选择上传封面图片",
  //   //   trigger: "change",
  //   // },
  //   // {
  //   //   validator: (rule, value, callback) => {
  //   //     if (value[0] === undefined) {
  //   //       callback(new Error("请选择上传封面图片"));
  //   //     } else {
  //   //       callback();
  //   //     }
  //   //   },
  //   //   trigger: "change",
  //   // },
  // ],
}

interface State {
  category: Array<Category>
  status: Array<any>
  insertFormData: any
}

export const state = reactive<State>({
  category: [],
  status: [],
  insertFormData: {
    title: String,
    author: String,
    desc: String,
    html: String,
    cover: String,
    classify: Object,
    artState: Object,
  },
})

// 查询表单数据
export const queryFormField = reactive({
  author: '',
  title: '',
  classify: {},
  artState: {},
})

export const fn = {}
