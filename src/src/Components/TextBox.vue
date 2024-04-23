<template>
    <div :id="`TEXTBOX::${this.id}`" :class="`p-2.5 rounded-lg shadow  col-span-${this.span ?? '1'}  ${(this.fill ?? 'false') == 'true' ? 'h-full' : 'h-fit'}       transition-all
                                             text-${this._()}-900 bg-${this._()}-100 `"
                :style="'z-index: ' + this.id + 10">
        <h3 :class="`text-${this._()}-700 font-semibold text-lg flex flex-wrap`">
            <div style="display: var(--id-show);" class="opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5">
                #{{ this.id }}
            </div>
            <div class="grow" v-html="this.title">
            </div>
        </h3>
        <div class="text-sm" v-html="this.content" ref="contented"></div>
    </div>
</template>

<script>

export default{
    name: 'TextBox',
    props: ['id', 'offset', 'span', 'inside', 'fill', 'x'],
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
        this.$nextTick(() => {
            this.Renew();
        });
    },
    beforeUpdate(){
        this.Renew();
    },
    methods: {
        Renew(){
            if (this.inside == null){
                console.log('null inside');
                return;
            }
            let process = this.inside;
            if(process == undefined) return;
            if(process.includes('[') || process.includes('【')){
                let startIndex1 = process.indexOf('['),
                    startIndex2 = process.indexOf('【'),
                    closeIndex1 = process.indexOf(']'),
                    closeIndex2 = process.indexOf('】');

                if(startIndex1 != -1 & (startIndex2 == -1 ? (true) : (startIndex1 < startIndex2))){
                    if(closeIndex1 != -1){
                        this.title = process.slice(startIndex1 + 1, closeIndex1);
                        this.content = process.slice(closeIndex1 + 1);
                    }

                    else this.Clear(true, process);
                }else if(startIndex2 != -1 & (startIndex1 == -1 ? true : (startIndex1 > startIndex2))){
                    if(closeIndex2 != -1){
                        this.title = process.slice(startIndex2 + 1, closeIndex2);
                        this.content = process.slice(closeIndex2 + 1);
                    }

                    else this.Clear(true, process);
                }else this.Clear(true, process);
            }else this.Clear(true, process);
            this.$forceUpdate();
        },
        Clear(onlyTitle = false, process = ''){
            this.title = '=v=';
            if (!onlyTitle) this.content = '空哒!';
            else this.content = process;
        }
    },
    watch: {
        content(after, before){
            console.log(`b: ${before}, a: ${after}`);
            this.Renew();
        },
        x(){
            this.Renew();
        }
    },

}
</script>