// 1. Given the data 3,1,4,6,9,2,5,7 make a BST

//         5
//    3      6  7
//   2  4         9
//  1


// 2.  3    7
//    2 4   6 9 
//   1   


// 3. Create a BST Class
class BinarySearchTree {
    constructor(key= null, value=null, parent = null, ){
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        //if the tree is empty then this key being inserted is the root node of the tree
        if(this.key == null){
            this.key = key;
            this.value = value;
        } else if ( key < this.key){
            if(this.left == null){
                this.left = new BinarySearchTree(key,value, this)
            } else {
                this.left.insert(key,value);
            }
        } else {
            if(this.right == null){
                this.right = new BinarySearchTree(key,value, this)
            } else {
                this.right.insert(key,value);
            }
        }

    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
}

//4. The function is log(n)