<template>
    <div
        class="rounded-lg scale-75 transition select-none shadow  hover:bg-slate-50/60 bg-slate-50/70 hover:shadow-md p-2 w-15 ">
        <p class="font-serif text-sm mb-1">Kuolie<br> <span class="text-base"
                style="font-stretch: semi-expanded; font-size: 1.28rem;">扩列<br>文字<br>图生<br>成器</span></p>
        <hr>
        <div @click="PushAboutModal()"
            :class="`w-9 h-9 mt-2 mb-1 grid justify-items-center items-center justify-center hover:scale-110 scale-105 active:scale-100 rounded-lg mx-auto bg-${this._()}-300/60 @backup bg-${this._()}-300 transition select-none shadow-sm  scale-100 hover:scale-105 hover:shadow`">
            <Icon class="block rotate-180 -translate-y-[0.03rem]!">e783</Icon>
        </div>
    </div>
</template>
<script>
import Icon from './Icon.vue';

export default {
    name: 'NavPill',
    components: { Icon },
    inject: {
        Modal: 'Modal',
        _: '_'
    },
    methods: {
        PushAboutModal() {
            this.Modal(true, `<AboutInfoModal />`);
        }
    }
}
</script>