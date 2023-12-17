const state = {
    requests: [
        {
            id: 1,
            userId: 1,
            destinationType: '钓鱼',
            topic: '钓鱼活动',
            description: '组织钓鱼活动，欢迎大家参加',
            image: '钓鱼活动图片链接',
            maxPrice: 100,
            endDate: '2022-12-31',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-02',
            status: '待响应'
        },
        {
            id: 2,
            userId: 2,
            destinationType: '温泉度假',
            topic: '温泉度假行',
            description: '一起去温泉度假，放松身心',
            image: '温泉度假图片链接',
            maxPrice: 200,
            endDate: '2022-12-31',
            createdAt: '2022-01-03',
            updatedAt: '2022-01-04',
            status: '已完成'
        },
        // 添加更多请求...
    ]
}

export default {
    state
}
