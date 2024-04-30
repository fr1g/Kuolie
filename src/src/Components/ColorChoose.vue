<template>
    <div class="grid grid-cols-1 gap-1.5 ">
        <div v-for="color of this.colors" :key="color" :title="color" @click="C(color)" :id="`COLORBTN:${color.toLowerCase()}`"
         :class="`w-6 h-6 transition hover:scale-110 scale-105 active:scale-100 box-border overflow-hidden
         rounded-lg opacity-70 hover:opacity-90 active:opacity-100 shadow border border-opacity-50 relative
         bg-${processMixColor(color.toLowerCase(), 0)}-500 `">
            <div :class="`w-8 h-2/3 absolute -top-0.5 left-0 right-0 rotate-45 box-border shadow-sm 
            bg-${color.includes('&') ? processMixColor(color.toLowerCase(), 1) : 'transparent'}`"></div>
        </div>
        <div class="h-6 opacity-0 block md:hidden" v-for="i in 8" :key="i"></div>
    </div>
</template>
<script>

export default{
    name: 'ColorChoose',
    inject: {_: "_", __: "__", processMixColor: "___"},
    methods: {
        C: function(x){
            this.__(x);
        },

    },
    data(){
        return{
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