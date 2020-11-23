// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
    for(let i of categories){
        if(i.id == catId){
            return i.clues
        }
    }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function getRandom(arr, num){
    let max = arr
    if(max.length > num){
        let index = Math.floor(Math.random() * (max.length - num ) + num)
    
    return max.splice(index - num, num)
    }
    return max
}

 function fillTable() {

    categories.forEach( (val) => {
    let categoryItem = $(`<th id="${val.id}" class="red">${val.title}</th>`)
    $('#game-table thead tr').append(categoryItem)
    })
    // console.log(categories)
    
    for(let x = 0; x < 5; x++){
        let tr = $('<tr></tr>')
        for(let y = 0; y <categories.length; y++ ){
            tr.append(`<td><i id="ff" class="far fa-question-circle"></i></td>`)
        }
        $('#tbody').append(tr)
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(e) {

    //get the current element the player is clocking and the category
    let table = document.querySelector('table')
    let currentQuestion = table.rows[e.target.parentElement.rowIndex].cells[e.target.cellIndex] 
    let catId = table.rows[0].cells[e.target.cellIndex]
    //use the category id to get acces to the clues

    let question = getCategory(catId.id)
    //get the index of the question by the row number - 2
    let index = e.target.parentElement.rowIndex

    //use class to track current value
    if(!currentQuestion.className){
        currentQuestion.className = 'question'
        currentQuestion.innerHTML = `${question[index - 2].question}`
        
    }else if(currentQuestion.className === 'question'){
        currentQuestion.className = 'answer'
        currentQuestion.innerHTML = `${question[index - 2].answer}`
        
    }else if(currentQuestion.className === 'answer'){
        return
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */



async function setupAndStart() {
    let res = await axios.get(`https://jservice.io/api/categories?count=35`);
    let ranCategory = getRandom(res.data, 6)
    
    for(let category of ranCategory){
        
        let res2 = await axios.get(`https://jservice.io/api/category?id=${category.id}`)
        // console.log(res2.data)
        let{id, title, clues} = res2.data
        categories.push({id, title, clues})
    }
    fillTable()

}



/** On click of start / restart button, set up game. */
$('#start').on('click', function(){
    setupAndStart()
})

// TODO

/** On page load, add event handler for clicking clues */

// TODO
$(window).on('load', function (e) {
    e.preventDefault();
    let table = document.querySelector('#game')
    
    table.addEventListener('click', function(e){
        e.preventDefault()
        
        handleClick(e)
        // let table = document.querySelector('table')
        // let currentQuestion = table.rows[e.target.parentElement.rowIndex].cells[e.target.cellIndex]
        // let catId = table.rows[0].cells[e.target.cellIndex]
        
        // let question = getCategory(catId.id)
        // let index = e.target.parentElement.rowIndex

        // if(!currentQuestion.className){
        //     currentQuestion.className = 'question'
        //     currentQuestion.innerHTML = `${question[index - 2].question}`
            
        // }else if(currentQuestion.className === 'question'){
        //     currentQuestion.className = 'answer'
        //     currentQuestion.innerHTML = `${question[index - 2].answer}`
            
        // }else if(currentQuestion.className === 'answer'){
        //     return
        // }
        
    })
});