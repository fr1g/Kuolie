<template>
    <div ref="Container" :style="`height: ${((this.height ?? 'UNSET') + 'px').replace('UNSETpx', 'unset') }; max-height: 51vh; min-height: 12vh`" 
    class="min-h-fit relative transition">
        <div id="dragArea" style="box-shadow: 0 -3px 6px #30303030;"
        ref="dragArea" class="w-full bg-zinc-300 text-lg text-center cursor-grab active:cursor-grabbing -translate-y-1 ">
            <Icon style="transform: translateY(1.5px);" class="inline-block">e76f</Icon>
        </div>
        <div class="px-3">
            <p class=" -translate-y-0.5 text-lg select-none">
                <span>当前编辑: <span class="font-semibold ">#{{ this.tempObject.id ?? '无' }}</span></span>
            </p>
            <textarea id="textarea-input" class="w-full h-full top-0 bottom-0 left-0 right-0 mb-12 p-1.5 outline-none resize-none rounded-lg" 
                :style="`min-height: 0; max-height: 37.89vh` " spellcheck="false" 
                @change="textAreaChanged()" @blur="textAreaChanged()" @input="textAreaAutoTag" @focus="textAreaFocus"
            ref="input" rows="5" placeholder="在开头使用「方括号 ([] /【】)」包裹住的文字将成为块的标题."
            >{{ this.tempObject.content }}</textarea>
        </div>
        <div class="my-1 flex fixed justify-items-end flex-wrap bottom-1 right-1 left-1 px-1 pr-2 text-zinc-800" style="color: rgb(39 39 42 / var(--tw-text-opacity)) !important;"> 
            <Press overclass="text-lg bg-yellow-300">生成</Press> 
            <Press overclass="text-lg bg-indigo-300"  @click.native="Modal(true, '<ConfigurationModal />')">
                <Icon>f8b0</Icon>
            </Press> 

            <div class="grow"></div> 
            
            <div ref="adjustSpan" class="flex flex-wrap text-lg align-bottom mx-1" >
                <p class="align-bottom h-min my-auto mx-1">块宽度: </p>
                <Press @click.native="addSpan()"><Icon class="my-auto">e710</Icon></Press>
                <div class="align-bottom mx-0.5 px-1.5 h-min my-auto rounded-lg border font-semibold">{{ this.tempObject.span }}</div>
                <Press @click.native="remSpan()"><Icon class="my-auto">e738</Icon></Press>
            </div>
            <Press overclass="text-lg bg-green-300" @click.native="Add()" id="NEWTEXTBOX">添加</Press> 
            <Press overclass="text-lg bg-red-300" @click.native="judgeDeletion">删除</Press> 
            <div class="w-5"></div>
            <Press overclass="text-lg bg-blue-300" @click.native="Add(true)">占位</Press> 
        </div> 
    </div>
</template>
<script>
import Icon from './Icon.vue';
import Press from './Press.vue';
import ConfigurationModal from './Views/ConfigurationModal.vue';
 
export default{
    name: 'InputPanel',
    components: { Icon, Press, ConfigurationModal }, 
    inject: {
        _: "_", 
        __: "__", 
        Add: "Add", 
        Del: "Del", 
        Edit: "Upd",
        Modal: 'Modal'
    },
    mounted: function (){
        // console.log(this);
        let Drag = this.$refs.dragArea,
            Cont = this.$refs.Container;
        Drag.addEventListener('mousedown', () => {this.startDrag()});
        Drag.addEventListener('touchstart', () => {this.startDrag()});

        window.addEventListener('mouseup', (e) => {this.endDrag(e)});
        window.addEventListener('touchend', (e) => {this.endDrag(e)});

        window.addEventListener('mousemove', (e) => {this.resize(e)});
        window.addEventListener('touchmove', (e) => {this.resize(e)});

        this.dragBarHeight = Cont.offsetHeight;
        // this.Add();
        
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
                content: '',
                span: 1,
                offset: 0,
                x: 0,
                isPlaceHolder: false,
            },
            OpeningTag: false,

        };
    },
    methods: { // changeEditing(Focus), submitChange, startDrag, endDrag, resize
        changeEditing(item){
            // console.log(`got received: ${item}`);
            this.tempObject = item;
            if(this.tempObject.isPlaceHolder) this.$refs.input.value = '占位小方块! 它会在生成结果中隐藏掉自己🫥...';
            else this.$refs.input.value = this.tempObject.content;
            this.$forceUpdate();
        },

        judgeDeletion(e){
            if(this.tempObject.id == null) return;
            this.Del(`${this.tempObject.id}&#&${this.tempObject.content.slice(0, 12)}...`);
        },
        submit(){
            this.Edit(this.tempObject);
        },
        textAreaAutoTag(e){
            console.log(e);

        },
        textAreaFocus(e){

            if(this.tempObject.id != null) return;
            else {
                e.target.blur();
                document.getElementById('NEWTEXTBOX').click();
                setTimeout(() => {
                    e.target.click();
                }, 50);
            }
        },
        textAreaChanged(){
            this.tempObject.content = document.getElementById('textarea-input').value;
            this.Edit(this.tempObject);
            this.tempObject.x = Math.floor(Math.random(6) * 100000);
            this.Edit(this.tempObject);
        },
        addSpan(){
            if(this.tempObject.id == null){
                PushToast('未选中修改目标! ', 'warn');
                return;
            }
            if(this.tempObject.span == 12) {
                PushToast('已经最大了! ', 'warn');
                Scroll(`TEXTBOX::${this.tempObject.id}`);
                return;
            }
            else  {
                this.tempObject.span ++;
                this.Edit(this.tempObject);
            }
        },
        remSpan(){
            if(this.tempObject.id == null){
                PushToast('未选中修改目标! ', 'warn');
                return;
            }
            if(this.tempObject.span == 1) {
                PushToast('已经最小了! ', 'warn');
                Scroll(`TEXTBOX::${this.tempObject.id}`);
                return;
            }
            else  {
                this.tempObject.span --;
                this.Edit(this.tempObject);
            }
        },
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
            // console.log('invoked. isForce: ' + isForce);
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
<style scoped>
.align-bottom{
    vertical-align: bottom !important;
}
</style>