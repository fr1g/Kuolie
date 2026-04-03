<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->




<template>
    <span :class="`use-icon select-none  modal-content pointer-events-none  block align-middle`"
        v-html="`&#x${this.$slots.default[0].text};`"></span>
</template>
<script>

export default {
    name: 'Icon',
    props: ['figure', 'figureX']
}
</script>