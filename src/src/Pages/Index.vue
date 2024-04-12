<template>
    <div id="main-area" class="min-h-screen bg-zinc-100 w-full relative transition">
        <div :class="`block bg-${this._()}-200 w-full h-screen relative transition `" id="draw-area">
            
        </div>
        <div id="palette" class="transition absolute right-1 top-1 bottom-1 left-auto p-1 rounded-lg bg-white h-full w-min">

        </div>
        <div class="transition fixed w-full bg-zinc-300 bottom-0 left-0 right-0 min-h-fit p-1" id="input-area">
            <InputPanel />
        </div>
    </div> 
</template>
<script>
import InputPanel from '@/Components/InputPanel.vue';
export default{
    name: 'Index',
    components: {InputPanel},
    inject: {_: "_"}

}
</script>