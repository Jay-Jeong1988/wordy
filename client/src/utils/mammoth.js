var mammoth = require('mammoth');

export const mammothUtil = {
    getText (arrayBuffer) {
        return mammoth.convertToHtml({arrayBuffer: arrayBuffer})
    }
}