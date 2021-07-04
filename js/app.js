'use strict'
let leftImEl=document.getElementById('leftImag')
let midImEl=document.getElementById('midImage')
let rightImEl=document.getElementById('rightImage')

let imagesName=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']

let images=[]
let attempts=0
function BusMall(imageName)
{
this.imageName=imageName.split('.')[0];
this.img='css/assets/'+imageName;
this.vote=0
this.views=0
images.push(this)
}

    for (let i = 0; i < imagesName.length; i++) 
    {
        new BusMall(imagesName[i])
    }
    
     function randomIndex(){
       return Math.floor(Math.random() * imagesName.length)
     }

     let leftIndex=randomIndex()
     let midIndex=randomIndex()
     let rightIndex=randomIndex()

    function generateRandomImg(){
        leftIndex=randomIndex()
        midIndex=randomIndex()
        rightIndex=randomIndex()

        leftImEl.setAttribute('src',images[leftIndex].img)
        midImEl.setAttribute('src',images[midIndex].img)
        rightImEl.setAttribute('src',images[rightIndex].img)

        while (leftIndex == midIndex || leftIndex == rightIndex || midIndex==rightIndex || midIndex == leftIndex ) 
        {
            leftIndex=randomIndex()
            midIndex=randomIndex()
            rightIndex=randomIndex()
            generateRandomImg()
        }
        images[leftIndex].views++
        images[midIndex].views++
        images[rightIndex].views++
    }

    generateRandomImg()

    function handlevevnt(event){
        attempts++
        if(attempts <= imagesName.length){
            let cuurentItem=event.target.id;
            if(cuurentItem == 'leftImag'){
                images[leftIndex].vote++
            }
            else if(cuurentItem == 'midImage'){
                images[midIndex].vote++
            }
            else if(cuurentItem == 'rightImage'){
                images[rightIndex].vote++
            }
            generateRandomImg()
        }
        else{
            let lst=document.getElementById('info')
            for (let i = 0; i < images.length; i++) {
                    let liEl=document.createElement('li')
                    liEl.setAttribute('class','list-group-item')
                    if(i%2==0){
                        liEl.setAttribute('background-color','black') 
                    }
                    liEl.textContent = `Picture : ${images[i].imageName} has ${images[i].vote} votes,${images[i].views} views`
                    lst.appendChild(liEl)
            }
        }
       
        
    }
