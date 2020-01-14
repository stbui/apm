function Node(data) {
    this.data = data;
    this.parent = null;
    this.childNodes = [];
}

function Tree(data) {
    let node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
    const recurse = currentNode => {
        for (let i = 0; i < currentNode.childNodes.length; i++) {
            recurse(currentNode.childNodes[i]);
        }
        callback(currentNode);
    };

    recurse(this._root);

    // (function recurse(currentNode) {
    //     for (let i = 0; i < currentNode.childNodes.length; i++) {
    //         recurse(currentNode.childNodes[i]);
    //     }
    //     callback(currentNode);
    // })(this._root);
};

Tree.prototype.traverseBF = function(callback) {
    let queue = [];
    queue.push(this._root);
    let currentNode = queue.shift();

    while (currentNode) {
        for (let i = 0; i < currentNode.childNodes.length; i++) {
            queue.push(currentNode.childNodes[i]);
        }

        callback(currentNode);
        currentNode = queue.shift();
    }
};

Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
    let child = new Node(data);
    let parent = null;
    let callback = node => {
        if (node.data === toData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        parent.childNodes.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent');
    }
};

Tree.prototype.remove = function(data, traversal) {
    let nodeToRemove = null;

    let callback = node => {
        if (node.id === data) {
            nodeToRemove = node;
        }
    };

    this.contains(callback, traversal);

    if (nodeToRemove) {
        let parent = nodeToRemove.parent;
        let index;

        for (let i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].data === data) {
                index = i;
            }
        }

        parent.childNodes.splice(index, 1);
        nodeToRemove.parent = null;
    } else {
        throw new Error('Cannot remove a non-existent node');
    }

    return nodeToRemove;
};

export default Tree;
