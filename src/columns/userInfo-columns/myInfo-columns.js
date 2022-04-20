export const MYINFO_COLUMNS = [{
        title: "姓名",
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '学号',
        dataIndex: 'sid',
        key: 'sid',
    },
    {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
    },
    {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
    },
    {
        title: '专业',
        dataIndex: 'major',
        key: 'major',
    },
    {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: '班级',
        dataIndex: 'class_info',
        key: 'class_info',
    },
    {
        title: '籍贯',
        dataIndex: 'source',
        key: 'source',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '身份',
        dataIndex: 'identity',
        key: 'identity',
        scopedSlots: { customRender: 'identity' },
    }
];