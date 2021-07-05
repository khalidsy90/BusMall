'use strict'
let leftImEl=document.getElementById('leftImag')
let midImEl=document.getElementById('midImage')
let rightImEl=document.getElementById('rightImage')

let imagesName=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']

let images=[]
let attempts=0
let namesItem=[]
let votes=[]
let seen=[]
function BusMall(imageName)
{
this.imageName=imageName.split('.')[0];
namesItem.push(this.imageName)
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

     
    let arrIndex=new Array()
    let newarr=[]

    function generateRandomImg(){   
      let currentIndexes=[leftIndex,midIndex,rightIndex]
      if(newarr.length >0)
      {
      for (let i = 0; i < newarr.length; i++) 
        {
            for (let x = 0; x < currentIndexes.length; x++) {                
                if(newarr[i] == currentIndexes[x])
                {
                    leftIndex=randomIndex()
                    midIndex=randomIndex()
                    rightIndex=randomIndex()
                    generateRandomImg()                  
                    i=newarr.length
                    break
                }
            }
        }
        currentIndexes.length=0
      }
        arrIndex.push(leftIndex,midIndex,rightIndex)

        newarr=arrIndex.slice(arrIndex.length-3,arrIndex.length)

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
        let lst=document.getElementById('info')
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
            if(lst.childElementCount == images.length) return
            for (let i = 0; i < images.length; i++) {
                    let liEl=document.createElement('li')
                    liEl.setAttribute('class','list-group-item')
                    liEl.textContent = `Picture : ${images[i].imageName} has ${images[i].vote} votes,${images[i].views} views`
                    votes.push(images[i].vote)
                    seen.push(images[i].views)
                    lst.appendChild(liEl)
            }
            handleChart()
        }
    }

function handleChart(){
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:namesItem,
        datasets: [{
            label: 'Votes',
            data: votes,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },{
            label: 'Views',
            data: seen,
            backgroundColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})};
