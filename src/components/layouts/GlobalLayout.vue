<template>
    <a-layout class="layout">
        <!--左侧导航-->
        <side-menu
                :theme="navTheme"
                :collapsible="true"
                :collapsed="collapsed">
        </side-menu>
        <a-layout>
            <!--顶部-->
            <global-header
                    :collapsed="collapsed"
                    @toggle="toggle">
            </global-header>
            <a-layout-content :style="{ margin: '24px 24px 0', height:'100%' }">
                <slot></slot>
            </a-layout-content>
            <a-layout-footer>
                <global-footer></global-footer>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import SideMenu from '@/components/menu/SideMenu'
    import GlobalHeader from './GlobalHeader'
    import GlobalFooter from './GlobalFooter'

    export default {
        name: 'GlobalLayout',
        components: {
            SideMenu,
            GlobalHeader,
            GlobalFooter
        },
        data() {
            return {
                navTheme: 'dark',
                collapsed: false,
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed
            },
        }
    }
</script>
<style scoped>

</style>
