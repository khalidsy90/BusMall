'use strict'
let leftImEl=document.getElementById('leftImag')
let midImEl=document.getElementById('midImage')
let rightImEl=document.getElementById('rightImage')

let imagesName=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']
let lst=document.getElementById('info')

let images=[]
let attempts=0
let namesItem=[]
let votes=[]
let seen=[]

// readData()
BusMall.LocStore=[]
function BusMall(imageName)
{
this.imageName=imageName.split('.')[0];
namesItem.push(this.imageName)
this.img='css/assets/'+imageName;
this.vote=0
this.views=0
images.push(this)
BusMall.LocStore.push(this)

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

    generateRandomImg()

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
    }

    images[leftIndex].views++
    images[midIndex].views++
    images[rightIndex].views++

    function handlevevnt(event){
        attempts++
        if(attempts ==1){
            images[leftIndex].views--
            images[midIndex].views--
            images[rightIndex].views--
        }
        images[leftIndex].views++
        images[midIndex].views++
        images[rightIndex].views++
      
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
            renderSurvey()
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
})

};

function renderSurvey(){
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
    storeData()
    gotoBottom()
}
function gotoBottom(){
    let element = document.getElementById('myChart');
    element.scrollIntoView()
 }

 function storeData(){
     localStorage.setItem('data',JSON.stringify(BusMall.LocStore))
 }
 function readData(){
     let data=JSON.parse(localStorage.getItem('data'))
     let newData=data
    if(data !== null){
       for (let i = 0; i < images.length; i++) {
        BusMall.LocStore[i].vote =newData[i].vote
        BusMall.LocStore[i].views = newData[i].views   
       }
    }
 }

 readData()

 console.log(images);
 console.log(BusMall.LocStore);