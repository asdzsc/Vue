import Vue from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Qrcode from '../views/Qrcode.vue'


const routes = [{
        path: '/',
        redirect: 'ladderenvelope'
    },
    {
        path: '/ladderenvelope',
        name: 'Ladderenvelope',
        meta: {
            title: "阶梯红包",
        },
        component: Home
    },
    {
        path: '/couponenvelope',
        name: 'Couponenvelope',
        meta: {
            title: "优惠券红包",
        },
        component: Qrcode
    },
    {
        path: '/invite-rewards',
        name: 'InviteRewards',
        meta: {
            title: "拉人助力",
        },
        component: () =>
            import ('@/views/invite-rewards/index')
    },
    {
        path: '/invite-rewards/share',
        name: 'InviteRewardsSharePage',
        meta: {
            title: "分享",
        },
        component: () =>
            import ('@/views/invite-rewards/poster')
    },
    {
        path: '/invite-rewards/get-gift',
        name: 'InviteRewardsGetGift',
        meta: {
            title: "领取礼物",
        },
        component: () =>
            import ('@/views/invite-rewards/GetGift')
    },
    // {
    //     path: '/luckdraw/index1',
    //     name: 'luckdraw/index1',
    //     meta: {
    //         title: "转盘抽奖1",
    //     },
    //     component: () =>
    //         import ('@/views/luck-draw/index1')
    // },
    {
        path: '/luckdraw',
        name: 'luckdraw',
        meta: {
            title: "转盘抽奖",
        },
        component: () =>
            import ('@/views/luck-draw/index')
    },
    {
        path: '/luckdraw/my-price',
        name: 'luckdraw/my-price',
        meta: {
            title: "我的奖品",
        },
        component: () =>
            import ('@/views/luck-draw/myPrice')
    },
    {
        path: '/luckdraw/my-points',
        name: 'luckdraw/my-points',
        meta: {
            title: "我的积分",
        },
        component: () =>
            import ('@/views/luck-draw/myPoints')
    },
    {
        path: '/luckdraw/my-coupon',
        name: 'luckdraw/my-coupon',
        meta: {
            title: "优惠券",
        },
        component: () =>
            import ('@/views/luck-draw/myCoupon')
    },
    {
        path: '/luckdraw/my-address',
        name: 'luckdraw/my-address',
        meta: {
            title: "领取奖品",
        },
        component: () =>
            import ('@/views/luck-draw/myAddress')
    },
    {
        path: '/luckdraw/my-code',
        name: 'luckdraw/my-code',
        meta: {
            title: "领取群二维码",
        },
        component: () =>
            import ('@/views/luck-draw/code')
    },
    {
        path: '/luckdraw/my-record',
        name: 'luckdraw/my-record',
        meta: {
            title: "兑换记录",
        },
        component: () =>
            import ('@/views/luck-draw/myRecord')
    },
    {
        path: '/luckdraw/share',
        name: 'luckdraw/share',
        meta: {
            title: "分享海报",
        },
        component: () =>
            import ('@/views/luck-draw/share')
    },
]
const router = createRouter({
        history: createWebHistory('/sevaloh5'),
        routes
    })
    // const router = new VueRouter({
    //     base: '/sevaloh5', // 基础路径
    //     mode: 'history',
    //     // base: process.env.BASE_URL,
    //     routes
    // })

router.beforeEach(function(to, from, next) {
    if (to.meta.title) {
        document.title = '千里马SCRM-' + to.meta.title;
    }
    next();
});
export default router