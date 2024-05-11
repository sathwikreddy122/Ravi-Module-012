const loginForm = document.querySelector(".login");
const loginBtn = document.querySelector(".auth");
const loginStatus = document.querySelector(".status");
const firstModal = new bootstrap.Modal(document.querySelector(".firstModal"));
const secondModal = new bootstrap.Modal(document.querySelector(".secondModal"));
const links = document.querySelectorAll('a[href="product.html"]');
const cart = document.querySelector('.cart');
const count = document.querySelector('.count');

let user = JSON.parse(localStorage.getItem('user')) || '';
let category = JSON.parse(localStorage.getItem('category')) || '';

console.log(user);

links.forEach((link) => {
  const value = link.innerText;

  link.addEventListener("click", (e) => {
    category = value;
    localStorage.setItem("category", JSON.stringify(category));
  });
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Hi");

  const email = document.querySelector('.login>input[type="email"]').value;
  const password = document.querySelector(
    '.login>input[type="password"]'
  ).value;

  // console.log(email,password);
  const status = await isUser(email, password);
  console.log(status, typeof status);

  status == 1 ? successful() : failed();

  localStorage.setItem("user", JSON.stringify(user));
});

async function isUser(email, password) {
  try {
    const users = await fetch("http://localhost:3000/users");
    const datas = await users.json();

    let status = 0;

    datas.forEach((data) => {
      if (data.email == email && data.password == password) {
        user = email;
        status = 1;
      } else if (data.email == email) {
        status = -1;
      }
    });

    if (status == 0) {
      await addUser(email, password);
      status = 1;
    }

    return status;
  } catch (error) {
    console.log(error);
  }
}

async function addUser(email, password) {
  try {
    user = email;

    const data = {
      email,
      password,
    };

    const users = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const datas = await users.json();
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
}

function successful() {
  loginStatus.innerText = "Login Successful✅";
  // console.log(loginStatus.innerText);

  loginStatus.style.display = "inline";
  loginStatus.style.borderBottomColor = "green";

  setTimeout(() => {
    firstModal.hide();
    loginStatus.innerText = "";
  }, 1200);
}

function failed() {
  loginStatus.innerText = "Invalid Credentials❌";
  // console.log(loginStatus.innerText);

  loginStatus.style.display = "inline";
  loginStatus.style.borderBottomColor = "red";

  setTimeout(() => {
    loginStatus.innerText = "";
  }, 2500);
}

const logout = document.querySelector('.modal-footer .btn-danger');
  
  logout.addEventListener('click',()=>{
    localStorage.setItem('user',JSON.stringify(''));
    getCount();
    secondModal.hide();
  })

loginBtn.setAttribute('data-bs-target','');

loginBtn.addEventListener("click", (e) => {
  
  user = JSON.parse(localStorage.getItem('user'));
  // console.log("hi",user);

    if (user != '') {
      secondModal.show();
      firstModal.hide();

    } else {
      secondModal.hide();
      firstModal.show();
    }
  
    console.log(loginBtn);
});

const searchBtn = document.querySelector(".search");
console.log(searchBtn);

// searchBtn.addEventListener('click',(e)=>{
//   console.log(e);
// })

console.log(cart);
cart.addEventListener('click',()=>{
  if(user==''){
    alert('Please Log in.');
    return;
  }
  window.location.href='cart.html';
})

async function getCount(){
  const result = await fetch('http://localhost:3000/cart-items');
  const data = await result.json();

  let total = 0;
  data.forEach(item => {
    if(item.user == user)
      total++;

  })
  count.innerText = `${total}`;
}

getCount();
// add event to show less data

var btnN = document.getElementById("btnN");
var ulN = document.querySelector(".ulN2");
var aNList = ulN.querySelectorAll("a.aN2");
btnN.addEventListener("click", function () {
  for (var i = 12; i < aNList.length; i++) {
    aNList[i].classList.toggle("hide");
  }
  btnN.textContent =
    btnN.textContent === "Show less-" ? "Show more+" : "Show less-";
});
