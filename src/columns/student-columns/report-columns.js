export const REPORT_COLUMNS = [{
        title: "姓名",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '班级',
        dataIndex: 'class',
        key: 'class',
    },
    {
        title: '是否发热',
        dataIndex: 'hot',
        key: 'hot',
        scopedSlots: { customRender: 'hot' }
    },
    {
        title: '上报时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export const REPORT_RULES = {
    temperature: [
        { required: true, message: '请输入体温', trigger: 'blur' },
    ],
    fever: [{ required: true, message: '请选择是否发热、咳嗽', trigger: 'change' }],
    leave: [{ required: true, message: '请选择是否离开过学校', trigger: 'change' }],
    acid: [{ required: true, message: '请选择核酸检测结果', trigger: 'change' }],
    products: [{ required: true, message: '请选择杀毒用品是否充足', trigger: 'change' }],

    num: [
        { required: true, message: '请输入口罩数量', trigger: 'blur' },
    ],
}