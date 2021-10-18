export const LEAVE_COLUMNS = [{
        title: "申请时间",
        dataIndex: "time",
        key: "time"
    },
    {
        title: "请假时间",
        dataIndex: "leaveTime",
        key: "leaveTime"
    },
    {
        title: "请假理由",
        dataIndex: "reson",
        key: "reson",
    },
    {
        title: '审核结果',
        dataIndex: 'result',
        key: 'result',
        scopedSlots: { customRender: 'result' }
    },
];

export const LEAVE_RULES = {
    dateStart: [
        { required: true, message: '请选择开始时间', trigger: 'change' },
    ],

    dateEnd: [
        { required: true, message: '请选择结束时间', trigger: 'change' },
    ],

    desc: [
        { required: true, message: '请输入请假理由', trigger: 'blur' },
        { min: 20, message: '必须大于20字', trigger: 'blur' },
    ],
}