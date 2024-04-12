<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>


export default{
    name: 'App',
    data(){
        return {
            GlobalColorName: 'emerald'
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
            this.GlobalColorName = name ?? 'emerald';
            this.$forceUpdate();
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