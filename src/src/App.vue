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
        Test(){
            console.log("test");
        },
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
            Try: this.Test,
            GetColor: this.GetColorName,
            _: this.GetColorName,
            SetColor: this.SetColorName,
            __: this.SetColorName,
        }
    }

}
</script>