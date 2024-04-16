<template>
    <div :class="`p-2.5 rounded-lg shadow 
                                             text-${this._()}-900 bg-${this._()}-100 `"
                :style="'z-index: ' + this.id + 10">
        <h3 :class="`text-${this._()}-700 font-semibold text-lg flex flex-wrap`">
            <div style="display: var(--id-show);" class="opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5">
                #{{ this.id }}
            </div>
            <div class="grow">
                {{ this.title }}
            </div>
        </h3>
        <div class="text-sm" v-html="this.content"></div>
    </div>
</template>

<script>

export default{
    name: 'TextBox',
    props: ['id', 'offset', 'span'],
    inject: {
        _: '_',
        __: '__',
    },
    data(){
        return {
            title: '=v=',
            content: '空哒!'
        }
    },
    mounted(){ // [] /【】
        let process = this.$slots.default[0].text;
        if(process.includes('[') || process.includes('【')){
            let startIndex1 = process.indexOf('['),
                startIndex2 = process.indexOf('【'),
                closeIndex1 = process.indexOf(']'),
                closeIndex2 = process.indexOf('】');
                
            if(startIndex1 != -1 & startIndex1 < startIndex2){
                if(closeIndex1 != -1){
                    this.title = process.slice(startIndex1 + 1, closeIndex1);
                    this.content = process.slice(closeIndex1 + 1);
                }

                else this.content = process;
            }else if(startIndex2 != -1 & startIndex1 > startIndex2){
                if(closeIndex2 != -1){
                    this.title = process.slice(startIndex2 + 1, closeIndex2);
                    this.content = process.slice(closeIndex2 + 1);
                }

                else this.content = process;
            }else this.content = process;
        }else this.content = process;
    }

}
</script>