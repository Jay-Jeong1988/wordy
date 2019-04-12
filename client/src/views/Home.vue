<template>
  <div class="home">
    <div class="workspaces">
      <WorkspaceCard v-on:workspaceRemoved="removeCard" v-for="(workspace, index) in workspaces" :key="index" :workspace="workspace"/>
      <div class="createLink">
        <router-link to="/create">
          <img src="../assets/images/plus.svg" class="addFile" />
          <h2>Add File</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import WorkspaceCard from '../components/WorkspaceCard'
import {api} from '../api'

export default {
  name: 'home',
  data () {
    return {
      workspaces: []
    }
  },
  props: ['user'],
  computed: {
  },
  methods: {
    createCard (){
      api.Card.create().then(res => {
        console.log(res);
      })
    },
    removeCard (workspaceId) {
      for(let workspace of this.workspaces) {
        if (workspace._id === workspaceId) this.workspaces.splice(this.workspaces.indexOf(workspace), 1);
      }
    }
  },
  created () {
    if (!localStorage.getItem("user")) this.$router.push("/login")
    else {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      api.Card.all(userId).then(cards => {
        this.workspaces = cards;
      })
    }
  },
  components: {
    WorkspaceCard,
  }
}
</script>
<style scoped>
  a {
      color: #007BFF;
  }
  a:hover {
    color: #007BFF;
    font-weight: bold;
  }
  .home {
    margin-top: 5em;
  }
  .createLink {
    width: fit-content;
    height: 242px;
    margin: 1em;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .addFile {
    width: 10em;
    height: 7dem;
  }
  .workspaces {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2em;
  }
  .btn-primary {
    position: absolute;
    right: 2em;
    top: 2em;
  }
</style>