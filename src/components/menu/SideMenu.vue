<template>
    <a-layout-sider
            :trigger="null"
            :collapsible="collapsible"
            v-model="collapsed"
            width="256px"
            :class="['sider']">
        <logo></logo>
        <a-menu :theme="theme" mode="inline" :defaultSelectedKeys="['4']" style="padding: 16px 0px;text-align: left">
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="user"/><span>综合展示</span></span>
                <a-menu-item key="3">分析页</a-menu-item>
                <a-menu-item key="4">工作台</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user"/><span>User</span></span>
                <a-menu-item key="3">Tom</a-menu-item>
                <a-menu-item key="4">Bill</a-menu-item>
                <a-menu-item key="5">Alex</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script>
    import Logo from '@/components/tools/Logo'

    export default {
        name: "SideMenu",
        components: {Logo},
        props: {
            theme: {
                type: String,
                required: false,
                default: 'dark'
            },
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
    }
</script>

<style scoped>

</style>