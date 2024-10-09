<template>
    <div class="grid grid-cols-1 gap-1.5 overflow-y-hidden overflow-x-visible h-full p-1.5?">
        <div class="grid grid-cols-1 gap-1.5 p-1.5">
            <div id="supermode" @click="ConfSuperModeModal"  :class="`w-6 h-6 transition hover:scale-110 scale-105 z-20 active:scale-100 box-border overflow-hidden
            rounded-lg opacity-70 hover:opacity-90 active:opacity-100 shadow-sm border border-opacity-50 relative bg-gray-300
            `">
                <Icon :figure-x="true" :figure="0.05" class="scale-95">e790</Icon>
            </div>
        </div>
        <!-- 要求能够在超级扩展模式下处理三个颜色: 保存在localStorage: 三个颜色代码, 如果包含-则视作原装的 -->
        <div class="grid grid-cols-1 gap-1.5 h-full overflow-y-auto overflow-x-hidden rounded-lg p-1.5">
            <div v-for="color of this.colors" :key="color" :title="color.replaceAll(/-\d{3}/g, '')" @click="C(color)" :id="`COLORBTN:${color.toLowerCase()}`"
            :class="`w-6 h-6 z-20 transition hover:scale-110 scale-105 active:scale-100 box-border overflow-hidden
            rounded-lg opacity-70 hover:opacity-90 active:opacity-100 shadow-sm border border-opacity-50 relative
            bg-${processMixColor(color.toLowerCase(), 0)}-500 `">
                <div :class="`w-8 h-2/3 absolute -top-0.5 left-0 right-0 rotate-45 box-border 
                bg-${color.includes('&') ? `${processMixColor(color.toLowerCase(), 1)}  shadow-sm` : 'transparent'}`"></div>
            </div> 
            <div class="h-6 opacity-0 block " v-for="i in 12" :key="i"></div> 
        </div>
    </div>
</template> 
<script>
import Icon from './Icon.vue';

export default{
    name: 'ColorChoose',
    components: {Icon},
    mounted(){

    },
    inject: {_: "_", __: "__", processMixColor: "___", Modal: "Modal"},
    methods: {
        C: function(x){
            this.__(x);
        },
        ConfSuperModeModal: function(){
            this.Modal(this.plusModal);
        }

    },
    data(){
        return{
            plusModal: '<ColorSuperModeModal />',
            actual: '',
            colors: [
                'Black&White',
                'White&Black',
                'Stone',
                'Red',
                'Orange',
                'Amber',
                'Yellow',
                'Lime',
                'Green',
                'Emerald',
                'Teal',
                'Cyan',
                'Sky',
                'Blue',
                'Indigo',
                'Violet',
                'Purple',
                'Fuchsia',
                'Pink',
                'Rose',
                'Slate',
                'Gray',
                'Zinc',
                'Neutral',

            ],
        }
    }
}

</script>