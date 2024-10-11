<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import KConfig from './kuolie.config.js';

export default{
    name: 'App',
    mounted(){ 
        // this.SetColorName(); 
    },
    data(){
        return {
            GlobalColorName: ''
        };
    }, 
    methods: {
        GetColorName(n = 0){
            localStorage.setItem('accent', window.getComputedStyle(document.body).getPropertyValue('background-color'));
            return this.ExtendedColorParse(this.GlobalColorName, n);
        },
        SetColorName(name){
            this.GlobalColorName = (name ?? 'emerald').toLowerCase();
            this.$forceUpdate();
            localStorage.setItem('color', this.GlobalColorName);
            localStorage.setItem('accent', window.getComputedStyle(document.body).getPropertyValue('background-color'));
            // document.body.classList.remove
            let _tmp = '';
            localStorage.setItem('accent', window.getComputedStyle(document.body).getPropertyValue('background-color'));
            for(let cc of document.body.classList){
                if(cc.includes('bg-')) _tmp = cc;
            }
            document.body.classList.replace(_tmp, `bg-${this.GlobalColorName}-100`);

            if((name ?? 'emerald').includes('&') && ((localStorage.usePlayCDN ?? 'false') == 'false')) setTimeout(() => {
                PushToast('使用扩展颜色需要启用Tailwind PlayCDN，请前往设置\uf8b0 启用。', 'bg-orange-400', 100, 3690);
            }, 678);
        },
        ExtendedColorParse(saved, part = 0, keep = false){
            
            if(!saved.includes('&')) return saved;
            else {
                let parts = saved.split('&');
                if(parts.length === 2)
                    if(keep) return ` EXT ${part == 0 ? 'bg-' : 'text-'}${parts[part]}`;
                    else return `${parts[part]} EXT `;
                else{
                    // deal with 3 parts
                }
            }

        }
    },
    provide(){
        return {
            GetColor: this.GetColorName,
            _: this.GetColorName,
            SetColor: this.SetColorName,
            __: this.SetColorName,
            ExtendedColorParse: this.ExtendedColorParse,
            ___: this.ExtendedColorParse
        }
    }

}
</script>
