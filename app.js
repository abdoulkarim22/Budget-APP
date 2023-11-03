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
const btnClose = document.getElementById("btnClose")
let tempAmount = 0;


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
 if (!localStorage.getItem("budget")) {
  budget =  localStorage.setItem("budget",JSON.stringify(budget))
 }
 budget = JSON.parse(localStorage.getItem("budget"))








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
        localStorage.setItem("budget",JSON.stringify(budget))
        //  document.location.reload();
        input.value = ""  
      }
      budgetForm();
});
// +++++++++++++++++++ addEventListener button calculete ++++++++++++++++++++++++++


 function budgetForm() {
   Valuebalance.innerText = budget;
   Valuebudget.innerText = budget;
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
  inputpleaseyourexpense.value = "";
  inputexpensesamount.value = "";
  
    // ================= le stokage dans localstorage des value name et prix =============================
    const localBudgetexpenses = document.getElementById("Budgetexpenses");
    const getItemlocalstorage = JSON.parse(localStorage.getItem("user"));
    if (getItemlocalstorage != null) {
      localBudgetexpenses.innerText = `${getItemlocalstorage.prix}`
      Valuebalance.innerText = `${budget - getItemlocalstorage.prix}` 
    }
    divHistoyry.classList.remove("divbtnHistory");
    tbodyClass.classList.add("feedback");
    btnClose.classList.add("feedback")

    historyBtn.addEventListener('click',function (event) {
      tbodyClass.classList.remove("feedback");
      btnClose.classList.remove("feedback")
    });
    btnClose.addEventListener('click',function (event) {
      tbodyClass.classList.add("feedback");
      btnClose.classList.add("feedback");
    });
    history();
    lesDonnesdutable(); 
  }

})

function history(event) {
  event?.preventDefault();
  tableExpenses.forEach(element => {
    historyTbaby.innerHTML += `
          <tr>
              <td class="text-center" style="width: 300px">${element.name}</td>
              <td class="text-end w-50">${element.prix}<span class = "ms-1">${"F"}</span></td>
          </tr>
          `
   });
}
history();
// ================================= sumbmit btn =======================================================

// ================================== function pour afficher les name et prix================================================================
function lesDonnesdutable(event){
  event?.preventDefault()
  tBody.innerHTML = "";
  tableExpenses.forEach(element => {
   tBody.innerHTML += `
         <tr>
             <td class="product" style="width: 200px">${element.name}</td>
             <td class="amount">${element.prix}<span class = "ms-1">${"F"}</span></td>
             <td><span class = "me-3"><button class="btnedit" id="btnedit" ><i class="fa-sharp fa-solid fa-pen-to-square" id="editeBtn" style="color:  #45c8dc"></i></button></span> <span><button class = "btnTrash" id="clear" ><i  class="fa-solid fa-trash"  style="color: red;cursor: pointer;"></i></button></span></td>
         </tr>
         `
  });
}
lesDonnesdutable();
// ==================================  pour afficher les name et prix================================================================



  const getItemlocalstorage = JSON.parse(localStorage.getItem("user"));
const localBudgetexpenses = document.getElementById("Budgetexpenses");

if (getItemlocalstorage != null) {
  localBudgetexpenses.innerText = `${getItemlocalstorage.prix}`
  Valuebalance.innerText = `${budget - getItemlocalstorage.prix}` 
}


//onclick prix expenses 
submit.onclick = (e) =>{
  const user = {
    prix:inputexpensesamount.value
  }
  localStorage.setItem("user",JSON.stringify(user))
  //  document.location.reload();
}
// onclick prix expenses

// addEventListener.btnRese
btnReset.addEventListener('click',function (event) {
  if (event) {
    localStorage.clear();
    document.location.reload();
  }
});






// ============================================= la chartjs ====================================================

  // document.addEventListener('DOMContentLoaded',function () {
  //   const ctx = document.getElementById('myChart');
    
  // new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: [],
  //     datasets: [{
        
  //       data: ['12','5'],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         display: false,
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });
  // })