<template>
    <div>
        <h1>管理员可用功能需求</h1>
        <h2>1) 查询当前所有用户基本信息</h2>
        <button @click="fetchUsers">查询用户信息</button>
        <ul v-if="users.length > 0">
            <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
        </ul>

        <h2>2) 查询一定条件的“寻去处”请求状态信息</h2>
        <button @click="fetchRequests">查询请求信息</button>
        <ul v-if="requests.length > 0">
            <li v-for="request in requests" :key="request.id">
                {{ request.status }} - {{ request.user.name }}
                <button @click="showUserInfo(request.user.id)">显示用户信息</button>
            </li>
        </ul>

        <h2>3) 查询接受请求信息</h2>
        <button @click="fetchResponses">查询响应信息</button>
        <ul v-if="responses.length > 0">
            <li v-for="response in responses" :key="response.id">
                {{ response.user.name }}
                <button @click="showUserInfo(response.user.id)">显示用户信息</button>
            </li>
        </ul>

        <h2>4) 查询已完成“寻去处”请求的本月累计中介费收益信息</h2>
        <button @click="fetchIncome">查询中介费收益信息</button>
        <div v-if="income">
            <p>本月累计中介费收益: {{ income }}</p>
            <p>本月累计笔数: {{ transactions }}</p>
            <!-- Add chart and table components to display the data -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            requests: [],
            responses: [],
            income: null,
            transactions: null
        };
    },
    methods: {
        fetchUsers() {
            // Make an API call to fetch all user information
            // Update the 'users' data property with the response
        },
        fetchRequests() {
            // Make an API call to fetch requests based on certain conditions
            // Update the 'requests' data property with the response
        },
        fetchResponses() {
            // Make an API call to fetch responses
            // Update the 'responses' data property with the response
        },
        fetchIncome() {
            // Make an API call to fetch income and transaction data
            // Update the 'income' and 'transactions' data properties with the response
        },
        showUserInfo(userId) {
            // Implement logic to display user information based on the provided userId
        }
    }
};
</script>
