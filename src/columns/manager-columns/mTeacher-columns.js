export const MTEACHER_COLUMNS = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: {
        customRender: 'name',
    }
},
{
    title: '工号', //学号
    dataIndex: 'sid',
    key: "sid",
    scopedSlots: {
        customRender: 'sid',
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
        customRender: 'sex',
    }
},
{
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',

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
    title: '联系方式',
    dataIndex: 'phone',
    key: "phone"
},
{
    title: "操作",
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: 'action' }

},

]