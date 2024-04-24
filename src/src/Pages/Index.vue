<template>
    <div id="main-area" class="min-h-screen bg-zinc-50 w-full relative transition" :style="`--opa: ${this.opa / 100}`">
        <div class="grid sm:hidden justify-items-center justify-center items-center h-screen">
            <div class="text-lg px-8">
                <p :class="`text-3xl font-semibold text-${this._()}-800 mb-3 pb-1 border-b w-5/6`">窗口太小啦!</p>
                <p>用的是手机吗? 或许<b class=" font-semibold">横屏</b>查看就可以了哦! <br><span class="text-base -translate-y-1.5 font-light opacity-90 inline-block italic">不然就用平板或者电脑吧...</span></p>
                <p>用的就是电脑? 把浏览器窗口改为<b class=" font-semibold">最大化</b>吧!</p>
                <p>再不然我也没办法了xwx</p>
            </div>
            <div class="bottom-0 left-1 right-1 fixed mb-1" >
                <p class="text-center opacity-70 animate-pulse"><b class="font-bold">Kuolie</b> by Feiron Iguista <Icon class="text-rose-300 inline-block " figure="0">eb52</Icon></p>
            </div>
        </div>
        <div class="hidden sm:block">
            <div id="navpill" class="fixed top-1.5 left-1.5 z-20" :style="`opacity: ${this.opa / 100};`">
                <NavPill />
            </div>
            <div :class="`block bg-${this._()}-50 bg-opacity-50 w-full min-h-screen relative transition pb-72 `" id="draw-area" :style="`opacity: ${this.opa / 100};`">
                <Content ref="c" />
            </div>
            <div id="palette" :style="`opacity: ${this.opa / 100};`" class="transition fixed right-1.5 top-1.5 bottom-1.5 left-auto p-1.5 shadow rounded-lg bg-white h-full max-h-screen overflow-x-hidden overflow-y-auto">
                <ColorChoose />
            </div>
            <div :style="`opacity: ${this.opa / 100}; z-index: 998`" class="transition fixed w-full bg-zinc-200 bottom-0 left-0 right-0 min-h-fit shadow-lg drop-shadow-lg" 
                id="input-area" >
                <InputPanel ref="input" />
            </div>
            <div ref="modal" id="modal"  :style="`opacity: ${(1 - (this.opa / 100)) * 2}; z-index: 999;`"
                :class="`${this.modal ? 'fixed' : 'hidden'} bg-${this._()}-100 top-10 scale-90 bottom-10 left-1 right-1 m-auto p-5 rounded-lg shadow-lg transition h-fit w-2/3`">
                <div class="absolute top-1 right-0">
                    <Press is-for-modal-close="true" init-opacity="0" overclass="shadow-0" class="scale-75 inline-block" style="box-shadow: none;" @click.native="_ => {_}"> 
                        <Icon>e711</Icon>
                    </Press>
                </div>
                <ModalBase ref="modal-render" class="mt-3" id="modal-render" :assembly="this.modalContent">

                </ModalBase>
            </div>
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
import Vue from 'vue';

import ConfigurationModal from '../Components/Views/ConfigurationModal.vue';
import ConfirmDeletionModal from '../Components/Views/ConfirmDeletionModal.vue';

export default{
    name: 'Index',
    components: { 
        InputPanel, ColorChoose, Content, NavPill, Press, Icon,

        ConfigurationModal, ConfirmDeletionModal,

        ModalBase: {
            props: { assembly: String },
            components: { 
                Press, Icon, 
                ConfigurationModal, ConfirmDeletionModal, 
            },
            render(h) {
                const com = Vue.extend({
                    name: 'ModalAgent',
                    template: `<div class="modal-content select-none text-lg">${this.assembly}</div>`,
                    components: {
                        Icon, Press, 
                        ConfigurationModal, ConfirmDeletionModal, 
                    }
                });
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
        if(localStorage.getItem('color')){
            document.getElementById(`COLORBTN:${localStorage.getItem('color')}`).click()
        }else this.__();

        document.getElementById('VALUEPASS').addEventListener('change', (e) => { 

         });
        window.addEventListener('click', (e) => {
            if(this.modal) if(!(`${e.target.id}`.includes('modal')) && !(`${e.target.classList}`.includes('modal')) && !(`${e.target.parentElement.classList}`.includes('modal'))) this.SwitchModal();
        }, true);
    },
    data(){
        return {
            Components: {},
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
        Config(i, o = null){ return this.$refs.c.Configure(i, o); },
        Add(x){ this.$refs.c.Create(x) },
        Del(x){ 
            this.SwitchModal(true, `<ConfirmDeletionModal target="${x}" />`);
            // this.$refs.c.Remove(x);
        },
        RealDel(id){
            this.$refs.c.Remove(id);
        },
        Upd(x){ this.$refs.c.Modify(x); this.$forceUpdate(); this.$refs.c.$forceUpdate(); },
        Focus(item){
            this.$refs.input.changeEditing(item);
        },
        Hide(){
            if(this.hidden) return;
            for(let i of this.idNeedHide){
                i.classList.add('hidden-x');
            }
        },
        Show(){
            if(!this.hidden) return;
            for(let i of this.idNeedHide){
                i.classList.remove('hidden-x');
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
            Focus: this.Focus,
            RD: this.RealDel,
            Modal: this.SwitchModal,
            Config: this.Config
        }
    },

}
</script>
<style scoped>
.hidden-x{
    display: none !important;
}
</style>