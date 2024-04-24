<template>
    <div class="grid grid-cols-1 gap-1.5 ">
        <div v-for="color of this.colors" :key="color" :title="color" @click="C(color)" :id="`COLORBTN:${color.toLowerCase()}`"
         :class="`w-6 h-6 transition hover:scale-110 scale-105 active:scale-100 rounded-lg opacity-70 hover:opacity-90 active:opacity-100 shadow bg-${color.toLowerCase()}-500 `">

        </div>
        <div class="h-6 opacity-0 block md:hidden" v-for="i in 8" :key="i"></div>
    </div>
</template>
<script>

export default{
    name: 'ColorChoose',
    inject: {_: "_", __: "__"},
    methods: {
        C: function(x){
            this.__(x);
        }
    },
    data(){
        return{
            colors: [
                'Slate',
                'Gray',
                'Zinc',
                'Neutral',
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
            ],
        }
    }
}

</script>