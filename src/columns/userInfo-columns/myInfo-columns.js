export const MYINFO_COLUMNS = [{
        title: "姓名",
        dataIndex: 'name',
        key: 'name'
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
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
    },
    {
        title: '籍贯',
        dataIndex: 'native',
        key: 'native',
    },
    {
        title: '身份',
        dataIndex: 'identity',
        key: 'identity',
        scopedSlots: { customRender: 'identity' },

    }
];