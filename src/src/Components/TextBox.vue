<template>
    <div :id="`TEXTBOX::${this.id}`" @click="Focus(Seek(id))"
        :class="`   basicLooking? p-2.5 rounded-lg shadow transition-all
                    advancedLooking? col-span-${this.span ?? '1'}  ${this.fill ? 'h-full' : 'h-fit'} text-${this._()}-900 bg-${this._()}-100 
                    forExtraFunctions? ${this.isPlaceHolder ? 'grow col-span-auto justify-items-center justify-center items-center  grid' : ''}
                `"
                :style="`z-index: ${this.id + 10}; ${this.isPlaceHolder ? 'opacity: var(--opa);' : ''}`">
        <div :class="`${this.isPlaceHolder ? 'hidden' : ''}`">
            <h3 :class="`text-${this._()}-700 font-semibold text-lg flex flex-wrap break-words`" >
                <div style="line-height: .99rem !important;" :class="`opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5  ${this.showingBlockId ?? true ? 'block' : 'hidden'} `">
                    #{{ this.id }}
                </div>
                <div class="grow break-words" style="overflow-x: hidden; overflow-y: hidden; line-height: 1.14rem !important;" v-html="this.title.replaceAll(this.reg, this.replacement)">
                </div>
            </h3>
            <div class="text-sm break-words mt-1" v-html="`${this.content.replaceAll(this.reg, this.replacement)}`" ref="contented"></div>
        </div>
    
        <div :class="`${!this.isPlaceHolder ? 'hidden' : ''}`">
            <div class="opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5">
                #{{ this.id }}占位格子
            </div>
        </div>
        
    </div>
</template>
<script>

export default{
    name: 'TextBox',
    props: ['id', 'offset', 'span', 'inside', 'fill', 'x', 'isPlaceHolder', 'self', 'showingBlockId'],
    inject: {
        _: '_',
        __: '__',
        Get: 'Get',
        Seek: 'Seek',
        Focus: 'Focus'
    },
    data(){
        return {
            title: '=v=',
            content: '空哒!',
            replacement: '<span class=\"text-sm font-semibold\">不要尝试插入脚本!</span>',
            reg: /<script[^>]*?>[^]*?<\/script>/gi
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
            if (this.inside == null) return;
            
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
            else this.content = (process == '' ? '空哒! owo' : process);
        }
    },
    watch: {
        content(after, before){
            this.Renew();
        },
        x(){
            this.Renew();
        }
    },

}
</script>