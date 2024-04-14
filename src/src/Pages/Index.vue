<template>
    <div id="main-area" class="min-h-screen bg-zinc-100 w-full relative transition" style="opacity: 1;">
        <div id="navpill" class="fixed top-1.5 left-1.5 z-20">
            <NavPill />
        </div>
        <div :class="`block bg-${this._()}-50 w-full h-screen relative transition `" id="draw-area">
            <Content ref="c" />
        </div>
        <div id="palette" class="transition absolute right-1.5 top-1.5 bottom-1.5 left-auto p-1.5 shadow rounded-lg bg-white h-full">
            <ColorChoose />
        </div>
        <div class="transition fixed w-full bg-zinc-200 bottom-0 left-0 right-0 min-h-fit shadow-lg drop-shadow-lg" 
             id="input-area">
            <InputPanel />
        </div>
    </div> 
</template>
<script>
import InputPanel from '@/Components/InputPanel.vue';
import ColorChoose from '../Components/ColorChoose.vue';
import Content from '../Components/Content.vue';
import NavPill from '@/Components/NavPill.vue';

export default{
    name: 'Index',
    components: { InputPanel, ColorChoose, Content, NavPill },
    inject: {_: "_", __: "__"},
    mounted(){
        eval(`document.title = '扩列文字图生成器 - Kuolie';`);
        console.log(localStorage.getItem('color'));
        if(localStorage.getItem('color')){
            document.getElementById(`COLORBTN:${localStorage.getItem('color')}`).click()
        }else this.__();
    },
    data(){
        return {
            hidden: false,
            idNeedHide: [
                'navpill',
                'palette',
                'input-area',
            ],
            modal: false,
        }
    },
    methods: {
        Add( ){ this.$refs.c.Create( ) },
        Del(x){ this.$refs.c.Remove(x) },
        Upd(x){ this.$refs.c.Modify(x) },
        Hide(){
            if(this.hidden) return;
            for(let i of this.idNeedHide){
                i.classList.add('hidden');
            }
        },
        Show(){
            if(!this.hidden) return;
            for(let i of this.idNeedHide){
                i.classList.remove('hidden');
            }
        }
    },
    provide(){ 
        return {
            Add: this.Add,
            Del: this.Del,
            Upd: this.Upd,
            S: this.Show,
            H: this.Hide,

        }
    },

}
</script>
<style scoped>
.hidden{
    display: none !important;
}
</style>