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
    }

    let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])


   




































})