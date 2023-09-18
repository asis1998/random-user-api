const apiEP="https://randomuser.me/api/?results=20";
const countElm = document.getElementById('count') ;

// gender = male

let  userList=[];
const listElm = document.getElementById('list')



const fetchUser=async (url)=>{
  try {
    const dt= await fetch(url);

  // console.log(dt);

  const data = await dt.json();
  // console.log(data);
  userList = data.results ;
  console.log(userList);
  display(userList);
  } catch (error) {
    console.log(error)
  }


  //promise using fetch to fetch data from any server, fetch()

  // fetch(url).then((dt)=>{         //dt is data
  //   // console.log(dt);
  //   return dt.json()
  // }).then((data)=>{
  //   console.log(data);

  //   userList = data.results;
  //   // console.log(userList);
  // });


  //async / await;

  
  // console.log(data);



};
fetchUser(apiEP);
const display = (users)=>{
  let str = "";

  users.map((item,i)=>{
    // console.log(item);
    str += ` 
    <div class="card flex-grow-1" style="width: 18rem">
    <img
      src="${item?.picture?.large}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.name.title} ${item.name.first} ${item.name.last}</h5>
      <div class="card-text">
        <ul class="list-unstyled">
          <li><i class="fa-solid fa-mobile"></i>${item.phone}</li>
          <li><i class="fa-solid fa-envelope"></i>${item.email}</li>
          <li> <i class="fa-solid fa-house"></i>${item.location.street.number} ${item.location.street.name} , ${item.location.city} ${item.location.state} ${item.location.postcode} ${item.location.country}</li>
        </ul>
      </div>
    </div>
  </div>`
  });
  // console.log(users);
  // console.log(str);
  listElm.innerHTML=str;
  countElm.innerText = users.length ;
};


const handleOnGenderSelect = e =>{
  const g = e.value;
  const url= `${apiEP}&gender=${g}`;
  fetchUser(url);
};

document.getElementById("search").addEventListener('keyup', (e) => {
  const {value}= e.target;
  console.log(value);

  const filteredArg = userList.filter((usr)=>{
    const fullName =(`${usr.name.first} ${usr.name.last}`).toLowerCase();
    if(fullName.includes(value.toLowerCase())) {
      return true;
    }
});
console.log(filteredArg);

display(filteredArg);
});