<template>
    <div class="workspaceCard">
        <router-link :to="`/workspaces/${workspace._id}`">
            <b-card class="container">
            <img src="../assets/images/edit.svg" alt="card image"/>
                <b-card-body>
                    <div class="text">
                        <b-card-title class="text-center">{{workspace.title}}</b-card-title>
                        <b-card-text>Length: {{workspace.length}}</b-card-text>
                        <b-card-text>Created at: {{createdAtFormat}}</b-card-text>
                        <b-card-text>Last modified at: {{lastSavedAtFormat}}</b-card-text>
                    </div>
                </b-card-body>
            </b-card>
        </router-link>
        <button class="icon-rm" @click="removeWorkspace"></button>
    </div>
</template>
<script>
import {api} from '../api'
export default {
    name: "WorkspaceCard",
    props: [ 'workspace' ],
    data () {
        return {
        }
    },
    computed: {
        createdAtFormat () {
            const createdDate = this.workspace.createdAt.split("T")[0];
            const createdTime = this.workspace.createdAt.split("T")[1].split(".")[0];
            return createdDate + " " + createdTime;
        },
        lastSavedAtFormat () {
            const lastSavedDate = this.workspace.lastSavedAt.split("T")[0];
            const lastSavedTime = this.workspace.lastSavedAt.split("T")[1].split(".")[0];
            return lastSavedDate + " " + lastSavedTime;
        }
    },
    methods: {
        removeWorkspace () {
            const cf = confirm("Do you want to delete the workspace?")
            
            if (cf === true) {
                api.Card.destroy(this.workspace._id).then( res => {
                    console.log(res.msg)
                    this.$emit("workspaceRemoved", res.result._id);
                })
            }
        }
    },  
}
</script>
<style scoped>
a {
    color: rgb(37, 37, 37);
}
.workspaceCard {
    margin: 1em;
    position: relative;
}

[alt="card image"] {
  display: block;
  width: 10em;
  height: auto;
}

.container {
    width: fit-content;
    text-align: start;
    border: none;
}

.text {
    font-size: 0.6em;
}
.text > * {
    margin: 0;
}
.card-body {
    padding: 0;
    width: 10em;
}
.icon-rm {
    position: absolute;
    top: -1.3em;
    right: -1.3em;
    width: 3em;
    height: 3em;
    border: none;
    background-image: url(../assets/images/minus.svg);
    background-size: cover;
    background-position: center;
    background-color: transparent;
    align-self: flex-start;
}
</style>

