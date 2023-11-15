/* Init localstorage datas & get datas */

// data list
if(!localStorage.getItem("list")){
  localStorage.setItem("list", JSON.stringify([]));
}
// data item 
if(!localStorage.getItem("items")){
  localStorage.setItem("items", 0);
}

// data total
if(!localStorage.getItem("total")){
  localStorage.setItem("total", 0);
}

let list = JSON.parse(localStorage.getItem("list")), 
  items = JSON.parse(localStorage.getItem("items")), 
  total = JSON.parse(localStorage.getItem("total"));

/* Ajout des elements datas dans le DOM */
const cartProduit = document.querySelector('#productCard');
addItemInSideDom(datas);

/* Show or hide Info Cart */
const button = document.querySelector('#button');
commande = document.querySelector('.commande');
button.addEventListener('click', () => {
  commande.classList.toggle('hidden');
});
// Add elements inside cart Info
for (let i = 0; i < datas.length; i++) {
  const element = datas[i];
  // console.log(element);

  const divRow1 = document.createElement('div');
  divRow1.className = 'col-xl-4 col-lg-4 col-sm-6 col-12 my-2';
  //console.log(divRow1);

  const card = document.createElement('div');
  card.className = 'card';
  //console.log(card);

  const imgCard = document.createElement('img');
  imgCard.className = 'card-img-top';
  // console.log(imgCard);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body w-100 px-0';
  // console.log(cardBody);
  const divTitleValue = document.createElement('div');
  divTitleValue.classList.add('mt-3', 'd-flex', 'justify-content-between');

  const titeP = document.createElement('h3');
  titeP.classList.add('text-danger');

  const valueP = document.createElement('h3');
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

/* Stars */
const star = document.querySelectorAll('.bi-star');
// console.log(star);
star.forEach(element => {
  element.addEventListener('click', e => {
    const parentStar = e.target.parentElement;
    // console.log(e.target.parentElement);
    const stars = parentStar.querySelectorAll("i");
    let check = false;
    for (let i = 0; i < stars.length; i++) {
      if(!check) {
        stars[i].classList.remove('bi-star');
        stars[i].classList.add('bi-star-fill');
        if (stars[i] === e.target) check = true;
      } else {
        stars[i].classList.add('bi-star');
        stars[i].classList.remove('bi-star-fill');
      
      }
    }
  })
})

/*  */
const iconLinks = document.querySelectorAll('.icon-link'),
  totaux = document.querySelector('#totaux');
cartInfo ();
iconLinks.forEach(iconLink => {
  iconLink.addEventListener("click", e => {
    const card = e.target.parentElement.parentElement.parentElement;

    const img = card.querySelector("img").getAttribute("data-img"),
      name = card.querySelector(".name").textContent,
      price = parseInt(card.querySelector(".price").textContent);
      console.log(card);
    console.log(img, name, price);
    const product = {
      img: img,
      name : name,
      price : price,
    }
    total += price;
    items++;
    notification();
    const findItem = list.find(listItem => listItem.img === product.img);
    if(!findItem) {
      product.quantity = 1;
      product.value = price;
      list.push(product);
      notification();
    } else {
      const index = list.findIndex(listItem => listItem.img === product.img);
      list[index].value += price; 
      list[index].quantity++;
      notification();
    }
    notification();
    localStorageUpdate("list", list);
    localStorageUpdate("total", total);
    localStorageUpdate("items", items);
    cartInfo ();
  })
})

/* Clear all datas */
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  list = [];
  items = 0;
  total = 0;
  localStorageUpdate("list", list);
  localStorageUpdate("items", items);
  localStorageUpdate("total", total);
  cartInfo()
})
 
/* Filter datas */
const filters = document.querySelectorAll(".filter");
filters.forEach( filter => {
  filter.addEventListener("click", e => {
    const search = e.target.textContent;
    dataToShow(search);
  })
});

const searchInput = document.querySelector("#search-input"),
  searchBtn = document.querySelector("#btn-search");
searchBtn.addEventListener("click", ()=> {
  const search = searchInput.value.trim().toLocaleUpperCase();
  if(!["ALL", "BAZIN", "TISSU", "PAGNE"].includes(search)) {
    searchInput.value = "";
  } else {
    dataToShow(search);
  }
})


/* All Functions */
//Function Add Items inside DOM
function addItemInSideDom (datas) {
  cartProduit.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    let divcard = document.createElement('div');
    divcard.className = "col-xl-4 col-lg-4 col-sm-6 col-12 my-2"
    divcard.innerHTML = `
    <div class="card">
      <img onclick = "showSliders1()" data-img="${element.url}" class="card-img-top rounded-2" src="${element.url}" alt="">
      <div class="mt-3 ms-auto position-absolute top-0 end-0">
        <i class="bi bi-star text-warning fs-3"></i>
        <i class="bi bi-star text-warning fs-4"></i>
        <i class="bi bi-star text-warning fs-4"></i>
        <i class="bi bi-star text-warning fs-4"></i>
        <i class="bi bi-star text-warning fs-4"></i>
      </div>
      <div class="card-body my-2"> 
        <a class="icon-link icon-link-hover text-danger text-decoration-none"><i class="bi  bi-cart-check-fill  fs-1"></i> <span class="mt-5">Ajouter au panier</span></a>
        <div class="mt-3  d-flex justify-content-between">
          <h3 class="text-danger name">${element.name}</h3>     
          <h3 class="text-danger price">${element.value} FCFA</h3>
        </div>
      </div>
    </div>
   `;
    cartProduit.appendChild(divcard);
  }
}

// Function update localStorage 
function localStorageUpdate (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Cart Info
function cartInfo () {
  button.children[1].innerHTML = `${items} items - <span>${total} FCFA</span>`;
  totaux.innerHTML = ` ${total}.00 FCFA`;
  cartInfoAddItem(list)
}

// Cart Info add items 
function cartInfoAddItem (elements) {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";
  elements.forEach((element, index) => {
    const tr = document.createElement("tr"),
    td1 = document.createElement("td"),
    td2 = document.createElement("td"),
    td3 = document.createElement("td"),
    td4 = document.createElement("td"),
    td5 = document.createElement("td"),
    img = document.createElement("img"),
    div = document.createElement("div"),
    i = document.createElement("i"),
    button = document.createElement("button");
    //tobdy
    tbody.appendChild(tr);

    //tr
    tr.append(td1, td2, td3, td4, td5);

    //td1
    td1.appendChild(div);
    div.appendChild(img);
    div.classList = "imgCommande";
    img.src = element.img;
    img.alt = element.name;
    img.classList = "img-fluid rounded-5";

    //td2
    td2.textContent = element.name;

    //td3
    td3.textContent = `${element.quantity} X ${element.price} = `;

    //td4
    td4.textContent = `${element.value} FCFA`;

    //td5
    td5.appendChild(button);
    button.appendChild(i);
    i.classList = "bi bi-trash text-danger";
    button.classList = "btn";

    button.addEventListener("click", () => {
      total -= element.value;
      items -= element.quantity;
      list.splice(index, 1);
      localStorageUpdate("list", list);
      localStorageUpdate("total", total);
      localStorageUpdate("items", items);
      cartInfo ();
    })
  })
}

// Function filter datas to show

function dataToShow (search) {
  const arrayFilter = datas.filter(({name}) => name.toLocaleUpperCase().includes(search));
  const arrayToShow = search === "ALL" ? datas : arrayFilter;
  addItemInSideDom(arrayToShow);
}

// ====================================== SWIPER ============================================
const divImg = document.createElement('div');
let swiper = document.querySelector('.swiper');
const divSwiper = document.querySelector('#divSwiper');


function addItemInDivWripper (datas) {
  divSwiper.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    let divSlide = document.createElement('div');
    divSlide.className = "swiper-slide img-fluid"
    divSlide.innerHTML = `
      <img onclick="showSliders2()" data-img="${element.url}" src="${element.url}" alt="">`;
   divSwiper.appendChild(divSlide);
  }
}
addItemInDivWripper (datas);

const allImg = document.querySelectorAll('.imgSwip');
// console.log(containerSwiper.classList);
const containerSwiper = document.querySelector('#containerSwiper');
const divAboutUs = document.querySelector('#divAboutUs');
const sectionStore = document.querySelector('#sectionStore');
const divAcceuil = document.querySelector('#divAcceuil');
console.log(divAcceuil);

function showSliders1() {
  containerSwiper.classList.toggle('hidden');
  divAboutUs.classList.add('d-none');
  divAcceuil.classList.add('d-none');
  sectionStore.classList.add('d-none')
}
function showSliders2() {
  containerSwiper.classList.toggle('hidden');
  divAboutUs.classList.remove('d-none');
  divAcceuil.classList.remove('d-none');
  sectionStore.classList.remove('d-none')
}


function notification() {
  const notif = document.querySelector('#notification');
    notif.classList.remove('d-none');
  setTimeout(() => {
    notif.classList.add('d-none');
  }, 2000);
}

// ===================================================

   swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
autoplay:{
  delay: 5000,
},
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});