<template>
    <div class="create">
        <BackButton></BackButton>
        <div class="buffer">
            <div class="container">
                <div class="preview" v-if="file">
                    <div class="preview-img"></div>
                    <button class="icon-rm" @click="removeFile"></button>
                    <div class="fileInfo">
                        <h5> {{ file.name }}</h5>
                        <p>File Type: {{ file.type }}</p>
                        <p>Length: {{ file.size }} characters</p>
                        <small v-if="file.size > 80000" style="color: red">Max=80,000</small>
                    </div>
                </div>
                <input class="form-control" type="text" placeholder="Title" v-model="workspace.title"/>
                <input type="file" name="textFile" accept="text/plain, application/msword, application/pdf, .docx" id="fileUpload" v-show="false" @change="showPreview"/>
                <label for="fileUpload" v-if="!file">
                    <img class="addFileImg" src="../assets/images/plus.svg" alt="file upload"/>
                    <h3>Add a File</h3>
                </label>
                <div class="errors" v-if="errors.length >= 1">
                    <small v-for="(msg, index) in errors" :key="index">{{msg}}</small>
                </div>
                <button class="btn btn-outline-primary save" v-if="file" @click="saveWorkspace">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
    import {mammothUtil} from '../utils/mammoth.js'
    import BackButton from '../components/BackButton.vue'
    import {pdfUtil} from '../utils/pdfReader.js'
    import {api} from "../api";
    export default {
        name: 'create',
        components: { BackButton },
        data () {
            return {
                file: null,
                workspace: {
                    title: '',
                    contents: '',
                    length: 0,
                },
                errors: []
            }
        },
        computed: {
        },
        methods: {
            showPreview (e) {
                const reader = new FileReader()
                this.file = e.target.files[0]
                this.workspace.length = this.file.size
                console.log(this.file.type)
                const self = this;
                if (this.file.type == "application/pdf") {
                    reader.addEventListener("load", function () {
                        var typedarray = new Uint8Array(this.result);
                        pdfUtil.extractText(typedarray).then(res => {
                            self.workspace.contents = res;
                        })
                    })
                }else if (this.file.type.includes("application/vnd.openxml")) {
                    reader.addEventListener("load", function () {
                        var typedarray = new Uint8Array(this.result);
                        mammothUtil.getText(typedarray).then(res => {
                            console.log(res)
                            self.workspace.contents = res.value;
                        })
                    })
                }else {
                    reader.addEventListener("load", function () {
                        self.workspace.contents = reader.result.toString()
                    })
                }
                if(this.file.type == "application/pdf") reader.readAsArrayBuffer(this.file)
                else if (this.file.type.includes("application/vnd.openxml")) reader.readAsArrayBuffer(this.file)
                else reader.readAsText(this.file)
            },
            removeFile () {
                const input = document.getElementById("fileUpload");
                input.value = "";
                this.file = null;
                this.workspace = {};
            },
            saveWorkspace () {
                if (localStorage.getItem('user')) this.workspace.userId = JSON.parse(localStorage.getItem('user'))._id
                if (this.file != null) {
                    this.file.size > 80000 ? 
                    alert("Text length is too long.") :
                    api.Card.create(this.workspace).then(card => {
                        console.log(card.msg);
                        if (card.created) {
                            this.$router.push("/")
                        }else {
                            if (!this.errors.includes(card.msg)) this.errors.push(card.msg)
                        }
                    })
                }
            },
            customBackButton () {
                if (this.$routerHistory.hasPrevious()) {
                    this.$router.push(this.$routerHistory.previous().path)
                } else {
                    this.$router.push('/')
                }
            }
        },
        created () {
            // pdfReader.extractText('')
        }
    }
</script>
<style scoped>
    .create {
        margin-top: 4em;
    }
    .buffer {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    .container {
        width: 70%;
        text-align: center;
    }
    label:hover {
        cursor: pointer;
    }
    label h3 {
        color: #007bff;
    }
    label h3:hover {
        text-decoration-line: underline;
        color: #007bff;
    }
    .addFileImg {
        margin-top: 2em;
        width: 70%;
        border: none;
        background-color: transparent;
    }
    input.form-control {
        text-align: center;
        width: 80%;
        margin-left: 10%;
        font-size: 1.5em;
        font-weight: bold;
    }
    .form-control::placeholder {
        color: lightgray;
        font-weight: initial;
    }
    .preview {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 .5em 0;
        position: relative;
        flex-wrap: wrap;
    }
    .preview-img { 
        width: 8em;
        height: 8em;
        background-image: url(../assets/images/edit.svg);
        background-position: center; 
        background-repeat: no-repeat; 
        background-size: cover;
    }
    .icon-rm {
        width: 3em;
        height: 3em;
        border: none;
        background-image: url(../assets/images/minus.svg);
        background-size: cover;
        background-position: center;
        background-color: transparent;
        align-self: flex-start;
    }
    h5, p {
        margin: 0.1em 0;
    }
    .fileInfo {
        text-align: left;
        max-width: 100%;
        max-height: 7em;
        word-break: break-all;
        overflow-y: -webkit-paged-x;
    }
    .save {
        margin-top: 1em;
        width: 100%;
        height: 2em;
        font-size: 2.3em;
        font-weight: bold;
    }
    .errors > small {
        color: red;
    }
</style>
