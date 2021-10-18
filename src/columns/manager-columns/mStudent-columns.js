export const MSTUDENT_COLUMNS = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '学号', //学号
        dataIndex: 'sid',
        key: "sid",
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: true

    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '专业',
        dataIndex: 'major',
        key: 'major',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        }
    },
    {
        title: '联系方式',
        dataIndex: 'phone',
        key: "phone"
    },
    {
        title: '籍贯',
        dataIndex: 'native',
        key: "native"
    }

]