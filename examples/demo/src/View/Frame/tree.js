function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
    (function recurse(currentNode) {
        for (var i = 0; i < currentNode.children.length; i++) {
            recurse(currentNode.children[i]);
        }
        callback(currentNode);
    })(this._root);
};

Tree.prototype.traverseBF = function(callback) {
    var queue = [];
    queue.push(this._root);
    var currentNode = queue.shift();

    while (currentNode) {
        for (var i = 0; i < currentNode.children.length; i++) {
            queue.push(currentNode.children[i]);
        }

        callback(currentNode);
        currentNode = queue.shift();
    }
};

Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data);
    var parent = null;
    var callback = function(node) {
        if (node.data === toData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent');
    }
};

Tree.prototype.remove = function(data, traversal) {
    var nodeToRemove = null;

    var callback = function(node) {
        if (node.data === data) {
            nodeToRemove = node;
        }
    };

    this.contains(callback, traversal);

    if (nodeToRemove) {
        var parent = nodeToRemove.parent;
        var index;

        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i].data === data) {
                index = i;
            }
        }

        parent.children.splice(index, 1);
        nodeToRemove.parent = null;
    } else {
        throw new Error('Cannot remove a non-existent node');
    }

    return nodeToRemove;
};

export default Tree;
