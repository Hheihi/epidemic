export const TLEAVE_COLUMNS = [{
        title: "申请时间",
        dataIndex: "time",
        key: "time"
    },
    {
        title: "申请人",
        dataIndex: "leaveName",
        key: "leaveName"
    },
    {
        title: "请假时长",
        dataIndex: "leaveTime",
        key: "leaveTime"
    },
    {
        title: "请假理由",
        dataIndex: "reason",
        key: "reason",
    },
    {
        title: '审核结果',
        dataIndex: 'result',
        key: 'result',
        scopedSlots: { customRender: 'result' }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    },
];