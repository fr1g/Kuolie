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
            <div :class="`block bg-${this._()}-50 bg-opacity-50 w-full min-h-screen m-auto relative transition pb-72 `" id="draw-area" :style="`opacity: ${this.modal ? this.opa / 100 : '1'};`">
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
                <ModalBase ref="modal-render" class="mt-3" id="modal-render" :assembly="this.modalContent" :key="Math.random()">

                </ModalBase>
            </div>
        </div>
    </div> 
</template>
<script>
import Vue from 'vue';
import html2canvas from 'html2canvas'

import InputPanel from '@/Components/InputPanel.vue';
import ColorChoose from '../Components/ColorChoose.vue';
import Content from '../Components/Content.vue';
import NavPill from '@/Components/NavPill.vue';
import Press from '../Components/Press.vue';
import Icon from '../Components/Icon.vue';

import ConfigurationModal from '../Components/Views/ConfigurationModal.vue';
import ConfirmDeletionModal from '../Components/Views/ConfirmDeletionModal.vue';
import AboutInfoModal from '../Components/Views/AboutInfoModal.vue';
import FirstTryInfoModal from '../Components/Views/FirstTryInfoModal.vue';

export default{
    name: 'Index',
    components: { 
        InputPanel, ColorChoose, Content, NavPill, Press, Icon,

        ModalBase: {
            // thanks to: 
            // - Chobits' answer at: https://segmentfault.com/q/1010000015734369/a-1020000015737231
            // - tptech & bhenderson's answer at: https://github.com/vitejs/vite/discussions/4158#discussioncomment-1282397
            // - sjpqy's simplified solution at: https://www.cnblogs.com/shenjp/p/10670787.html
            // these helped this modal got constructed, but never will I prefer to try to make this modal again.
            props: { assembly: String },
            render(h) {
                const com = Vue.extend({
                    name: 'ModalAgent',
                    template: `<div class="modal-content select-none text-lg">${this.assembly}</div>`,
                    components: {
                        Icon, Press, 
                        ConfigurationModal, ConfirmDeletionModal, AboutInfoModal, FirstTryInfoModal
                    },
                });
                return h(com, {});
            },
            mounted(){
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            },

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

        if(localStorage.firstTry == undefined) localStorage.firstTry = true;
        this.firstTry = localStorage.firstTry; 
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
            firstTry: 'false',

        }
    },
    methods: {
        Generate(){
            console.log('invoked generation');
            // 可以在第一次使用的时候弹窗提示流程 'CORAL' / 'ROUND'
            if(localStorage.firstTry == 'false') this.GenerateStep();
            else this.SwitchModal(true, '<FirstTryInfoModal />'); // set firsttry to false 
        },
        GenerateStep(){
            if(localStorage.firstTry == 'true'){
                localStorage.firstTry = false;
                this.SwitchModal();
            }
            setTimeout(() => {
                PushToast('即将截取, <br>成功后将触发下载喔', `bg-${this._()}-300`);
                this.Opacity(0);
                setTimeout(() => {
                    html2canvas(document.getElementById('ROUND').parentElement, 
                    {
                        backgroundColor: null, // can get localstorage rgb as string via settings preference.
                        useCORS: true,
                        allowTaint: true,
                        height: document.getElementById('ROUND').offsetHeight,
                        width: document.getElementById('CORAL').offsetWidth + 80,
                        x: document.getElementById('CORAL').offsetLeft - 40,
                        removeContainer: true,
                        scale: window.devicePixelRatio   ,
                        imageTimeout: 0,
                        

                        onclone: () => {},
                    }).then((canvas) => {
                        
                        AHANDLER.setAttribute('download', `Kuolie-Generated_${(new Date()).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).replaceAll('/', '-').replaceAll(' ', '').replaceAll(',', '_')}.png`);
                        AHANDLER.setAttribute('href', canvas.toDataURL('png'));

                        AHANDLER.click();
            
                        setTimeout(() => {
                            this.Opacity(100);
                            if(window.location.href.includes('localhost') & localStorage.debug == 'true') {
                                document.body.appendChild(canvas); 
                                let spanner = document.createElement('div');
                                spanner.classList.add('h-64');
                                document.body.appendChild(spanner); 
                            }//
                        }, 123);
                    });
                }, 1230);
            }, 567);
            
        },
        Config(i, o = null){ return this.$refs.c.Configure(i, o); },
        Add(x){ this.$refs.c.Create(x) },
        Get(item){ return this.$refs.c.GetPosition(item); },
        Seek(index){return this.$refs.c.GetByIndex(index);},
        Del(x, o){ 
            this.SwitchModal(true, `<ConfirmDeletionModal target="${x.replaceAll('"', '“')}" origin="${o.replaceAll('"', '“')}" />`);
        },
        RealDel(id){
            this.$refs.c.Remove(id);
            this.SwitchModal();
        },
        Upd(place, x){ 
            this.$refs.c.Modify(place, x); 
            this.$forceUpdate(); 
            this.$refs.c.$forceUpdate(); 
        },
        Move(item, to){
            return this.$refs.c.MoveTo(item, to);
        },
        Focus(item){
            console.log(JSON.stringify(item))
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
            if(status){
                if(this.modal) return;
                this.Opacity(50, true, content);
            }else{
                if(!this.modal) return;
                this.Opacity(100, false, content);
            }
        },
        Opacity(to, modal = null, content = ''){ // this is really a mess...
            if(this.opa > to){
                // decrease
                this.interval = setInterval(() => {
                    if(this.opa < to) {
                        if(modal != null){
                            this.modal = modal;
                            this.modalContent = content;
                        }
                        clearInterval(this.interval);
                    }
                    this.opa -= 3;
                }, 3);
            }
            else{
                this.interval = setInterval(() => {
                    if(this.opa > to) {
                        if(modal != null) this.modal = modal;
                        clearInterval(this.interval);
                    }
                    this.opa += 3;
                }, 3);
            }
        }
    },
    provide(){ 
        return {
            Add: this.Add,
            Del: this.Del,
            Upd: this.Upd,
            Get: this.Get,
            S: this.Show,
            Seek: this.Seek,
            H: this.Hide,
            M: this.Move,
            Focus: this.Focus,
            RD: this.RealDel,
            Modal: this.SwitchModal,
            Config: this.Config,
            Generate: this.Generate,
            GenerateStep: this.GenerateStep,

        }
    },

}
</script>
<style scoped>
.hidden-x{
    display: none !important;
}
</style>