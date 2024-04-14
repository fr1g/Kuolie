<template>
    <div class="grid grid-cols-1 gap-1 ">
        <div v-for="color of this.colors" :key="color" :title="color" @click="C(color)" :id="`COLORBTN:${color.toLowerCase()}`"
         :class="`w-6 h-6 transition rounded-lg opacity-70 hover:opacity-90 active:opacity-100 shadow bg-${color.toLowerCase()}-500 `">

        </div>

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