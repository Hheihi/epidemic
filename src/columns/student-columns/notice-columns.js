export const NOTICE_COLUMNS = [{
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time"
},
{
    title: "主题",
    dataIndex: "theme",
    key: "theme"
},
{
    title: "内容",
    dataIndex: "content",
    key: "content"
},
{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
},
];