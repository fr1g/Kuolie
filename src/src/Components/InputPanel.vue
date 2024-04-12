<template>
    <div ref="Container" :style="`height: ${((this.height ?? 'UNSET') + 'px').replace('UNSETpx', 'unset') }; max-height: 51vh; min-height: 12vh`" 
    class="m-1 min-h-fit relative transition">
        <div id="dragArea" ref="dragArea" class="w-full text-lg text-center border-b cursor-grab active:cursor-grabbing -translate-y-1">
            <Icon>e76f</Icon>
        </div>
        <p class=" -translate-y-1 text-lg">
            <span>当前编辑: <span class="font-semibold ">#{{ this.editing }}</span></span>
        </p>
        <textarea id="textarea-input" class="w-full h-full top-0 bottom-0 left-0 right-0 mb-12 p-1.5 outline-none resize-none rounded-lg" 
            :style="`min-height: 0; max-height: 37.89vh` " 
        ref="input" rows="5"
        ></textarea>
        <div class="my-1 flex fixed justify-items-end flex-wrap bottom-1 w-full right-1">
            <div class="grow"></div> 
            <Press overclass="text-lg" @click.native="__('rose')">huanse</Press>  
            <Press overclass="text-lg">添加</Press> 
            <Press overclass="text-lg">提交</Press> 
        </div> 
    </div>
</template>
<script>
import Icon from './Icon.vue';
import Press from './Press.vue';
 
export default{
    name: 'InputPanel',
    components: { Icon, Press }, 
    inject: {_: "_", __: "__"},
    mounted: function (){
        console.log(this);
        let Drag = this.$refs.dragArea,
            Cont = this.$refs.Container;
        Drag.addEventListener('mousedown', () => {this.startDrag()});
        Drag.addEventListener('touchstart', () => {this.startDrag()});

        window.addEventListener('mouseup', (e) => {this.endDrag(e)});
        window.addEventListener('touchend', (e) => {this.endDrag(e)});

        window.addEventListener('mousemove', (e) => {this.resize(e)});
        window.addEventListener('touchmove', (e) => {this.resize(e)});

        this.dragBarHeight = Cont.offsetHeight;
        
    },
    data(){
        return{
            resizing: false,
            height: null,
            editing: 0,
            timer: false,
            timerRef: null,
            dragBarHeight: 0,
            tempObject: {
                id: null,
                toRender: '',
                // ...
            }
        };
    },
    methods: { // changeEditing, submitChange, startDrag, endDrag, resize
        startDrag(){
            this.resizing = true;
        },
        endDrag(e){
            if(e.target.id == 'textarea-input') return;
            this.resizing = false;
            this.resize(e, true);
        },
        resize(e, isForce = false){
            if(!this.resizing) return;
            if(this.timer & !isForce) return;
            console.log('invoked. isForce: ' + isForce);
            this.timer = true;
            let upYpos = window.innerHeight - (e.clientY ?? e.touches[0].clientY);
            this.height = upYpos;
            this.$refs.input.style.height = `${upYpos - 40 - 1 - 70}px`;
            this.$refs.input.style.opacity = 0.01 * (upYpos - (114 / 1.1919810));

            this.timerRef = setTimeout(() => {
                this.timer = false;
                clearTimeout(this.timerRef);
            }, 10);

        }

    }
}
</script>