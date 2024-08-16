document.addEventListener('DOMContentLoaded', function(){

    class Node {
        constructor(data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }


    class Tree {
        constructor(arr){
            this.root = this.buildTree(arr)
            this.prettyPrint(this.root)
        }

        buildTree(arr) {

            if (arr.length === 0){
                return null
            } else if (arr.length === 1) {
                return new Node (arr[0])
            } else {
                let setArr = new Set(arr)
                let setArrToArr = Array.from(setArr)
                let sortedArr = setArrToArr.sort((a, b) => a-b)
    
                let start = sortedArr[0]
                let length = sortedArr.length
                let end = length
                let middle = (0 + end) / 2
                let root = Math.floor(middle)

                let rootNode = new Node(sortedArr[root])
    
                let leftHalf = sortedArr.slice(0, root)
                let rightHalf = sortedArr.slice(root + 1, end)
    
                // console.log({sortedArr})
                // console.log({leftHalf})
                // console.log({rightHalf})
                // console.log({root})
                // console.log({rootNode})

                rootNode.left = this.buildTree(leftHalf)
                rootNode.right = this.buildTree(rightHalf)
                

                return rootNode
            }
        }

        prettyPrint = (node, prefix = "", isLeft = true) => {
            if (node === null) {
              return;
            }
            if (node.right !== null) {
              this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left !== null) {
              this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
          };

        insert (value) {
            let curr = this.root

            if (this.root === null) {
                this.root = new Node(value)
                return this.root
            }

            while (true) {
                if (value > curr.data) {
                    if (curr.right !== null) {
                        curr = curr.right
                    } else {
                        curr.right = new Node(value)
                        this.prettyPrint(this.root)
                        return curr.right
                    }
                } else if (value < curr.data){
                    if (curr.left !== null) {
                            curr = curr.left
                    } else {
                        curr.left = new Node(value)
                        this.prettyPrint(this.root)
                        return curr.left
                    }
                }
            }
        }

        remove (value) {
            if (this.root === null) {
                return root
            }
            
            let curr = this.root
            let parent = null
            while (curr !== null && curr.data !== value) {
                if (value > curr.data) {
                    parent = curr
                    curr = curr.right
                    if (curr.data === value && curr.left === null && curr.right === null) {
                        parent.right = null
                        this.prettyPrint(this.root)
                        return
                    } else if (curr.data === value && curr.left !== null) {
                        parent.left = curr.left
                        curr.left = null
                        this.prettyPrint(this.root)
                        return
                    } else if (curr.data === value && curr.right !== null) {
                        parent.right = curr.right
                        curr.right = null
                        this.prettyPrint(this.root)
                        return
                    }
                    console.log(curr.data)
                } else if (value < curr.data) {
                    parent = curr
                    curr = curr.left
                    if (curr.data === value && curr.left === null && curr.right === null) {
                        parent.left = null
                        this.prettyPrint(this.root)
                        return
                    } else if (curr.data === value && curr.left !== null) {
                        parent.left = curr.left
                        curr.left = null
                        this.prettyPrint(this.root)
                        return
                    } else if (curr.data === value && curr.right !== null) {
                        parent.right = curr.right
                        curr.right = null
                        this.prettyPrint(this.root)
                        return
                    }
                }

            }
            
        }

    }

    let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

    // test.insert(10)

    // test.remove(3)


   




































})