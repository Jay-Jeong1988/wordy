<template>
  <main class="workspace">
    <BackButton>
      <button @click="edit" class="edit btn btn-outline-success">
        <p style="line-height: normal">{{editable ? "Done" : "Edit"}}</p>
      </button>
    </BackButton>
    <div class="container">
      <h1>{{workspace.title}}</h1>
      <div class="contents">
        <p @click="toggleWord" v-html="workspace.contents" @input="preserveData"></p>
      </div>
    </div>
  </main>
</template>

<script>
import BackButton from '../components/BackButton.vue'
import {api} from '../api'
import {blankUtil} from '../utils/blankUtil'
export default {
  name: 'Workspace',
  computed: {
  },
  components: {BackButton},
  methods: {
    edit () {
      const contentsContainer = document.querySelector('.contents > p');
      if (contentsContainer.getAttribute("contenteditable")) {
        contentsContainer.setAttribute("contenteditable", false)
        this.editable = false
      }
      else {
        contentsContainer.setAttribute("contenteditable", true)
        this.editable = true
      }
    },
    preserveData: function(event) {
      //mimic workspace for preventing the cursor to get its position reset everytime the data is changed
      let virtualWorkspace = {contents: event.target.innerHTML, lastIndex: this.workspace.lastIndex};
      api.Card.update(this.workspace._id, virtualWorkspace).then(res => {
        console.log(res.msg);
      })
    },
    toggleWord: function(event){
      const sel = window.getSelection();
      const textRead = sel.toString();
      this.clicks++ 
      //single clicked
      if(this.clicks === 1) {
        var self = this
        this.timer = setTimeout(function() {
          self.clicks = 0
        }, this.delay);
      } 
      //double clicked
      else{
        if (sel.rangeCount && !!sel.toString()) {
          let range = sel.getRangeAt(0);
          let text = textRead;
          if (text.length > 1 && (/\n\s/).test(text[text.length-1])) text = text.trim();

          //When a word is clicked
          if (!text.includes(String.fromCharCode(9675))) {
            //When the selection is not a number, special key, white space, line break
            if (blankUtil.isTextOnly(text)) {
              let blank = {};
              let inc = this.workspace.lastIndex++;
              const textNode = document.createTextNode(blankUtil.convertToBlank(text));
              // const indexNode = blankUtil.createIndexNode(inc);
              
              blankUtil.replaceWithBlankNode(range, textNode, inc);
              this.workspace.contents = document.querySelector('.contents > p').innerHTML;  
              api.Card.update(this.workspace._id, this.workspace).then(res => {
                console.log(res.msg);
              })
              blank = {
                workspaceId: this.workspace._id,
                text: text,
                index: inc,
              }
              blankUtil.createBlankData(blank);
            }
          }
          //When a blank is clicked
          else if (!text.replace( (/\○/g), "" )){
            blankUtil.destroyBlank(event, this.workspace._id)
            .then(text => {
              const textNode = document.createTextNode(text);
              range.insertNode(textNode);
              this.workspace.contents = document.querySelector('.contents > p').innerHTML;  
              // api.Card.update(this.workspace._id, this.workspace).then(res => {
              //   console.log(res.msg);
              // })
            })
          }
          clearTimeout(this.timer);
          this.clicks = 0;
        }         
      }
    },  
  },
  data () {
    return {
      workspace: {
        _id: "",
        title: "",
        contents: "",
        length: "",
        createdAt: "",
        lastSavedAt: "",
        lastIndex: 0
      },
      delay: 500,
      clicks: 0,
      timer: null,
      editable: false
    }
  },
  created () {
    api.Card.one(this.$route.params.id).then(workspace => {
      this.workspace = workspace;
    })
  }
}
</script>

<style scoped>
  .edit {
    height: 2em;
    margin: 1.5em;
  }
  .workspace {
    margin-top: 9em;
  }
  .container {
    border: ridge rgba(0,0,0,.5) 1px;
    margin-top: 2em;
    text-align: start;
    width: 90vw;
    min-height: 90vh;
  }
  small {
    font-size: 0.3em;
    vertical-align: top;
  }
  .contents {
    white-space: pre-wrap;
    font-weight: bold;
  }
  p[contenteditable="true"] {
    outline: none;
  }
</style>
