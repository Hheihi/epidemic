export const MNOTICE_COLUMNS = [{
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
    title: "年级",
    dataIndex: "grade",
    key: "grade"

},
{
    title: "学院",
    dataIndex: "college",
    key: "college"
},
{
    title: "专业",
    dataIndex: "major",
    key: "major"
},
{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
},
];

export const MNOTICE_RULES = {
    theme: [
        { required: true, message: '请填写主题', trigger: 'blur' },
    ],
    content: [{ required: true, message: '请填写内容', trigger: 'blur' }],
    address: [{ required: true, message: '请选择通知对象', trigger: 'blur' }]
}