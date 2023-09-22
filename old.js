let button = document.querySelector('#button');
let commande = document.querySelector('.commande');
let cartProduit = document.querySelector('#productCard');
// console.log(datas);


for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    let divcard = document.createElement('div');
    divcard.className = "col-xl-4 col-lg-4 col-sm-6 col-12 my-2"
    divcard.innerHTML = `
    
    <div class="card">
      <img class="card-img-top rounded-2" src="${element.url}" alt="">
      <div class="mt-3 ms-auto position-absolute top-0 end-0">
          <i class="bi bi-star text-warning fs-3"></i>
          <i class="bi bi-star text-warning fs-4"></i>
          <i class="bi bi-star text-warning fs-4"></i>
          <i class="bi bi-star text-warning fs-4"></i>
          <i class="bi bi-star text-warning fs-4"></i>
        </div>
        
      <div class="card-body my-2"> 
        <a data-url="${element.url}" class="icon-link icon-link-hover"><i class="bi bi-cart-check-fill  fs-3"></i></a>
        <div class="mt-3  d-flex justify-content-between">
              <h3 class="text-danger">${element.name}</h3>     
              <h3 class="text-danger">${element.value} FCFA</h3>
        </div>
      </div>
    </div>`;
      cartProduit.appendChild(divcard)
}



for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    // console.log(element);

    let divRow1 = document.createElement('div');
    divRow1.className = 'col-xl-4 col-lg-4 col-sm-6 col-12 my-2';
    //console.log(divRow1);
    
    let card = document.createElement('div');
    card.className = 'card';
    //console.log(card);
    
    let imgCard = document.createElement('img');
    imgCard.className = 'card-img-top';
    // console.log(imgCard);
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body w-100 px-0';
    // console.log(cardBody);
    let divTitleValue = document.createElement('div');
        divTitleValue.classList.add('mt-3', 'd-flex', 'justify-content-between');

        let titeP = document.createElement('h3');
        titeP.classList.add('text-danger');

        let valueP = document.createElement('h3');
        valueP.classList.add('text-danger');
        
        divTitleValue.appendChild(titeP)
        divTitleValue.appendChild(valueP)
       
        cardBody.appendChild(imgCard)
        cardBody.appendChild(divTitleValue)
        divRow1.appendChild(card)
        cartProduit.appendChild(card);

        imgCard.src = `${element.url}`;
        valueP.innerHTML = `${element.value} FCFA`;
        titeP.innerHTML = `${element.name}`;

  

}

// console.log(cartProduit);
button.addEventListener('click', ()=>{
 commande.classList.remove('hidden');
})

const star = document.querySelectorAll('.bi-star')

star.forEach(element=>{
    element.addEventListener('click', ()=>{
        // element.setAttribute('style', 'background-color: yellow')
        element.classList.remove('bi-star')
        element.classList.add('bi-star-fill', 'text-warning')
    })
})
// console.log(star);
// =================================================================

const cards = document.querySelectorAll('.icon-link');
let totaux = document.querySelector('#totaux');
cartInfo ()
// console.log(totaux);
  let tabProduct = [];
  let nbrPr = 1;
  let total = 0;
  let items = 0;
  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify(items));
  }

if (!localStorage.getItem('total')) {
  localStorage.setItem('total', JSON.stringify(total))
}

function getTotal(){ 
  if (localStorage.getItem('total')===null) {
    localStorage.setItem('total', 0);
  }
  return JSON.parse(localStorage.getItem('total'))
}
  if (!localStorage.getItem('list')) {
    localStorage.setItem('list', JSON.stringify(tabProduct));
  }
function getTotalItems(){
  if (localStorage.getItem('items')===null) {
    localStorage.setItem('items', 0);
  }
  return JSON.parse(localStorage.getItem('items'))
}
function getList(){ return JSON.parse(localStorage.getItem('list'))}

  // ============================================================

let listCommande = document.querySelector('#listCommande');
const line = document.querySelector('#line');
// console.log(line);


// console.log(getList());

tabProduct = getList();

// console.log(tabProduct);
function lineCommande(arr) {
  arr.forEach((element)=>{
    // console.log(tbody.innerHTML);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div class="imgCommande"><img class="img-fluid rounded-5" src="${element.image}" alt=""></div></td>
    <td>${element.quantity} X</td>
    <td>${element.name}</td>
    <td>${element.value} FCFA</td>
    <td><a href=""><i class="bi bi-trash fs-5 text-danger"></i></a></td>`;
    // console.log(tr);
    tbody.appendChild(tr)
    // console.log(tbody);
  })

  /*   for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div class="imgCommande"><img class="img-fluid rounded-5" src="${element.image}" alt=""></div></td>
    <td>${element.quantity} X</td>
    <td>${element.name}</td>
    <td>${element.value} FCFA</td>
    <td><a href=""><i class="bi bi-trash fs-3 text-danger"></i></a></td>`;
    console.log(tr);
    tbody.appendChild(tr)
    console.log(tbody);
    } */
}


// console.log(tbody);
// console.log(tabProduct);
  //=================================

// console.log(cards[0].dataset.url);
cards.forEach(pannier=> {
  let nameProduct = pannier.nextElementSibling.children[0].textContent;
  let  valueProduct = parseInt(pannier.nextElementSibling.children[1].textContent);
  let image = pannier.dataset.url;
  total = getTotal();
  items = getTotalItems();

  const Product = {
    image: image,
    name : nameProduct,
    value : valueProduct,
    quantity : nbrPr
  }
  
    pannier.addEventListener('click', ()=>{

      if(!tabProduct.includes(Product)){
        tabProduct.push(Product);
        total += Product.value;
        items++;
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('total',JSON.stringify(total))
        localStorage.setItem('list', JSON.stringify(tabProduct))
        cartInfo ();
      }else{
        Product.quantity++;
        total += Product.value;
        items++
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('total',JSON.stringify(total))
        localStorage.setItem('list', JSON.stringify(tabProduct));
        
        cartInfo ()
      }
      // lineCommande(getList());
    })

}) 
// ======================================

lineCommande(getList());

// ========================================
const clear = document.querySelector('#clear')
clear.addEventListener('click', ()=>{
  localStorage.clear();
  cartInfo();
});

//=======================================



// FUNCTIONS 
/* --------------------- Start --------------------------- */
function cartInfo () {
  button.children[1].innerHTML = `${getTotalItems()} items- <span>${getTotal()} FCFA</span>`;
  totaux.innerHTML = `${getTotal()}.00 FCFA`;
}

/* --------------------- Start --------------------------- */