<template>
    <div class="rounded-lg scale-75 transition select-none shadow bg-opacity-70 hover:bg-opacity-60 bg-slate-50 hover:shadow-md p-2 w-15 ">
        <p class="font-serif text-sm mb-1">Kuolie<br> <span class="text-base" style="font-stretch: semi-expanded; font-size: 1.28rem;">扩列<br>文字<br>图生<br>成器</span></p>
        <hr>
        <div @click="PushAboutModal()" :class="`w-9 h-9 mt-2 mb-1 grid justify-items-center items-center justify-center hover:scale-110 scale-105 active:scale-100 rounded-lg mx-auto bg-${this._()}-300 transition select-none shadow-sm bg-opacity-60 hover:bg-opacity-50 hover:shadow`">
            <Icon class="block rotate-180" style="--tw-translate-y: -.23rem">e783</Icon>
        </div>
    </div>
</template>
<script>
import Icon from './Icon.vue';

export default{
    name: 'NavPill',
    components: {Icon}, 
    inject: {
        Modal: 'Modal',
        _: '_'
    },
    methods: {
        PushAboutModal(){
            let inner = `
                <p class="text-2xl modal-item font-semibold my-1 ">Kuolie 是一款开源、简易的扩列图文生成器.</p>
                <p class="modal-item">使用技术: Vue.js 2.7, TailwindCSS, ~</p>
                <p class="modal-item">主笔: Feiron Iguista</p>
                <p class="modal-item">开源协议: MIT, Authorized</p>
                <p class="modal-item">源代码使用: </p>
                <ul class="scale-95 modal-content">
                    <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://github.com/niklasvh/html2canvas" target="_blank">HTML2Canvas</a></li>
                    <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://github.com/randreucetti/canvas2image" target="_blank">Canvas2img</a></li>
                    <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://vuejs.org" target="_blank">Vue.js</a></li>
                    <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://tailwindcss.com" target="_blank">TailwindCSS</a></li>
                    <li class="modal-content">- <a class="opacity-90 modal-content hover:opacity-50 transition active:opacity-70 text-blue-400" href="https://min.corona.studio" target="_blank">日冕工作室最小官网 (搬了点组件来用hhh)</a></li>
                </ul>
                <br>
                <div class="flex flex-wrap ">
                    <Press class="modal-item" type="verified-link" no-link-icon="true" link="https://github.com/fr1g/Kuolie" overclass="text-lg block max-w-fit">查看Github仓库</Press>
                    <div class="grow"></div>
                    <Press class="modal-item" type="function" onclick="eval('localStorage.clear(); setTimeout(()=>{window.location.reload()}, 300)')" no-link-icon="true" overclass="text-lg block max-w-fit bg-red-500">清除缓存</Press>
                </div>
            `;
            this.Modal(true, inner);
        }
    }
}
</script>