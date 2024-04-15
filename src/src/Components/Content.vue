<template>
    <div class=" w-full p-7 grid justify-items-center">
        <div :class="`  bg-${this._()}-200 text-${this._()}-800
                    rounded-lg shadow-md transition w-5/6 p-5 hover:shadow-lg`">
            <h1 class="">
                <input type="text" :class="'w-fit p-1 inline-block text-3xl border-0 outline-1 bg-transparent '" placeholder="点击输入标题文本..." />
            </h1>
        </div>

    </div>
</template>
<script>

export default{
    name: 'Content',
    inject: {_: "_", __: "__"},
    provide(){
        return{
            Add: this.Create,
            Del: this.Remove,
            Upd: this.Modify
        }
    },
    methods: {
        Create(){
            console.log('Creation needs no ID');
            
        },
        Remove(id = 'default'){
            console.log(`Remove requires ID: ${id}`);
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }

        },
        Modify(id = 'default'){
            console.log(`Modify requires ID: ${id}`);
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }

        },
    }
}
</script>