<template>
    <div id="main-area" :class="`min-h-screen bg-zinc-50 dark:bg-zinc-900 w-full relative transition  ${this.modal ? ' pointer-events-none' : ''}`" :style="`--opa: ${this.opa / 100}; `">
        <div class="grid sm:hidden justify-items-center justify-center items-center h-screen">
            <div class="text-lg px-8 text-zinc-900 dark:text-zinc-100">
                <p :class="`text-3xl font-semibold text-${this._(1)}-800 dark:text-${this._(1)}-100 mb-3 pb-1 border-b w-5/6`">窗口太小啦!</p>
                <p>用的是手机吗? 或许<b class=" font-semibold">横屏</b>查看就可以了哦! <br><span class="text-base -translate-y-1.5 font-light opacity-90 inline-block italic">不然就用平板或者电脑吧...</span></p>
                <p>用的就是电脑? 把浏览器窗口改为<b class=" font-semibold">最大化</b>吧!</p>
                <p>再不然我也没办法了xwx</p>
            </div> 
            <div class="bottom-0 left-1 right-1 fixed mb-1" >
                <p v-if="(!ua.includes('hrome') && ua.includes('afari'))" class="text-center text-zinc-900 dark:text-zinc-100 text-sm scale-90 mb-0.5 opacity-75">建议不要用Safari浏览器！实际上<br>iOS上所有浏览器实质上都是Safari</p>
                <p class="text-center opacity-70 animate-pulse text-zinc-900 dark:text-zinc-100"><b class="font-bold">Kuolie</b> by Feiron Iguista <Icon class="text-rose-300 inline-block " figure="0">eb52</Icon></p>
            </div>
        </div>
        <div class="hidden sm:block">
            <div id="navpill" class="fixed top-1.5 left-1.5 z-20" :style="`opacity: ${this.opa / 100};`">
                <NavPill />
            </div>
            <div :class="`block bg-${this._()}-50 bg-opacity-50 w-full min-h-screen m-auto relative transition pb-72 `" id="draw-area" :style="`opacity: ${this.modal ? this.opa / 100 : '1'}; --tw-bg-opacity: ${this.groundOpacityPreference / 100}`">
                <Content ref="c" />
            </div>
            <div id="palette" :style="`opacity: ${this.opa / 100};`" class="transition fixed right-1.5 top-1.5 bottom-1.5 left-auto p-1.5 shadow rounded-lg bg-neutral-100 dark:bg-neutral-700 h-full max-h-screen overflow-x-hidden overflow-y-auto">
                <ColorChoose />
            </div>
            <div :style="`opacity: ${this.opa / 100}; z-index: 998`" class="transition fixed w-full bg-zinc-200 dark:bg-zinc-800 bottom-0 left-0 right-0 min-h-fit shadow-lg drop-shadow-lg" 
                id="input-area" >
                <InputPanel ref="input" />
            </div>
            <div ref="modal" id="modal"  :style="`opacity: ${(1 - (this.opa / 100)) * 2}; z-index: 999; `"
                :class="`${this.modal ? 'fixed' : 'hidden'} bg-${this._()}-100 top-10 override scale-90 bottom-10 left-1 right-1 m-auto p-5 rounded-lg shadow-lg transition h-fit w-2/3`">
                <div class="absolute top-1 right-0">
                    <Press is-for-modal-close="true" init-opacity="0" overclass="shadow-0" class="scale-75 inline-block" style="box-shadow: none;" @click.native="_ => {_}"> 
                        <Icon>e711</Icon>
                    </Press>
                </div>
                <ModalBase ref="modal-render" :class="`mt-3 text-${this._(1)}-800 ?dark:text-${this._(1)}-100`" id="modal-render" :assembly="this.modalContent" 
                :key="this.modalContent.includes(`no-flush`) ? 0 : Math.random()">

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
import HelpTipsModal from '../Components/Views/HelpTipsModal.vue';


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
                        ConfigurationModal, ConfirmDeletionModal, AboutInfoModal, FirstTryInfoModal, HelpTipsModal
                    },
                });
                return h(com, {});
            },
            mounted(){
                this.ua = window.navigator.userAgent;
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            },

        },
     },
    inject: {_: "_", __: "__", ___: "___"},
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

        if(localStorage.ground)
            this.groundOpacityPreference = parseInt(localStorage.ground);
    },
    data(){
        return {
            ua: _ua,
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
            groundOpacityPreference: 50,

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
            console.log(window.getComputedStyle(document.getElementById('CORAL')).width)
            console.log(window.getComputedStyle(document.getElementById('ROUND')).width)
            if(localStorage.firstTry == 'true'){
                localStorage.firstTry = false;
                this.SwitchModal();
            }
            setTimeout(() => {
                PushToast('即将截取, <br>成功后将触发下载喔', `bg-${this._()}-300`);
                this.Opacity(0);
                TitleSwitch(true);
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
                        
                        AHANDLER.setAttribute('download', `Kuolie-Generated_${document.getElementById('OUTPUT').innerHTML}_${(new Date()).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}.png`.replaceAll('\\', '').replaceAll('/', '-').replaceAll(' ', '').replaceAll(',', '_'));
                        AHANDLER.setAttribute('href', canvas.toDataURL('png'));
                        TitleSwitch(false);
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
            this.$refs.input.chkNull();
        },   
        Upd(...args){ 
            let aa = this.$refs.c.Modify(...args); 
            this.$forceUpdate(); 
            this.$refs.c.$forceUpdate(); 
            return aa;
        },
        Move(item, to){
            return this.$refs.c.MoveTo(item, to);
        },
        Focus(item){
            // console.log(JSON.stringify(item))
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

            this.$forceUpdate();
        },
        ___x(x, y = 0, z = false){
            return this.___(x, y, z);
        },
        ChangeGroundOpacity(x){
            this.groundOpacityPreference = parseInt(x ?? 50) ?? 50;
            localStorage.ground = this.groundOpacityPreference;
        },
        ChangeMasonryMode(bol){

        },
        StateHasChanged(){
            this.$forceUpdate();
        }
    },
    provide(){ 
        return {
            Add: this.Add,
            Del: this.Del,
            RealDel: this.RealDel,
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
            ___: this.___x,
            Ground: this.ChangeGroundOpacity,
            StateHasChanged: this.StateHasChanged

        }
    },

}
</script>
<style scoped>
.hidden-x{
    display: none !important;
}
.override{
    pointer-events: painted !important;
}
</style>