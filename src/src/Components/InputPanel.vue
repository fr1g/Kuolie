<template>
    <div ref="Container" :style="`height: ${((this.height ?? 'UNSET') + 'px').replace('UNSETpx', 'unset') }; max-height: 51vh; min-height: 12vh`" 
    class="min-h-fit relative transition   text-black dark:text-white">
        <div id="dragArea" style="box-shadow: 0 -3px 6px #30303030;"
        ref="dragArea" class="w-full bg-zinc-300 dark:bg-zinc-800 bg-opacity-80 dark:bg-opacity-80 text-lg text-center cursor-grab active:cursor-grabbing -translate-y-1 ">
            <Icon style="transform: translateY(1.5px);" class="inline-block">e76f</Icon>
        </div>
        <div class="px-3">
            <p class=" -translate-y-0.5 text-lg select-none text-black dark:text-white">
                <span>当前编辑: <span class="font-semibold ">#{{ Get(tempOrigin) == -1 ? '无' : Get(tempOrigin) }}</span></span>
            </p>
            <textarea id="textarea-input" class="w-full h-full top-0 bottom-0 left-0 right-0 mb-12 p-1.5 outline-none resize-none rounded-lg text-black dark:text-white bg-zinc-100 dark:bg-zinc-700" 
                :style="`min-height: 0; max-height: 37.89vh` " spellcheck="false" 
                @change="textAreaChanged()" @blur="textAreaChanged()" @input="textAreaAutoTag" @focus="textAreaFocus"
            ref="input" rows="5" :placeholder="this.tips"
            >{{ this.tempObject.content }}</textarea>
        </div>
        <div class="my-1 flex fixed justify-items-end flex-wrap bottom-1 right-1 left-1 px-1 pr-2 text-zinc-800" style="color: rgb(39 39 42 / var(--tw-text-opacity)) !important;"> 
            <Press overclass="text-lg bg-yellow-300" init-opacity="30" @click.native="Generate()">生成</Press> 
            <Press overclass="text-lg bg-indigo-300"  init-opacity="30" @click.native="Modal(true, ConfModal)">
                <Icon>f8b0</Icon>
            </Press> 
            <Press overclass="text-lg bg-violet-300" init-opacity="30" style="width: 33px; text-align: center;"  @click.native="Modal(true, '<HelpTipsModal />')">
                <span class="text-lg font-bold ">?</span>
            </Press> 
            <div class="grow"></div> 
            <div ref="adjustPriority" class="flex flex-wrap text-lg align-bottom mx-1 mr-1.5 text-black dark:text-white">
                <p class="align-bottom h-min my-auto mx-1">位置: </p>
                <Press @click.native="moveForward()"><Icon class="my-auto">f08d</Icon></Press>
                <div class="align-bottom mx-0.5 px-1.5 h-min my-auto rounded-lg border font-semibold">{{ Get(tempOrigin) == -1 ? '无' : Get(tempOrigin) }}</div>
                <Press @click.native="moveBackward()"><Icon class="my-auto">f08f</Icon></Press>
            </div>
            <p class="align-bottom h-min my-auto mx-1 font-bold text-xl -translate-y-0.5 text-black dark:text-white">
                ·
            </p>
            <div ref="adjustSpan" class="flex flex-wrap text-lg align-bottom mx-1 text-black dark:text-white" >
                <p class="align-bottom h-min my-auto mx-1">块宽度: </p>
                <Press @click.native="addSpan()"><Icon class="my-auto">e710</Icon></Press>
                <div class="align-bottom mx-0.5 px-1.5 h-min my-auto rounded-lg border font-semibold">{{ this.tempObject.span }}</div>
                <Press @click.native="remSpan()"><Icon class="my-auto">e738</Icon></Press>
            </div>
            <Press overclass="text-lg bg-green-300" init-opacity="30" @click.native="Add()" id="NEWTEXTBOX">添加</Press> 
            <Press overclass="text-lg bg-red-300" init-opacity="30" @click.native="judgeDeletion">删除</Press> 
            <div class="w-5 bg-opacity-30"></div>
            <Press overclass="text-lg bg-blue-300" init-opacity="30" @click.native="Add({placeholder: true, extendable: null})">占位</Press> 
            <Press overclass="text-lg bg-blue-300" init-opacity="30" @click.native="addExtended('image')">图片</Press> 
        </div> 
    </div>
</template>
<script>
import Icon from './Icon.vue';
import Press from './Press.vue';
import ConfigurationModal from './Views/ConfigurationModal.vue';
import ExtendInfo from './Classes/ExtendInfo';
 
export default{
    name: 'InputPanel',
    components: { Icon, Press, ConfigurationModal }, 
    inject: {
        _: "_", 
        __: "__", 
        Add: "Add", 
        Del: "Del", 
        EditX: "Upd",
        Get: "Get",
        Seek: "Seek",
        Move: "M",
        Modal: 'Modal',
        Generate: 'Generate',
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

        document.getElementsByTagName('textarea')[0].addEventListener('keydown', (e) => {this.handleKey(e)});
        document.getElementsByTagName('textarea')[0].addEventListener('keyup', (e) => {this.handleKey(e, true)});

        this.dragBarHeight = Cont.offsetHeight;
        // this.Add();
        
    },
    data(){
        return{
            isEditingMasonry: false,
            masonryCols: 1,
            ConfModal: '<ConfigurationModal class="no-flush" />',
            tips: `
            点击左下角的问号「?」来查看输入框提示.
            `.trim().replaceAll('\n', '').replaceAll('  ', ''),
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
            tempOrigin: {},
            ot: false,
            otname: '',
            otnamePause: false,
            key: '',
            prepare: '',
            shifting: false,
            currKeyEvent: null,
        };
    },
    methods: {
        chkNull(){
            if(this.Get(this.tempOrigin) == -1){
                this.remakeTemp();
                this.$forceUpdate();
            }
        },
        addExtended(type, args){
            this.Add({placeholder: false, extendable: new ExtendInfo(true, type, args)});
        },
        changeEditing(item){
            this.tempObject = item;
            this.tempOrigin = item;
            if(this.tempObject.isPlaceHolder) this.$refs.input.value = '占位小方块! 它会在生成结果中隐藏掉自己🫥...';
            else this.$refs.input.value = this.tempObject.content;
            this.$forceUpdate();
            let obj;
            if(document.getElementById(`TEXTBOX::${this.Get(this.tempOrigin)}`)) obj = document.getElementById(`TEXTBOX::${this.Get(this.tempOrigin)}`);
            else return;
            setTimeout(() => {
                obj.classList.add('shine');
            }, 123);
            setTimeout(() => {
                obj.classList.remove('shine');
            }, 1234);
        },

        Edit(o, i, r){ 
            this.EditX(o, i, r);
            this.tempOrigin = this.tempObject; // unknown priority
        },
        moveForward(){
            if(this.Get(this.tempOrigin) == 0) {
                PushToast('不可以再往<b class="text-lg">前</b>挪了! ', 'warn');
                return;
            }
            let hit = this.Move(this.Get(this.tempOrigin), this.Get(this.tempOrigin) - 1);
            this.changeEditing(this.Seek(hit));
        },
        moveBackward(){
            if(this.Get(this.tempOrigin) == this.Get() - 1){
                PushToast('不可以再往<b class="text-lg">后</b>挪了! ', 'warn');
                return;
            }
            let hit = this.Move(this.Get(this.tempOrigin), this.Get(this.tempOrigin) + 1);
            this.changeEditing(this.Seek(hit));
        },
        judgeDeletion(e){
            if(this.tempObject.id == null) return; //
            this.Del(`${this.Get(this.tempOrigin)}`, `${this.tempObject.content}`); // unnecessary to change. this is still usable.
            this.remakeTemp();
        },
        remakeTemp(){
            this.tempObject = {
                id: null,
                content: '',
                span: 1,
                offset: 0,
                x: 0,
                isPlaceHolder: false,
            };
            this.tempOrigin = {};
            this.$refs.input.value = '';
        },
        submit(){
            this.Edit(this.Get(this.tempOrigin), this.tempObject);
        },
        appendAtInput(item, plus = null, r = null){
            if(r != null) {
                this.$refs.input.selectionEnd = r;
                this.$refs.input.selectionStart = r;
            }
            return `${this.$refs.input.value.slice(0, this.$refs.input.selectionStart)}${item}${this.$refs.input.value.slice(plus ?? this.$refs.input.selectionEnd)}`;
        },
        textAreaAutoTag(e){
            if(window.location.href.includes('#debug')) console.log(e);
            if(this.ot){ // opened
                if(e.data == '<') return;
                else if(e.data == '='){
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`""`);
                    e.target.selectionStart = dir + 1;
                    e.target.selectionEnd = dir + 1;
                }
                else if(e.data == '/'){
                    if( e.target.value.slice(e.target.selectionStart - 2, e.target.selectionStart - 1) != ' ' ) {
                        this.otname += '/'
                        return;
                    }
                    this.$refs.input.value = this.appendAtInput(`>`);
                    this.otname = '';
                    this.otnamePause = true;
                    this.ot = false;
                }else if(e.data == '>'){
                    if( e.target.value.slice(e.target.selectionStart - 2, e.target.selectionStart - 1) == '/') return;
                    if((this.otname.slice(0, 1) ?? '') == '/') return;
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`</${this.otname.replaceAll(' ', '')}>`);
                    e.target.selectionStart = dir;
                    e.target.selectionEnd = dir;
                    this.otname = '';
                    this.otnamePause = true;
                    this.ot = false;
                }else{
                    if(e.data == ' ') this.otnamePause = true;
                    if(!this.otnamePause ) {
                        if(e.data != null) this.otname += e.data;
                        else{
                            if(this.key.includes('backspace')) 
                                this.otname = this.otname.substring(0, this.otname.length - 1);
                        }
                    }
                    
                }
            }else{ // nothing new opened
                if(e.data == '<') {
                    this.ot = true;
                    this.otnamePause = false;
                    // console.log('new tag opened')
                }
                else if(e.data == '['){
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`]`);
                    e.target.selectionStart = dir;
                    e.target.selectionEnd = dir;
                }
                else if(e.data == '【'){
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`】`);
                    e.target.selectionStart = dir;
                    e.target.selectionEnd = dir;
                }
                else if(e.data == '=' && e.target.value.slice(e.target.selectionStart - 2, e.target.selectionStart - 1) != '%' && ((e.target.value.slice(e.target.selectionStart, e.target.selectionStart + 1) ?? '') == '>' || (e.target.value.slice(e.target.selectionStart, e.target.selectionStart + 1) ?? '') == '/')){
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`""`);
                    e.target.selectionStart = dir + 1;
                    e.target.selectionEnd = dir + 1;
                }
                else if(e.data == '=' && e.target.value.slice(e.target.selectionStart - 2, e.target.selectionStart - 1) == '%'){
                    let dir = e.target.selectionStart;
                    this.$refs.input.value = this.appendAtInput(`%`);
                    e.target.selectionStart = dir;
                    e.target.selectionEnd = dir;
                }
                else if(e.data == null){
                    if(this.key == 'enter') 
                        if(!this.currKeyEvent.shiftKey) 
                            {
                                let dir = e.target.selectionStart + 5;
                                this.$refs.input.value = this.appendAtInput(`<br/>`);
                                e.target.selectionStart = dir;
                                e.target.selectionEnd = dir;
                            }
                }
            }
            this.textAreaChanged();
        },
        handleKey(e, isRelease = false){
            this.key = e.code.toLowerCase();
            this.currKeyEvent = e;
            if(window.location.href.includes('#debug')) console.log('handleKey: ' + this.key + '; isRelease: ' + isRelease);
            if(this.key.includes('shift')) this.shifting = isRelease;
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
            this.Edit(this.Get(this.tempOrigin), this.tempObject);
            this.tempObject.x = Math.floor(Math.random(6) * 100000);
            this.Edit(this.Get(this.tempOrigin), this.tempObject);
            return;
        },
        addSpan(){
            if(this.tempObject.id == null && localStorage.masonry != 'true'){
                PushToast('未选中修改目标! ', 'warn');
                return;
            }
            if(this.tempObject.span == 12) {
                PushToast('已经最大了! ', 'warn');
                Scroll(`TEXTBOX::${this.Get(this.tempOrigin)}`);
                return;
            }
            else  {
                this.tempObject.span ++;
                this.Edit(this.Get(this.tempOrigin), this.tempObject, true);
            }
        },
        remSpan(){
            if(this.tempObject.id == null && localStorage.masonry != 'true'){
                PushToast('未选中修改目标! ', 'warn');
                return;
            }
            if(this.tempObject.span == 1) {
                PushToast('已经最小了! ', 'warn');
                Scroll(`TEXTBOX::${this.Get(this.tempOrigin)}`);
                return;
            }
            else  {
                this.tempObject.span --;
                this.Edit(this.Get(this.tempOrigin), this.tempObject, true);
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
