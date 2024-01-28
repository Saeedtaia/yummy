/// <reference types="../@types/jquery"/>
//nav bar move
const item = document.querySelector('.items');
const reloadchild = document.querySelector('#childReload')
const child = item.children[0];
$('#navPop').on('click',function(e){
    $(child).next().next().next().next().stop(true ,true)
    $(child).next().next().next().stop(true ,true)
    $(child).next().next().stop(true ,true);
    $(child).next().stop(true ,true)
    $(child).stop(true ,true)
    $('nav').animate({left: '0px'},700, function(){
        $(child).animate({top:'0' },500,function(params) {
            $(child).next().animate({top:'0' },500,function(params) {
                $(child).next().next().animate({top:'0' },500,function(params) {
                    $(child).next().next().next().animate({top:'0' },500,function(params) {
                        $(child).next().next().next().next().animate({top:'0' },500)
                    })
                })
            })
        })
    });
    $('#navClose').removeClass('d-none');
    $('#navPop').addClass('d-none');
})
$('#navClose').on('click', function(e){
    closeNavBar()
});
function closeNavBar(){
    $('nav').animate({left: '-255px'},600);
    $('#navClose').addClass('d-none');
    $('#navPop').removeClass('d-none');
    $(child).stop(true ,true)
    $(child).next().stop(true ,true)
    $(child).next().next().stop(true ,true);
    $(child).next().next().next().stop(true ,true)
    $(child).next().next().next().next().stop(true ,true)
    $(child).next().next().next().next().animate({top:'200px'},1000)
    $(child).next().next().next().animate({top:'200px'},1000)
    $(child).next().next().animate({top:'200px'},1000)
    $(child).next().animate({top:'200px'},1000)
    $(child).animate({top:'200px'},1000)

}
//end of nav bar move

// display data
const firstFrame = document.querySelector('#firstFrame')
const firstReload = document.querySelector('#firstReload')
async function getFirstData(){
    $('#firstFrame').removeClass('d-none')
    const firstData=[  52977,  53065, 53060, 53069, 53026, 52978,    52948, 52844, 52845, 52971, 53013,    52804, 53027, 52785, 52929, 52769,    52802, 52906, 53028, 52887, 52980,    53006, 52963, 52931, 52811];
    firstFrame.classList.add('overflow-hidden');
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    for (let i = 0; i < firstData.length; i++) {
        const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${firstData[i]}`);
        const result = await respons.json();
        displaydata(result.meals[0].strMealThumb, result.meals[0].strMeal)
        firstReload.classList.remove('d-flex');
        firstReload.classList.add('d-none');
        firstFrame.classList.remove('overflow-hidden');
        firstFrame.classList.add('overflow-hidden');
    }
}
getFirstData();
function displaydata(src , p) {
    $('.firstData').append(`
        <div class="col-md-3 more overflow-hidden">
                <div onclick="test(this)" class=" position-relative mainmeal rounded-3 overflow-hidden courser-pointer">
                        <img src="${src}" class="w-100" alt="">
                        <div class="position-absolute bg-white start-0 end-0 bottom-0 bg-opacity-75 move d-flex flex-column justify-content-center">
                        <p class="text-start ps-3 fs-4 fw-bold">${p}</p>
                    </div>
                </div>
            </div>
        `);
        
    reloadchild.classList.add('d-none');
    reloadchild.classList.remove('d-flex');
}
async function test(div){
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    closeNavBar()
  const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${div.lastElementChild.firstElementChild.innerHTML}`);
  const result = await respons.json();
  displayDetails(result)
}
function displayDetails(result) {
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    const deatelsShow = document.querySelector('#detailsShow .row').innerHTML = ""
    $('#detailsShow .row').append(`
    <div class="col-md-4">
              <img src="${result.meals[0].strMealThumb}" class="w-100 rounded-3" alt="">
              <p class="text-white text-capitalize mt-2 fs-3 fw-bold">${result.meals[0].strMeal}</p>
            </div>
            <div class="col-md-8">
              <p class="text-white py-2 fs-3 fw-bold">Instructions</p>
              <p class="text-white py-2">${result.meals[0].strInstructions}</p>
              <p class="text-white"><span class="fw-bold fs-3">Area :</span> <span class="fs-4 ps-2 fw-bold">${result.meals[0].strArea}</span></p>
              <p class="text-white"><span class="fw-bold fs-3">Category :</span> <span class="fs-4 ps-2 fw-bold">${result.meals[0].strCategory}</span></p>
              <p class=""><span class="text-white fw-bold fs-3">Recips :</span></p>
              <div>
              <ul class="tags d-flex flex-wrap g-3 list-unstyled"></ul>
              </div>
              <p class=""><span class="text-white fw-bold fs-4">Tags :</span></p>
              <div class="d-flex justify-content-start">
                <a target="_blank" href="${result.meals[0].strSource}" class="btn btn-success me-1">Source</a>
                <a target="_blank" href="${result.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
              </div>
            </div>
    `)
    //=>impostant way for make loop with object that you want mor propirties from it
        for (let i = 1; i <= 20; i++) {
            if (result.meals[0][`strIngredient${i}`] != "") {
                $('.tags').append(`
                    <li class="alert alert-info m-2 p-1">${result.meals[0][`strMeasure${i}`]} ${result.meals[0][`strIngredient${i}`]}</li>
                `);
            }
        }
  $('#firstFrame').addClass('d-none')
  $('#detailsShow').removeClass('d-none');
  $(window).scrollTop(0)
  firstReload.classList.add('d-none');
    firstReload.classList.remove('d-flex');

};
$('#backToHome').on('click', function(){
    $('#detailsShow').addClass('d-none');
    $('#firstFrame').removeClass('d-none');
});
//=.search
$('#searchPart').on('click',function (params) {
    $('#IngredientsPart').addClass('d-none');
    closeNavBar()
    $('#firstFrame').addClass('d-none')
    $('#categoryPart').addClass('d-none')
    $('#areaPart').addClass('d-none')
    $('#contactUsPart').addClass('d-none');
    $('#search').removeClass('d-none')
});
$('#SearchByName').on('keyup', function(e){
    const searchData = document.querySelector('.searchData').innerHTML=""
    const searchDataByLetter = document.querySelector('#SearchByLetter').value=""
    let name= this.value;
    if(name !== ""){
    getNameSearchData(name)
    }
});
async function getNameSearchData(name) {
    const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const data = await respons.json();
    for (let i = 0; i < data.meals.length; i++) {
        displaydataSearch(data.meals[i].strMealThumb, data.meals[i].strMeal)
        console.log('data');
    }
}
$('#SearchByLetter').on('keyup', function(e){
    const searchData = document.querySelector('.searchData').innerHTML=""
    let letter= this.value
    if(letter.length == 1){
        getNameSearchDataLetter(letter)
    }
});
async function getNameSearchDataLetter(letter) {
    if(letter!= ""){
        const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        const data = await respons.json();
        console.log(data);
        for (let i = 0; i < data.meals.length; i++) {
            displaydataSearch(data.meals[i].strMealThumb, data.meals[i].strMeal)
        }
    }
}
function displaydataSearch(src , p) {
    $('.searchData').append(`
        <div class="col-md-3 more overflow-hidden">
                <div onclick="test(this)" class=" position-relative mainmeal rounded-3 overflow-hidden courser-pointer">
                        <img src="${src}" class="w-100" alt="">
                        <div class="position-absolute bg-white start-0 end-0 bottom-0 bg-opacity-75 move d-flex flex-column justify-content-center">
                        <p class="text-start ps-3 fs-4 fw-bold">${p}</p>
                    </div>
                </div>
            </div>
        `);
}
//=> categories
$('#category').on('click',function (e) {
    $('#IngredientsPart').addClass('d-none');
    closeNavBar()
    $('#firstFrame').addClass('d-none');
    $('#contactUsPart').addClass('d-none');
    $('#search').addClass('d-none')
    $('#areaPart').addClass('d-none')
    $('#categoryPart').removeClass('d-none');
})
fullCategory()
async function fullCategory(){
    const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data = await respons.json();
    for(let i = 0; i < data.categories.length; i++){
        categoryData(data.categories[i].strCategory, getFirst20Words(data.categories[i].strCategoryDescription  ),data.categories[i].strCategoryThumb)
    }
}
function getFirst20Words(inputString) {
    const words = inputString.split(/\s+/);
    const first20Words = words.slice(0, 20);
    const result = first20Words.join(' ');
    return result;
}
function categoryData(strCategory,strCategoryDescription,strCategoryThumb) {
    $('.categoryData').append(`
    <div class="col-md-3 overflow-hidden">
    <div onclick="mainIngredients(this)" class=" position-relative mainmeal rounded-3 overflow-hidden courser-pointer">
            <img src="${strCategoryThumb}" class="w-100" alt="">
            <div class="position-absolute bg-white start-0 end-0 bottom-0 bg-opacity-75 move d-flex flex-column justify-content-center">
            <div>
            <p class="text-start ps-3 mb-3 fs-4 fw-bold">${strCategory}</p>
            <p class="text-start ps-3">${strCategoryDescription}</p></div>
        </div>
    </div>
</div>
    `)
}
async function mainIngredients(main){
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${main.lastElementChild.firstElementChild.firstElementChild.innerHTML}`)
    const data = await respons.json()
    // console.log(data);
    const row =document.querySelector('.firstData').innerHTML=""
    for (let i = 0; i < data.meals.length; i++) {
    displaydata(data.meals[i].strMealThumb, data.meals[i].strMeal)
    }
    $('#categoryPart').addClass('d-none')
    $('#firstFrame').removeClass('d-none');
    firstReload.classList.add('d-none');
    firstReload.classList.remove('d-flex');
}

//=> Area 
$('#area').on('click', function(){
    closeNavBar()
    $('#firstFrame').addClass('d-none');
    $('#search').addClass('d-none')
    $('#categoryPart').addClass('d-none');
    $('#IngredientsPart').addClass('d-none');
    $('#contactUsPart').addClass('d-none');
    $('#areaPart').removeClass('d-none')
})
displayErea();
async function displayErea(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data =await response.json();
    for(let i=0; i<data.meals.length; i++){
        $('.areaData').append(`
    <div class="col-md-3 text-white">
    <div onclick="getAreaMeals(this)" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data.meals[i].strArea}</h3>
    </div>
    </div>
    `)
}
}
async function getAreaMeals(country){
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country.lastElementChild.innerHTML}`)
    const data =await response.json();
    console.log(data);
    areaApendedData(data)
}
function areaApendedData(data){
    const row =document.querySelector('.firstData').innerHTML=""
    for (let i = 0; i < data.meals.length; i++) {
    displaydata(data.meals[i].strMealThumb, data.meals[i].strMeal)
    }
    $('#areaPart').addClass('d-none')
    $('#firstFrame').removeClass('d-none');
    firstReload.classList.add('d-none');
    firstReload.classList.remove('d-flex');
}

//=>Ingredients
$('#Ingredients').on('click', function(){
    closeNavBar()
    $('#firstFrame').addClass('d-none');
    $('#search').addClass('d-none')
    $('#categoryPart').addClass('d-none');
    $('#areaPart').addClass('d-none')
    $('#contactUsPart').addClass('d-none');
    $('#IngredientsPart').removeClass('d-none');
})
displayIngredientsPart()
async function displayIngredientsPart(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const data =await response.json();
    // console.log(data);
    apendIngredients(data)
}
function apendIngredients(data){
    //20
    for(let i=0; i<20; i++){
        $('.IngredientsPartData').append(`
        <div class="col-md-3 text-white">
        <div onclick="displayIngredientDetails(this)" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data.meals[i].strIngredient}</h3>
                <p>${getFirst20Words(data.meals[i].strDescription )}</p>
        </div>
</div>
    `)
}
}
async function displayIngredientDetails(data) {
    firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data.firstElementChild.nextElementSibling.innerHTML}`)
    const result =await response.json();
    // console.log(result);
    const row =document.querySelector('.firstData').innerHTML=""
    for (let i = 0; i < result.meals.length; i++) {
        displaydata(result.meals[i].strMealThumb, result.meals[i].strMeal)
        // console.log(data.meals[i].strMealThumb, data.meals[i].strMeal);
        }
        $('#IngredientsPart').addClass('d-none');
        $('#firstFrame').removeClass('d-none')
        firstReload.classList.add('d-none');
    firstReload.classList.remove('d-flex');
}

//=> form
$('#contactUs').on('click',function(e) {
    closeNavBar()
    $('#firstFrame').addClass('d-none');
    $('#search').addClass('d-none')
    $('#categoryPart').addClass('d-none');
    $('#areaPart').addClass('d-none')
    $('#IngredientsPart').addClass('d-none');
    $('#contactUsPart').removeClass('d-none');
    testAll('#userNumber', /^0\d{10}$/, '.numberMessage')
    testAll('#userName', /^[a-zA-Z]{3,12}$/, '.userNameMessage')
    testAll('#userAge', /^\d{2}$/, '.ageMessage')
    testAll('#userMail', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '.mailMessage')
    testAll('#userPassword', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, '.passwordMessage')
    repassword()
})
function testbtn(){
    const btn = document.querySelector('#submitBtn');
    const number = document.querySelector('#userNumber');
    const userName = document.querySelector('#userName');
    const userPassword = document.querySelector('#userPassword');
    const userMail = document.querySelector('#userMail');
    const userAge = document.querySelector('#userAge');
    const repassword = document.querySelector('#repassword');
    if( number.value !=""&& userName.value != "" && userPassword.value != ""&& userMail.value != "" && userAge.value != "" &&repassword.value !=""){
        btn.removeAttribute('disabled');
        btn.addEventListener('click', function(){
            firstReload.classList.add('d-flex');
    firstReload.classList.remove('d-none');
            closeNavBar()
        $('#firstFrame').removeClass('d-none');
        $('#search').addClass('d-none')
        $('#categoryPart').addClass('d-none');
        $('#areaPart').addClass('d-none')
        $('#IngredientsPart').addClass('d-none');
        $('#contactUsPart').addClass('d-none');
        clear(number);clear(userAge);clear(userName);clear(userMail);
        repassword.value="";
        userPassword.value="";
        firstReload.classList.add('d-none');
    firstReload.classList.remove('d-flex');
        })
    }else{
        btn.setAttribute('disabled', true);
    }
}
function testAll(inputId , rgexText , messageClassName){
    const numberInput = document.querySelector(inputId);
    const regex = rgexText
    const password = document.querySelector('#userPassword')
    const repassword = document.querySelector('#repassword')
    numberInput.addEventListener('keyup',function(e) {
        if(numberInput.value !==""){
            if(regex.test(numberInput.value)){
                console.log('number done');
                $(messageClassName).slideUp(500);
                $(inputId).addClass('mb-5')
                testbtn()
                if(password.value=== repassword.value){
                    $('.repasswordMessage').slideUp(500);
                    $('#repassword').addClass('mb-5')
                    testbtn()
                }
            }else{
                $(messageClassName).removeClass('d-none');
                $(messageClassName).slideDown(500);
                $(inputId).removeClass('mb-5')
                const btn = document.querySelector('#submitBtn').setAttribute('disabled', true);
                const password = document.querySelector('#userPassword')
    const repassword = document.querySelector('#repassword')
    $('#repassword').on('keyup', function(event){
        if(password.value=== repassword.value){
            $('.repasswordMessage').slideUp(500);
            $('#repassword').addClass('mb-5')
            testbtn()
        }
        else{
            $('.repasswordMessage').removeClass('d-none');
            $('.repasswordMessage').slideDown(500);
            $('#repassword').removeClass('mb-5')
            const btn = document.querySelector('#submitBtn').setAttribute('disabled', true);
        }
    })
            }
        }
        
    })
}
function repassword(){
    const password = document.querySelector('#userPassword')
    const repassword = document.querySelector('#repassword')
    $('#repassword').on('keyup', function(event){
        if(password.value=== repassword.value){
            $('.repasswordMessage').slideUp(500);
            $('#repassword').addClass('mb-5')
            testbtn()
        }
        else{
            $('.repasswordMessage').removeClass('d-none');
            $('.repasswordMessage').slideDown(500);
            $('#repassword').removeClass('mb-5')
            const btn = document.querySelector('#submitBtn').setAttribute('disabled', true);
        }
    })
    
}
function clear(tttttt){
    let input1 = tttttt
    input1.value=""
}