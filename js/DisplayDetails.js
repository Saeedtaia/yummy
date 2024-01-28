// export function displaydata(src , p) {
//   $('.firstData').append(`
//       <div class="col-md-3 more overflow-hidden">
//               <div onclick="${test(this)}" class=" position-relative mainmeal rounded-3 overflow-hidden courser-pointer">
//                       <img src="${src}" class="w-100" alt="">
//                       <div class="position-absolute bg-white start-0 end-0 bottom-0 bg-opacity-75 move d-flex flex-column justify-content-center">
//                       <p class="text-start ps-3 fs-4 fw-bold">${p}</p>
//                   </div>
//               </div>
//           </div>
//       `);
// }
// async function test(div){
//   $('#firstFrame').addClass('d-none')
//   console.log(div.lastElementChild.firstElementChild.innerHTML);
//   const respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${div.lastElementChild.firstElementChild.innerHTML}`);
//   const result = await respons.json();
//   displayDetails(result)
// }
// function displayDetails(result) {
//     $('#detailsShow .row').append(`
//     <div class="col-md-4">
//               <img src="${result.meals[0].strMealThumb}" class="w-100 rounded-3" alt="">
//               <p class="text-white text-capitalize mt-2 fs-3 fw-bold">${result.meals[0].strMeal}</p>
//             </div>
//             <div class="col-md-8">
//               <p class="text-white py-2 fs-3 fw-bold">Instructions</p>
//               <p class="text-white py-2">${result.meals[0].strInstructions}</p>
//               <p class="text-white"><span class="fw-bold fs-3">Area :</span> <span class="fs-4 ps-2 fw-bold">${result.meals[0].strArea}</span></p>
//               <p class="text-white"><span class="fw-bold fs-3">Category :</span> <span class="fs-4 ps-2 fw-bold">${result.meals[0].strCategory}</span></p>
//               <p class=""><span class="text-white fw-bold fs-3">Recips :</span></p>
//               <div>
//               <ul class="tags d-flex flex-wrap g-3 list-unstyled"></ul>
//               </div>
//               <p class=""><span class="text-white fw-bold fs-4">Tags :</span></p>
//               <div class="d-flex justify-content-start">
//                 <a target="_blank" href="${result.meals[0].strSource}" class="btn btn-success me-1">Source</a>
//                 <a target="_blank" href="${result.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
//               </div>
//             </div>
//     `)
//     //=>impostant way for make loop with object that you want mor propirties from it
//         for (let i = 1; i <= 20; i++) {
//             if (result.meals[0][`strIngredient${i}`] != "") {
//                 $('.tags').append(`
//                     <li class="alert alert-info m-2 p-1">${result.meals[0][`strMeasure${i}`]} ${result.meals[0][`strIngredient${i}`]}</li>
//                 `);
//             }
//         }
// };