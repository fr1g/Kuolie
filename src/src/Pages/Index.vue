<template>
    <div id="main-area" class="min-h-screen bg-zinc-50 w-full relative transition">
        <div id="navpill" class="fixed top-1.5 left-1.5 z-20" :style="`opacity: ${this.opa / 100};`">
            <NavPill />
        </div>
        <div :class="`block bg-${this._()}-50 bg-opacity-50 w-full h-screen relative transition `" id="draw-area" :style="`opacity: ${this.opa / 100};`">
            <Content ref="c" />
        </div>
        <div id="palette" :style="`opacity: ${this.opa / 100};`" class="transition absolute right-1.5 top-1.5 bottom-1.5 left-auto p-1.5 shadow rounded-lg bg-white h-full">
            <ColorChoose />
        </div>
        <div :style="`opacity: ${this.opa / 100};`" class="transition fixed w-full bg-zinc-200 bottom-0 left-0 right-0 min-h-fit shadow-lg drop-shadow-lg" 
             id="input-area">
            <InputPanel />
        </div>
        <div ref="modal" id="modal"  :style="`opacity: ${(1 - (this.opa / 100)) * 2};`"
            :class="`${this.modal ? 'fixed' : 'hidden'} bg-${this._()}-100 top-10 scale-90 bottom-10 left-1 right-1 m-auto p-5 rounded-lg shadow-lg transition z-30 h-fit w-2/3`">
            <div class="absolute top-1 right-0">
                <Press init-opacity="0" overclass="shadow-0" class="scale-75 inline-block" style="box-shadow: none;" @click.native="_ => {_}"> 
                    <Icon>e711</Icon>
                </Press>
            </div>
            <ModalBase ref="modal-render" class="mt-3" id="modal-render" :assembly="this.modalContent">

            </ModalBase>
        </div>
    </div> 
</template>
<script>
import InputPanel from '@/Components/InputPanel.vue';
import ColorChoose from '../Components/ColorChoose.vue';
import Content from '../Components/Content.vue';
import NavPill from '@/Components/NavPill.vue';
import Press from '../Components/Press.vue';
import Icon from '../Components/Icon.vue';
// import { h } from 'vue';
import Vue from 'vue';

export default{
    name: 'Index',
    components: { 
        InputPanel, ColorChoose, Content, NavPill, Press, Icon,

        ModalBase: {
            props: { assembly: String },
            components: { Press, Icon },
            // render(h){
            //     return () => {
            //         try{
            //             return (Vue.compile(`<template><div class="injected">${this.assembly}</div></template>`)).render;
            //         }catch(ex){
            //             eval(` console.groupCollapsed('error rendering'); console.log(${ex}); console.groupEnd();`);
            //         }
            //     };
            // },
            render(h) {
                const com = Vue.extend({
                    name: 'ModalAgent',
                    template: `<div class="modal-content select-none text-lg">${this.assembly}</div>`,
                    components: {Icon, Press}
                });
                // console.log(this.assembly);
                return h(com, {});
            },
            mounted(){
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            }

        },
     },
    inject: {_: "_", __: "__"},
    mounted(){
        eval(`document.title = '扩列文字图生成器 - Kuolie';`);
        console.log(localStorage.getItem('color'));
        if(localStorage.getItem('color')){
            document.getElementById(`COLORBTN:${localStorage.getItem('color')}`).click()
        }else this.__();

        document.getElementById('VALUEPASS').addEventListener('change', (e) => {console.log(e)})
        window.addEventListener('click', (e) => {
            if(this.modal) if(!(`${e.target.id}`.includes('modal')) && !(`${e.target.classList}`.includes('modal'))) this.SwitchModal();
        }, true);
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
            opa: 100,
            modalContent: '',
            interval: null,

        }
    },
    methods: {
        ValueChange(val){

        },
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
        },
        SwitchModal(status = false, content = ''){
            let target = this.opa, to;
            if(status){
                if(this.modal) return;
                to = 50;
                this.interval = setInterval(() => {
                    // console.log(0)
                    if(this.opa < to) {
                        this.modal = true;
                        this.modalContent = content;
                        clearInterval(this.interval);
                    }
                    this.opa -= 3;
                }, 3);
            }else{
                if(!this.modal) return;
                to = 100;
                this.interval = setInterval(() => {
                    if(this.opa > to) {
                        this.modal = false;
                        clearInterval(this.interval);
                    }
                    this.opa += 3;
                }, 3);
            }
        },
        Opacity(to){
        }
    },
    provide(){ 
        return {
            Add: this.Add,
            Del: this.Del,
            Upd: this.Upd,
            S: this.Show,
            H: this.Hide,
            Modal: this.SwitchModal,
        }
    },

}
</script>
<style scoped>
.hidden{
    display: none !important;
}
</style>