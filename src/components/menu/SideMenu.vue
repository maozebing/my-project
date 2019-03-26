<template>
    <a-layout-sider
            :trigger="null"
            :collapsible="collapsible"
            v-model="collapsed"
            width="256px"
            :class="['sider']">
        <logo></logo>
        <a-menu
                :theme="theme"
                mode="inline"
                :defaultSelectedKeys="['workplace']"
                style="padding: 16px 0px;text-align: left"
                @click="menuClick">
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="user"/><span>综合展示</span></span>
                <a-menu-item key="workplace">工作台</a-menu-item>
                <a-menu-item key="analysis">分析页</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="setting" /><span>权限控制</span></span>
                <a-menu-item key="menu">菜单管理</a-menu-item>
                <a-menu-item key="role">角色管理</a-menu-item>
                <a-menu-item key="user">用户管理</a-menu-item>
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
        methods: {
            menuClick(item) {
                this.$router.push({name: item.key})
            }
        }
    }
</script>

<style scoped>

</style>