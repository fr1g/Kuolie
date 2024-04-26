<template>
    <div class="relative modal-content">
        <p class="text-2xl modal-item font-semibold my-1 ">Kuolie 是一款开源、简易的扩列图文生成器.</p>
        <p class="modal-item">使用技术: Vue.js 2.7, TailwindCSS, ~</p>
        <p class="modal-item">主笔: Feiron Iguista</p>
        <p class="modal-item">开源协议: MIT, Authorized</p>
        <p class="modal-item">源代码使用: </p>
        <ul class="scale-95 modal-content">
            <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://github.com/niklasvh/html2canvas" target="_blank">HTML2Canvas</a></li>
            <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://vuejs.org" target="_blank">Vue.js</a></li>
            <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://tailwindcss.com" target="_blank">TailwindCSS</a></li>
            <li class="modal-xxx mt-3 opacity-80 italic">还有...</li>
            <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://min.corona.studio" target="_blank">日冕工作室最小官网 (搬了点组件来用hhh)</a></li>
        </ul>
        <details class="modalx scale-90 w-full ">
            <summary class="modalx scale-105 animate-pulse">致谢</summary>
            <div class="modalx">
                <ul class="modalx">
                     <li class="modalx"> - <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://segmentfault.com/q/1010000015734369/a-1020000015737231" target="_blank">Chobits' answer</a> </li>
                     <li class="modalx"> - <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://github.com/vitejs/vite/discussions/4158#discussioncomment-1282397 " target="_blank">tptech & bhenderson's answer</a> </li>
                     <li class="modalx"> - <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://www.cnblogs.com/shenjp/p/10670787.html" target="_blank">sjpqy's simplified solution</a> </li>
                </ul>
            </div>
        </details>
        <br>
        <div class="flex flex-wrap ">
            <Press class="modal-item" type="verified-link" no-link-icon="true" link="https://github.com/fr1g/Kuolie" overclass="text-lg block max-w-fit">查看Github仓库</Press>
            <div class="grow"></div>
            <Press id="CLEARDATABUTTON" type="function" init-opacity="90" :disable="hasClickedOnce == null ? 'true' : 'false'" @click.native="handler" no-link-icon="true" :overclass="`text-lg block max-w-fit modal-xxx  ${this.hasClickedOnce ? 'bg-red-500' : 'bg-red-300'}`" >{{ this.hasClickedOnce ? '再次点击确认' : '清除缓存'}}</Press>
        </div>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
import Press from '../Press.vue';

export default{
    name: 'AboutInfoModal',
    components: { Icon, Press },
    mounted(){
        this.hasClickedOnce = false;
    },
    data(){
        return {
            hasClickedOnce: false,
        };
    },
    methods: {
        handler(){
            if(this.hasClickedOnce) {
                document.getElementById('CLEARDATABUTTON').innerHTML = '正在清除...';
                this.hasClickedOnce = null;
                setTimeout(() => {
                    Clear();
                }, 321);
            }
            else this.hasClickedOnce = true;
        },
        cancel(){
            this.hasClickedOnce = false;
        }
    },
    provide(){
        return {
            cancel: this.cancel
        }
    }
}


</script>