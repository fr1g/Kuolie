<template>
    <span :class="`use-icon select-none  modal-content pointer-events-none translate-y-0.5 ${(this.figureX ?? false) == true ? 'translate-x-0.5' : ''} block align-middle`"
        :style="`--tw-translate-y: ${this.figure ?? '0.125'}rem; ${(this.figureX ?? false) == true ? '--tw-translate-x: .15rem' : ''}`"
     v-html="`&#x${this.$slots.default[0].text};`"></span>
</template>
<script>

export default{
    name: 'Icon',
    props: ['figure', 'figureX']
}
</script>