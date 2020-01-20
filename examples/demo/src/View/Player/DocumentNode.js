class DocumentNode {
    constructor(documentContainer) {
        this.isAttached = true;
        this.documentContainer = documentContainer;
        this.documentElementIndex = [];
        this.documentsCollection = {};
        this.afterAttachCallbacks = [];
        this.styleRuleNodes = {};
    }

    detach() {}

    attach() {}
    write() {}
    getDocumentElement(index) {
        return this.documentElementIndex[index];
    }
    getNode() {}
    prepend() {}
    replaceDocumentElement() {}
    replaceDocType() {}
    insertAfter() {}
    removeNode() {}
    traverseNode() {}
    traverseDocuments() {}
    getNodeOffset() {}
    createElement() {}
    setAttribute() {}
    getNodePropertyObject() {}
    getFrameElementIds() {}

    _removeDocumentElement(doc) {
        const element = doc.documentElement;
        if (element) {
            doc.removeChild(element);
        }
    }
}
