<template>
    <div>
        <p class=" font-semibold text-3xl">似乎是初次使用「截取」呢! </p>
        <p>简单介绍一下吧! 总之, 「截取」的过程是这样的: </p>
        <ul>
            <li>1 先隐藏不必要的元素</li>
            <li>2 然后绘制画布(canvas)</li>
            <li>3 然后将画布转为图片</li>
            <li>4 然后通过本地处理图片</li>
            <li>5 然后通过浏览器的下载功能保存为文件!</li>
            <li><br>保存成功后记得看一看成品喔! 如果有问题的话再回来修改调整吧!</li>
        </ul>
        <div class="flex">
            <div class="grow"></div>
            <Press class=" align-bottom" @click.native="handler()" is-for-modal-close="false" ><Icon class=" inline-block">f133</Icon> 好~</Press>
        </div>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
import Press from '../Press.vue';

export default {
    name: 'FirstTryInfoModal',
    components: {Icon, Press},
    inject: {GS: 'GenerateStep'},
    methods: {
        handler(){
            this.GS();
        }
    },

}
</script>