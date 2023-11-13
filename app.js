const Valuebalance = document.getElementById("balanceValue");
const Valuebudget = document.getElementById("budgetValue");
// const leMessage = document.getElementById("message")
const btnedit = document.getElementById("btnedit");
const feedback = document.querySelector(".feedback");
const notifications = document.getElementById("notifications");
const budgetexpenses = document.getElementById("Budgetexpenses");
const Budgetexpenseform = document.getElementById("Expenseform");
const letitleexpenses = document.getElementById("Budgetexpensestitle");
const levalueexpenses = document.getElementById("Budgetexpensesvalue");
const icon = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");
const Divdesparametre = document.getElementById("divdesparametre");
const tBody = document.getElementById("tbody");
const error = document.getElementById("budget-error");
const laNotications = document.querySelector(".notication");
const leMessage = document.getElementById("leMessage");
const historyTbaby = document.getElementById("historyTbody");
const historyBtn = document.getElementById("historyButton");
const divHistoyry = document.getElementById("divHistory");
const verifications = document.getElementById("verifications");
const tbodyClass = document.querySelector(".tbodyClass");
const btnClose = document.getElementById("btnClose");
const divTableandBtn = document.querySelector(".divTableandBtn");
const btnModifier = document.getElementById("btnModifier");
const message1 = document.querySelector(".message1");
const verifications1 = document.getElementById("verifications1")
let tempAmount = 0;
let total = 0;

// ================================ pour les input ======================================
const input = document.getElementById("input");
const inputpleaseyourexpense = document.getElementById("PleaseEnterYourExpense");
const inputexpensesamount = document.getElementById("PleaseEnterYourExpenseAmount");
// ================================ pour les input ======================================


// ================================ pour les buttons ======================================
const btnCalculete = document.getElementById("Buttoncalcule");
const btnSubmit = document.getElementById("submit");
const btnReset = document.getElementById("btnReset");
// ================================ pour les buttons ======================================



 let tableExpenses = [];
 if (!JSON.parse(localStorage.getItem("tableExpenses"))) {
  tableExpenses = localStorage.setItem("tableExpenses",JSON.stringify(tableExpenses));
 }
 tableExpenses = JSON.parse(localStorage.getItem("tableExpenses"))

 let budget = 0;
 let expense = 0;
 let balance = 0;

 if (!localStorage.getItem("budget")) {
  budget =  localStorage.setItem("budget",JSON.stringify(budget))
 }
 if (!localStorage.getItem("balance")) {
  balance =  localStorage.setItem("balance",JSON.stringify(balance))
 }
 if (!localStorage.getItem("expense")) {
  expense =  localStorage.setItem("expense",JSON.stringify(expense))
 }
 budget = JSON.parse(localStorage.getItem("budget"))
 balance = JSON.parse(localStorage.getItem("balance"));
 expense = JSON.parse(localStorage.getItem("expense"))







// +++++++++++++++++++ addEventListener button calculete ++++++++++++++++++++++++++
btnCalculete.addEventListener('click', (e) => {
   tempAmount = input.value;
      if (tempAmount === "" || tempAmount < 0) {
        e.preventDefault();
        feedback.classList.add("block");
        error.innerHTML = `La valeur ne doit  pas être vide; ou négative`

        setTimeout(() => {
          feedback.classList.remove('block');
        }, 3000);
        input.value = "" 
      }
        else{
          verifications.classList.add("block");
          setTimeout(() => {
            verifications.classList.remove('block');
          }, 2000);
        e.preventDefault();
        budget += parseInt(input.value)
        localStorage.setItem("budget",JSON.stringify(budget));

        balance = parseInt(budget) - parseInt(expense);
        localStorage.setItem("balance",JSON.stringify(balance));
        
        input.value = "";
        budgetForm();
      }
        // document.location.reload();

      
});
// +++++++++++++++++++ addEventListener button calculete ++++++++++++++++++++++++++


 function budgetForm() {
  balance = parseInt(budget) - parseInt(expense);
  localStorage.setItem("balance",JSON.stringify(balance))
   Valuebudget.innerText = budget;
   Valuebalance.innerText =  balance ;
 }
 document.onload = budgetForm()

// ================================= sumbmit btn =======================================================
btnSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    //  document.location.reload(); 

    if (!inputexpensesamount.value || !inputpleaseyourexpense.value || inputexpensesamount.value < 0) {
      laNotications.classList.add("block");
      leMessage.innerHTML = `Svp veuillez mettre une  valeur`;
      setTimeout(() => {
        laNotications.classList.remove('block');
      }, 3000);
      inputexpensesamount.value = "";
      input.value = "";     
      return false;
    }
    else{
    verifications.classList.add("block");
    setTimeout(() => {
      verifications.classList.remove('block');
    }, 1000);
   // ================= le stokage dans localstorage des value name et prix =============================
   const datas = {
    name:inputpleaseyourexpense.value,
    prix:inputexpensesamount.value
  };

  tableExpenses.push(datas);
  localStorage.setItem("tableExpenses",JSON.stringify(tableExpenses));
 
  
  // expense += parseInt(inputexpensesamount.value);
  // console.log(expense + " before ");
  // localStorage.setItem("expense",JSON.stringify(expense));
  inputpleaseyourexpense.value = "";
  inputexpensesamount.value = "";
    // ================= le stokage dans localstorage des value name et prix =============================

      budgetForm();
     }
    
    lesDonnesdutable();
    history();
});
    btnClose.classList.add("feedback")
    historyBtn.addEventListener('click',function (event) {
     if (event) {
      divTableandBtn.classList.remove("divTableandBtn")
      tbodyClass.classList.remove("feedback");
      btnClose.classList.remove("feedback");
     }
    });
    btnClose.addEventListener('click',function (event) {
      tbodyClass.classList.add("feedback");
      btnClose.classList.add("feedback");
    });

function history(event) {
  event?.preventDefault();
  tableExpenses.forEach((element,index) => {
    historyTbaby.innerHTML +=`
          <tr>
          <td class="text-center">${index+1}</td>
              <td class="text-center" style="width: 300px">${element.name}</td>
              <td class="text-end w-50">${element.prix}<span class = "ms-1">${"F"}</span></td>
          </tr>
          `
   });
   localStorage.setItem("tableExpenses",JSON.stringify(tableExpenses));
}
history();
// ================================= sumbmit btn =======================================================

// ================================== function pour afficher les name et prix================================================================
function lesDonnesdutable(event){
  total = 0;
   event?.preventDefault()
  tBody.innerHTML = "";
  tableExpenses.forEach((element,index) => {
   total += parseInt(element.prix)
   tBody.innerHTML += `
         <tr>
             <td class="product" style="width: 200px">${element.name}</td>
             <td class="amount">${element.prix}<span class = "ms-1">${"F"}</span></td>
             <td><span class = "me-3"><i onclick="penEdit(${index})"; class="fa-sharp fa-solid fa-pen-to-square" id="editeBtn" style="color:  #45c8dc"></i></span> <span><i onclick="trash(${index})" class="fa-solid fa-trash"  style="color: red;cursor: pointer;"></i></span></td>
         </tr>
         `
  });
  // budgetexpenses.innerHTML = total;
  budgetexpenses.innerText = total;
  expense = total
  localStorage.setItem("expense",JSON.stringify(expense));
  console.log(total);
}
lesDonnesdutable();

// =================================== function pour suprimmer =======================================
function trash(index) {
  tableExpenses.splice(index,1);
  localStorage.setItem("tableExpenses",JSON.stringify(tableExpenses));
  lesDonnesdutable();
}
// =================================== function pour suprimmer =======================================

// =================================== function pour modifier =======================================
function penEdit(index) {
  btnSubmit.classList.add("d-none");
  btnModifier.classList.remove("d-none");
  inputpleaseyourexpense.value= tableExpenses[index].name;
  inputexpensesamount.value = tableExpenses[index].prix;

   btnModifier.addEventListener('click', function (event){
    btnModifier.classList.add("d-none");
    btnSubmit.classList.remove("d-none");
    event?.preventDefault();
    if (inputpleaseyourexpense.value === "" || inputexpensesamount.value === "") {
      alert("error");
    }else{
      tableExpenses[index].name = inputpleaseyourexpense.value;
      tableExpenses[index].prix = inputexpensesamount.value;
      localStorage.setItem("tableExpenses",JSON.stringify(tableExpenses));

      message1.classList.remove("message1");
      setTimeout(() =>{
        message1.classList.add("message1");
      },2000);
      inputpleaseyourexpense.value = "";
      inputexpensesamount.value = "";
    }

     });
}
// =================================== function pour modifier =======================================

// ==================================  pour afficher les name et prix================================================================



const getItemlocalstorage = JSON.parse(localStorage.getItem("user"));
const localBudgetexpenses = document.getElementById("Budgetexpenses");


btnReset.addEventListener('click',function (event) {
  if (event) {
    localStorage.clear();
    document.location.reload();
  }
});






// ============================================= la chartjs ====================================================

   document.addEventListener('DOMContentLoaded',function () {
     const ctx = document.getElementById('myChart');
    
   new Chart(ctx, {
     type: 'doughnut',
     data: {
       labels: ['Lait','Sucre','Banana'],
       datasets: [{
        
        data: ['12','5','7'],
        borderWidth: 1
      }]
    },
  options: {
    scales: {
      y: {
        display: false,
        beginAtZero: true
       }
     }
   }
 });
 })
