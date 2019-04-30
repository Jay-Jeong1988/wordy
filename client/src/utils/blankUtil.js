const { api } = require('../api');
export const blankUtil = { 
    destroyBlank (event, workspaceId) {
        if (event.target.nodeName === "SPAN") {

            const index = parseInt(event.target.dataset.index);
            event.target.remove();
            return api.Blank.one(workspaceId, index).then(res => {
                return res.text;
            })
            // return api.Blank.destroy(workspaceId, index).then(res => {
            //     // console.log(res.msg);
            //     return res.result.text;
            // })
        }
    },
    // createIndexNode (index) {
    //     let indexEl = document.createElement("small");
    //     indexEl.style.verticalAlign = "top";
    //     indexEl.style.fontSize = "0.3em";
    //     indexEl.setAttribute("contenteditable", false);
    //     indexEl.innerText = index + 1;
    //     return indexEl;
    // },
    convertToBlank (text) {
        const regex = (/[0-9,a-z,A-Z,ㄱ-ㅎ,가-힣]/g);
        let textForDisplay = text.replace(regex, "○");
        return textForDisplay;
    },
    isTextOnly (text) {
        return !(/[`@!~#$%^&,.\/\-*()_=+\[\]{}?<>:;""'']/g).test(text) && !!text.replace(/[0-9]/g, "");
    },
    replaceWithBlankNode (range, textNode, inc) {
        let node = document.createElement("span");
        node.appendChild(textNode);
        node.dataset.index = inc;
        // node.appendChild(indexNode);
        range.deleteContents();
        range.insertNode(node);
    },
    createBlankData (blank) {
        api.Blank.create(blank).then(res => {
            return;
        })
    }
}