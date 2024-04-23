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
            return this.GlobalColorName;
        },
        SetColorName(name){
            this.GlobalColorName = (name ?? 'emerald').toLowerCase();
            this.$forceUpdate();
            localStorage.setItem('color', this.GlobalColorName);
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