<template>
    <a-layout-header :style="{ padding: '0' }">
        <div class="header">
            <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="toggle"/>
            <user-menu></user-menu>
        </div>
    </a-layout-header>
</template>

<script>
    import UserMenu from '@/components/tools/UserMenu'

    export default {
        name: "GlobalHeader",
        components: {
            UserMenu,
        },
        props: {
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        methods: {
            toggle() {
                this.$emit('toggle')
            }
        }
    }
</script>

<style scoped>

</style>