export const TLEAVE_COLUMNS = [{
        title: "申请时间",
    dataIndex: "create_time",
    key: "create_time"
    },
    {
        title: "申请人",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "请假开始时间",
        dataIndex: "start_time",
        key: "start_time"
    },
    {
        title: "请假结束时间",
        dataIndex: "end_time",
        key: "end_time"
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
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    },
];