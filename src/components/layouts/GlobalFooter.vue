<template>
    <div class="footer">
        <div class="copyright">
            Ant Design Admin
            <a-icon type="copyright"/>
            2019 <span>Created by mzb</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LayoutFooter',
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .footer {
        padding: 0 16px;
        text-align: center;

        .copyright {
            color: rgba(0, 0, 0, .45);
            font-size: 14px;
        }
    }
</style>
