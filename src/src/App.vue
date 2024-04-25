<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>


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
        GetColorName(){
            localStorage.setItem('accent', window.getComputedStyle(document.body).getPropertyValue('background-color'));
            return this.GlobalColorName;
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
        }
    },
    provide(){
        return {
            GetColor: this.GetColorName,
            _: this.GetColorName,
            SetColor: this.SetColorName,
            __: this.SetColorName,
        }
    }

}
</script>