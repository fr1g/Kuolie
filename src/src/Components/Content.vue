<template>
    <div class=" w-full p-5 grid justify-items-center">
        <div :class="`  bg-${this._()}-200 text-${this._()}-800
                    rounded-lg shadow-md transition w-5/6 p-5 hover:shadow-lg`">
            <h1 class=" mb-2.5">
                <input type="text" :class="'w-full p-1 inline-block overflow-x-visible text-3xl border-0 outline-1 bg-transparent '" placeholder="点击输入标题文本..." />
            </h1>
            <div ref="texts" :style="`--id-show: ${this.showId ? 'block' : 'hidden'};`" class="grid grid-cols-12 gap-1.5">
                <TextBox v-for="s of this.TextBoxes" :key="s.id" :id="s.id" :offset="s.offset" :span="s.span" >{{ s.content }}</TextBox>
            </div>
        </div>
    </div>
</template>
<script>
import TextBox from './TextBox.vue';

export default{
    name: 'Content',
    inject: {_: "_", __: "__"},
    components: {
        TextBox,
    },
    mounted(){
        setTimeout(() => {
            this.showId = false;
        }, 50000);
    },
    provide(){
        return{
            Add: this.Create,
            Del: this.Remove,
            Upd: this.Modify
        }
    },
    data(){
        return {
            TextBoxes: [
            {
                    id: 0,
                    content: '[测试]带标题的, 并且[第二个方括号]不会影响判断第一个',
                    span: 1,
                    offset: 0
                },                
                {
                    id: 1,
                    content: '[测试【混合1】]带标题的, 并且[第二个方括号]不会影响判断第一个',
                    span: 1,
                    offset: 0
                },                {
                    id: 2,
                    content: '【混合[测试2]】带标题的, 并且[第二个方括号]不会影响判断第一个',
                    span: 1,
                    offset: 0
                },
            ],
            showId: true,

        }
    },
    methods: {
        Create(){
            console.log('Creation needs no ID');
            
        },
        Remove(id = 'default'){
            console.log(`Remove requires ID: ${id}`);
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }

        },
        Modify(id = 'default'){
            console.log(`Modify requires ID: ${id}`);
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }

        },
    }
}
</script>