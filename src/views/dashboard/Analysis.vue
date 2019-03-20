<template>
    <div class="page-header-index-wide">
        <a-row :gutter="24">
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="总销售额" total="￥126,560">
                    <a-tooltip title="指标说明" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <trend trend="up" term="周同比" :rate="12" style="margin-right: 16px;"></trend>
                        <trend trend="down" term="日同比" :rate="11"></trend>
                    </div>
                    <template slot="footer">日均销售额<span>￥ 234.56</span></template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="访问量" :total="8846">
                    <a-tooltip title="指标说明" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <!--<mini-area/>-->
                    </div>
                    <template slot="footer">日访问量<span> {{ '1234' }}</span></template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="支付笔数" :total="6560">
                    <a-tooltip title="指标说明" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <!--<mini-bar/>-->
                    </div>
                    <template slot="footer">转化率 <span>60%</span></template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="运营活动效果" total="78%">
                    <a-tooltip title="指标说明" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <!--<mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px"/>-->
                    </div>
                    <template slot="footer">
                        <trend trend="down" term="同周比" :rate="12" style="margin-right: 16px;"></trend>
                        <trend trend="up" term="日环比" :rate="80"></trend>
                    </template>
                </chart-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ChartCard from '@/components/chart/ChartCard'
    import Trend from '@/components/chart/Trend'

    export default {
        name: "Analysis",
        components: {ChartCard,Trend},
        data(){
            return{
                loading:false
            }
        }
    }
</script>

<style scoped>

</style>