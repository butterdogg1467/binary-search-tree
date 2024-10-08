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
                return this.root
            }
            
            let curr = this.root

            if (value === this.root.data) {
                let parent = this.root
                if (this.root.right !== null && this.root.left === null) {
                    this.root = this.root.right
                    this.prettyPrint(this.root)
                    return
                } else if (this.root.right === null && this.root.left !== null) {
                    this.root = this.root.left
                    this.prettyPrint(this.root)
                    return
                } else if (this.root !== null && 
                    this.root.right !== null && 
                    this.root.left !== null && 
                    this.root.right.right === null && 
                    this.root.right.left === null && 
                    this.root.left.right === null && 
                    this.root.left.left === null) {

                    this.root.data = this.root.right.data
                    this.root.right = null
                    this.prettyPrint(this.root)

                    return

                } else if (this.root.right !== null && this.root.left !== null){
                    curr = this.root.right
                        while (curr.left !== null) {
                            parent = curr
                            curr = curr.left
                            if (curr.right === null){
                                this.root.data = curr.data
                            }
                        }

                        if (parent.left === curr) { 
                            parent.left = curr.right;  
                        } else if (parent.right === curr) { 
                            parent.right = curr.right;
                        }


                        this.prettyPrint(this.root)
                        return
                } 
            }

            let parent = null
            while (curr !== null && curr.data !== value) {
                if (value > curr.data) {
                    parent = curr
                    curr = curr.right
                    if (curr.data === value && curr.left === null && curr.right === null) {
                        parent.right = null
                        this.prettyPrint(this.root)
                        return

                    } else if (curr.data === value && curr.left !== null && curr.right === null) {

                        if (curr === parent.left) {
                            parent.left = curr.left
                            curr.left = null
                            this.prettyPrint(this.root)
                            return
                        } else if (curr === parent.right) {
                            parent.right = curr.left
                            curr.left = null
                            this.prettyPrint(this.root)
                            return
                        }

                    } else if (curr.data === value && curr.right !== null && curr.left === null) {
                        if (curr === parent.left) {
                            parent.left = curr.right
                            curr.right = null
                            this.prettyPrint(this.root)
                            return
                        } else if (curr === parent.right) {
                            parent.right = curr.right
                            curr.right = null
                            this.prettyPrint(this.root)
                            return
                        }

                    } else if (curr.data === value && curr.left !== null && curr.right !== null && value !== this.root) {
                        let nodeToBeRemoved = curr
                        curr = curr.right
                        while (curr.left !== null) {
                            parent = curr
                            curr = curr.left
                            if (curr.right === null){
                                nodeToBeRemoved.data = curr.data

                                if (parent.left === curr){
                                    parent.left = curr.right
                                } else if (parent.right === curr) {
                                    parent.right = curr.right
                                }
                            }
                        }
                        this.prettyPrint(this.root)
                        return

                    } 


                } else if (value < curr.data) {

                    
                    parent = curr
                    curr = curr.left
                    if (curr.data === value && curr.left === null && curr.right === null) {
                        parent.left = null
                        this.prettyPrint(this.root)
                        return

                    } else if (curr.data === value && curr.left !== null && curr.right === null) {

                        if (curr === parent.left) {
                            parent.left = curr.left
                            curr.left = null
                            this.prettyPrint(this.root)
                            return
                        } else if (curr === parent.right) {
                            parent.right = curr.left
                            curr.left = null
                            this.prettyPrint(this.root)
                            return
                        }

                    } else if (curr.data === value && curr.right !== null && curr.left === null) {
                        if (curr === parent.left) {
                            parent.left = curr.right
                            curr.right = null
                            this.prettyPrint(this.root)
                            return
                        } else if (curr === parent.right) {
                            parent.right = curr.right
                            curr.right = null
                            this.prettyPrint(this.root)
                            return
                        }

                    } else if (curr.data === value && curr.left !== null && curr.right !== null && value !== this.root) {
                        let nodeToBeRemoved = curr
                        curr = curr.right
                        while (curr.left !== null) {
                            parent = curr
                            curr = curr.left
                            if (curr.right === null){
                                nodeToBeRemoved.data = curr.data

                                if (parent.left === curr){
                                    parent.left = curr.right
                                } else if (parent.right === curr) {
                                    parent.right = curr.right
                                }
                            }
                        }
                        this.prettyPrint(this.root)
                        return

                    } 
                }

            }
            
        }

        find (value) {
            let curr = this.root

            if (this.root === null){
                console.log('Root is null')
                return 
            }
            
            if (value === this.root.data) {
                console.log(this.root)
                return
            } else if (value !== this.root.data) {
                while (value !== curr.data) {
                    if (value > curr.data) {
                        if (curr.right !== null) {
                            curr = curr.right
                        } 
                    } else if (value < curr.data) {
                        if (curr.left !== null) {
                            curr = curr.left
                        } 
                    }

                   if (curr.data === value && curr !== null){
                        console.log(curr)
                        return curr
                    }

                    if (curr.left === null && curr.right === null && curr !== value) {
                        console.log('Value not found')
                        return
                    }
                }
            }     
        }

        levelOrder(callback) {
            if (!callback){
                throw new Error('Callback is required!')
            }
            let curr = this.root
            let queue = []
            let results = []

            queue.push(curr)
            while (queue.length > 0) {
                let subarray = []
                let length = queue.length
                for (let i = 0; i < length; i++) {
                    curr = queue.shift()
                    callback(curr)
                    subarray.push(curr.data)
                    if (curr.left){
                        queue.push(curr.left)
                    } if (curr.right){
                        queue.push(curr.right)
                    }   
                }
                results.push(subarray)
            }
            console.log({results})
            return results
        }

        inOrder(callback) {
            if (!callback){
                throw new Error('Callback is required!')
            }
            if (this.root === null){
                return
            }

            let stack = []
            let results = []
            let curr = this.root
            while (curr !== null || stack.length > 0) {
                while (curr !== null){
                    stack.push(curr)
                    curr = curr.left
                }
                let popped = stack.pop()
                callback(popped)
                results.push(popped)
                if (popped.right !== null){
                    curr = popped.right
                }
            }
            return results
        }

        preOrder(callback) {
            if (!callback){
                throw new Error('Callback is required!')
            }
            if (this.root === null) {
                return
            }

            let stack = []
            let curr = this.root
            stack.push(curr)

            while (stack.length > 0) {
                let popped = stack.pop()
                callback(popped)
                if (popped.left && popped.right) {
                    stack.push(popped.right)
                    stack.push(popped.left)
                } else if (popped.right) {
                    stack.push(popped.right)
                } else if (popped.left) {
                    stack.push(popped.left)
                } 
            }
        }

        postOrder(callback) {
            if (!callback){
                throw new Error('Callback is required!')
            }
            if (this.root === null) {
                return
            }

            let stack = []
            let outputStack = []
            let curr = this.root
            stack.push(curr)
            
            while (stack.length > 0) {
                let popped = stack.pop()
                outputStack.push(popped)
                if (popped.left && popped.right) {
                    stack.push(popped.left)
                    stack.push(popped.right)
                } else if (popped.left) {
                    stack.push(popped.left)
                } else if (popped.right) {
                    stack.push(popped.right)
                } 
            }

            while (outputStack.length > 0) {
                let poppedOutput = outputStack.pop()
                callback(poppedOutput)
            }
        }


        height(node){
            if (!node){
                throw new Error('Node is required!')
            }

            if (this.root === null) {
                return
            }

            let curr = this.root
            let height
            let nodeFound

            
            while (curr.data !== node) {
                if (node > curr.data) {
                    curr = curr.right
                } else if (node < curr.data) {
                    curr = curr.left
                }
            }

            if (curr.data === node) {
                nodeFound = curr
                console.log(nodeFound)
            }

            height = findHeight(nodeFound)
            console.log({height})

            return height

        }

        depth(node) {
            if (!node){
                throw new Error('Node is required!')
            }

            if (this.root === null) {
                return
            }

            let curr = this.root
            let depth = 0
            let nodeFound

            
            while (curr.data !== node) {
                if (node > curr.data) {
                    curr = curr.right
                    depth += 1
                } else if (node < curr.data) {
                    curr = curr.left
                    depth += 1
                }
            }

            if (curr.data === node) {
                nodeFound = curr
                console.log(nodeFound)
            }

            console.log({depth})
            return depth
        }

        isBalanced() {
            if (this.root === null) {
                return
            }

            console.log(isBalancedCheck(this.root))

        }

        rebalance() {
            if (this.root === null) {
                return
            }

            let values = []

            this.inOrder(node => {
                values.push(node.data)
            })

            let newTree = new Tree(values)

            this.root = newTree.root

        }


    }

    function isBalancedCheck(node) {
        if (node === null) {
            return {isBalanced: true, height: -1}
        }

        let left = isBalancedCheck(node.left)
        let right = isBalancedCheck(node.right)

        if (!left.isBalanced || !right.isBalanced) {
            return {isBalanced: false, height: -1}
        }

        if (Math.abs(left.height - right.height) > 1) {
            return {isBalanced: false, height: -1}
        }

        let currentNodeHeight = 1 + Math.max(left.height, right.height)

        return { isBalanced: 'true', height: currentNodeHeight }

    }

    function findHeight(curr) {
        if (curr === null) {
            return -1
        }

        let leftHeight = findHeight(curr.left)
        let rightHeight = findHeight(curr.right)

        let maxHeight = Math.max(leftHeight, rightHeight)
        let currentNodeHeight = maxHeight + 1

        return currentNodeHeight
    }

    function calledBack(value){
        console.log(value.data + ' is the value')
        return
    }

    function nothing() {
        return
    }

    function extractNodeData(node) {
        return node.data;
    }

    // let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

    // test.insert(10)

    // test.remove(8)

    // test.find(67)

    // test.levelOrder(console.log)

    // test.inOrder(calledBack)

    // test.preOrder(calledBack)   

    // test.postOrder(calledBack)

    // test.height(3)
    
    // test.depth(3)

    // test.isBalanced()

    // test.rebalance()

    // test.isBalanced()


    
    function driver(length = 100) {
        let randomArray = []

        for (let i = 0; randomArray.length < length; i++) {
            let randomNum = Math.floor(Math.random() * length)
            randomArray.push(randomNum)
        }

        let tree = new Tree(randomArray)

        tree.isBalanced()

        tree.levelOrder(calledBack)
        console.log('----------------')

        tree.preOrder(calledBack)
        console.log('----------------')   

        tree.postOrder(calledBack)
        console.log('----------------')

        tree.inOrder(calledBack)
        console.log('----------------')

        let results = []

        tree.inOrder(node => {
            results.push(node.data)
        })

        for (let i = 0; i < 10; i++) {
            let randomNumAdded = Math.floor(Math.random() * 10)
            if (!results.includes(randomNumAdded)) {
                tree.insert(randomNumAdded)
                results.push(randomNumAdded)
            }
        }

        tree.isBalanced()

        tree.rebalance()

        tree.isBalanced()

        tree.levelOrder(calledBack)
        console.log('----------------')

        tree.preOrder(calledBack)
        console.log('----------------')   

        tree.postOrder(calledBack)
        console.log('----------------')

        tree.inOrder(calledBack)
        console.log('----------------')
    }



    driver()

































})