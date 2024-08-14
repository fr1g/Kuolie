<template>
    <div :id="`TEXTBOX::${this.id}`" @click="Focus(Seek(id))"
        :class="`   basicLooking? p-2.5 ?${this.isMasonry ? 'm-2' : ''} rounded-lg shadow transition-all hover:shadow-md active:shadow-lg opacity-95 hover:opacity-80 active:opacity-70
                    advancedLooking? col-span-${this.span ?? '1'}  ${this.fill ? 'h-full' : 'h-fit'} text-${this._(1)}-900 bg-${this._(1)}-100
                    ${this._(1).includes('EXT') ? 'bg-opacity-20' : ''} 
                    forExtraFunctions? ${this.isPlaceHolder ? 'grow col-span-auto justify-items-center justify-center items-center  grid' : ''}
                `"
                :style="`z-index: ${this.id + 10}; ${this.isPlaceHolder ? 'opacity: var(--opa);' : ''}`">
        <div :class="`${this.isPlaceHolder ? 'hidden' : ''}`">
            <h3 :class="`text-${this._(1)}-700 font-semibold text-lg flex flex-wrap break-words`" >
                <div style="line-height: .99rem !important;" :class="`opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5  ${this.showingBlockId ?? true ? 'block' : 'hidden'} `">
                    #{{ this.displayId }}
                </div>
                <div class="grow break-words" style="overflow-x: hidden; overflow-y: hidden; line-height: 1.14rem !important;" v-html="this.title.replaceAll(this.reg, this.replacement).replaceAll(this.regFrame, this.replacement.replace('脚本', 'iFrame'))">
                </div>
            </h3>
            <div class="text-sm break-words mt-1.5 pt-0.5" v-html="`${ApplyIcon(this.content.replaceAll(this.reg, this.replacement).replaceAll(this.regFrame, this.replacement.replace('脚本', 'iFrame')))}`" ref="contented"></div>
        </div>
    
        <div :class="`${!this.isPlaceHolder ? 'hidden' : ''}`">
            <div class="opacity-60 pr-0.5 text-base align-bottom font-normal translate-y-0.5">
                #{{ this.ignorePID ? 'X' : this.id }} 占位{{ (this.span <= 1 ? '' : '格') }}{{ this.span <= 2 ? '' : '子' }}
            </div>
        </div>
        
    </div>
</template>
<script>

export default{
    name: 'TextBox',
    props: ['id', 'offset', 'span', 'inside', 'fill', 'x', 'isPlaceHolder', 'self', 'showingBlockId', 'displayId', 'isMasonry'],
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
            reg: /<script[^>]*?>[^]*?<\/script>/gi,
            regFrame: /<iframe[^>]*?>[^]*?<\/iframe>/gi,
            useIconReg: /%=.{4}%/g,
            ignorePID: false
        }
    },
    mounted(){ // [] /【】
        this.ignorePID = localStorage.ignorePID == 'true';
        this.$nextTick(() => {
            this.Renew();
        });
    },
    beforeUpdate(){
        this.Renew();
    },
    methods: {
        ApplyIcon(x){
            let founds = x.match(/%=/g);
            console.log(founds);
            // let tries = (founds ?? []).length / 2, tmp = x;
            let tries = (founds ?? []).length, tmp = x;
            if(tries == 0 || tries == NaN) return x;
            for(let i = 0; i < tries; i++){
                let iconText = founds[i].slice( founds[i].search(this.useIconReg), founds[i].search(this.useIconReg) + 7 + 1);
                tmp = tmp.replaceAll(iconText, iconText.replace('%=', '&#x').replace('%', ';'));
                console.log('applied icon name: ' + iconText);
            }
            return tmp;
        },
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
