<template>
    <div :title="((this.title ?? this.link))"
     :class="(`pressable transition ${this.unspaced <= 1 || (this.overclass ?? 'x').includes('text-') ? '' : 'text-sm'} ${((this.overclass ?? '').includes('bg-')) ? '' : 'bg-stone-300 dark:bg-stone-700'}
          text-stone-950  dark:text-stone-50 shadow${(this.initShadow ?? 'true') == 'true' ? '' : (this.initShadow == 'sm' ? '-sm' : '-none')} 
            ${((this.overclass ?? '').includes('rounded')) ? '' : 'rounded-lg'}
            bg-opacity-${((this.initOpacity != null) & (typeof parseInt(this.initOpacity) == 'number')) ? this.initOpacity : '35'} 
            dark:bg-opacity-${((this.initOpacity != null) & (typeof parseInt(this.initOpacity) == 'number')) ? this.initOpacity : '35'}
            hover:shadow-md hover:bg-opacity-70   active:shadow-sm active:bg-opacity-100 
            dark:hover:bg-opacity-70 dark:hover:shadow-md   dark:shadow  dark:active:shadow-sm dark:active:bg-opacity-100
            px-2 py-1 mx-1 select-none
            ${(this.disable ?? 'false') == 'true' ? 'dis' : ''}
            ${this.overclass}
        `)" :style="`${this.overstyle} ; cursor: pointer;`"   ref="pressableBase">
        <span class="tense">
            <i :class="(`${this.iconClass}`)"></i> 
            <span :class="`text-center my-auto mx-0 ml-0 ${(this.isOnlyIcon ?? 'false') == 'true' ? ' use-icon ' : ' '}`" ><span ref="iconRef" :class="`use-icon translate-y-0.5 mr-1 ${this.iconRefHide ? 'hidden' : 'inline-block'}`"></span><span class="inline-block"><slot></slot></span>{{ (((this.hideProtocol ?? 'false') == 'true') & this.ex.includes('://') ? this.ex.split('://')[1] : this.ex) }}</span><i :class="(((this.noLinkIcon ?? 'false') == 'true') ? 'hidden' : ((this.type == 'outer' || this.isVerified == 'true') ? '  text-sm use-icon sm-icon' : 'hidden'))" style="vertical-align: text-top !important; " ref="endIconRef"> &#xe8a7;</i>
        </span>
    </div>
</template>
<script>

export default{
    name: 'Press',
    props: ['type', 'target', 'isVerified', 'hideMatchedIcon', 'initShadow', 'isOnlyIcon', 'overstyle', 'iconClass', 'link', 'overclass', 'initOpacity', 'isFuncButton', 'copyContent', 'isDownload', 'disable', 'hideProtocol', 'noLinkIcon', 'title' ], // 类型(内外链)，页面打开类型，覆盖的样式，图标类名，链接
    data: function(){
        return {
            unspaced: 0,
            iconRefHide: false,
            // ex: ''
        }; 
    },
    mounted: function(){
        this.iconRefHide = (this.$refs.iconRef.innerHTML == '');
        this.unspaced = (this.$slots.default[0].text ?? '').replaceAll(' ', '').length;
        this.$refs.pressableBase.addEventListener('pointerup', () => {this.RunClickEvent(this.link, this.type)}); // @click="RunClickEvent(link, type)"
        if((this.hideMatchedIcon ?? 'false') != 'true')    
        {
            if((this.type ?? '') == 'copy') this.$refs.iconRef.innerHTML = '\ue8c8';
            if((this.type ?? '').includes('outer') || (this.type ?? '').includes('link')) this.$refs.iconRef.innerHTML = '\ue71b';
            if((this.type ?? '').includes('down')) this.$refs.iconRef.innerHTML = '';
            if((this.type ?? '') == 'bonsai') this.$refs.iconRef.innerHTML = '\uf586';
            if((this.type ?? '') == '_') this.$refs.iconRef.innerHTML = '\uf745';
            if(((this.type ?? '') == 'verified')) this.$refs.iconRef.innerHTML = '';
            if(((this.isVerified ?? '') == 'true')) this.$refs.endIconRef.innerHTML += ' \uea18'
            this.$refs.iconRef.innerHTML += ' '
        }

        // console.log(this.unspaced <= 1 || this.overclass.includes('text-'))
    }, beforeDestroy(){ this.$refs.pressableBase.removeEventListener('pointerup', () => {this.RunClickEvent(this.link, this.type)}) },
    methods: {
        RunClickEvent: function(to, ty){
            // console.log(to + ' ' + ty + ' ' + this.link)
            let LINKHANDLER = document.getElementById('LINKHANDLER');
            if(this.isFuncButton == 'true') return;

            if(ty == 'copy')
            if(this.copyContent != undefined)
            {
                if(this.copyContent == 'this.content') this.Copy(this.$slots.default[0].text);
                else this.Copy(this.copyContent);
                return;
            }
            if(ty == 'outer' || ty == 'outer-link') {
                if(`${this.link}` == 'undefined') {
                    this.GlobalToast(this.$_('base.nolink'), 'blur');
                    return;
                }
                LINKHANDLER.setAttribute('target', '_blank');
                LINKHANDLER.setAttribute('href', to);
                LINKHANDLER.click();
            }else if(ty == 'bonsai') return;
             else if(ty == 'verified-link'){
                if(`${this.link}` == 'undefined') {
                    this.GlobalToast(this.$_('base.nolink'), 'blur');
                    return;
                }
                LINKHANDLER.setAttribute('target', '_blank');
                LINKHANDLER.setAttribute('href', to);
                LINKHANDLER.click();
            }else if((ty ?? '').includes('download:')){
                if(`${this.link}` == 'undefined') {
                    this.GlobalToast(this.$_('base.nolink'), 'blur');
                    return;
                }
                if(to.includes('%origin%')) to = to.replace('%origin%', ORIGIN);
                let filename = ty.replace('download:', '');
                LINKHANDLER.setAttribute('download', filename);
                LINKHANDLER.setAttribute('href', to);
                LINKHANDLER.click();
                LINKHANDLER.removeAttribute('download');
            }
            else{
                try {
                    this.$router.push(to).catch(ex => {
                        // console.groupCollapsed('ignorable error occured while trying to use Pressable Route');
                        // console.log(ex);
                        // console.groupEnd();
                        ex
                    });
                } catch (ex) {
                    // console.groupCollapsed('error occured');
                    // console.log(ex);
                    // console.groupEnd();
                    ex
                }
            }
        },
        Copy: function(item){
            try {
                navigator.clipboard.writeText(item).then(
                    () => { PushToast(`${this.$_('base.copied')}：${item}`, 'bg-green-500') }
                ).catch((ex) => {

                    PushToast(`复制失败`, 'err')
                })
            } catch (ex) {
                PushToast(`测试环境或其他HTTP无S环境无法使用复制到剪贴板。`, 'blur');
            }
        },
        GlobalToast: function(a1, a2, a3 = 0, a4 = 3200){
            eval(`PushToast('${a1}', '${a2}', ${a3}, ${a4});`)
        }
    },
    computed: {
        ex: function(){
            return (`${this.$slots.default[0].text}`.includes('：') ? this.copyContent : '');
        }
    }
}
</script>

<style scoped>
i{
    text-transform: none;
    text-decoration: none;
    text-emphasis: none;
    font-variant: normal;
    font-style: normal !important;
}
.dis{
    cursor: not-allowed !important;
    pointer-events: none !important;
    background-color: rgba(67, 67, 67, 0.314);
    color: grey;
}

</style>