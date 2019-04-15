<template>
    <div class="backButton">
        <button @click="$router.go(-1)" class="back">
            <img src="../assets/images/previous.svg"/>
            <h5>Back</h5>
        </button>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'backButton',
        data () {
            return {

            }
        }
    }
</script>
<style>
    .backButton {
        width: 100vw;
        position: fixed;
        top: 3.5em;
        left: 0;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .back {
        border: none;
        background-color: transparent;
        width: 3em;
        margin-left: 1.5em;
    }
</style>