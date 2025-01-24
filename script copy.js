const listmakan = []

function tambahlistrandom(){
  var simpan = document.getElementById("captran").innerHTML
  const data = {
    tulis : simpan,
    done : false
  }
  listmakan.push(data)
  buatlistulang()
}

function tambahlist(select){
  var simpan = document.getElementById(select).innerHTML
  const data = {
    tulis : simpan,
    done : false
  }
  listmakan.push(data)
  buatlistulang()
}

function ceklist(index){
  listmakan[index].done = !listmakan[index].done
  buatlistulang()
}

function buatlistulang(){
  var main = document.getElementById("daftar")
  main.innerHTML = ""
  listmakan.forEach ((data, index) => {
    var list = document.createElement('li')
    list.classList.add('clist','cdrop','d-flex','align-items-center','ps-3')
    list.setAttribute('role','button')
    list.innerHTML = data.done ? `<del>${data.tulis}</del>` : data.tulis
    list.addEventListener("click", () => {ceklist(index)})
    main.appendChild(list)
  })
}

async function makanrandom() {
  gamran = document.getElementById("gamran")
  captran = document.getElementById("captran")
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const makan = await response.json();
  makan.meals.forEach(meal => {
    gamran.src = meal.strMealThumb
    captran.innerHTML = meal.strMeal
  });
}

async function getkategori() {
  var main = document.getElementById("galkat")
  var t = document.getElementById("template1")
  main.innerHTML = ""
  kategori = document.getElementById("kategori").value
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+kategori);
  const data = await response.json();
  data.meals.forEach(meal => {
    var div = document.createElement("div")
    div.classList.add("ccard","rounded","p-0","d-flex","flex-column","align-items-center")
    div.innerHTML = `<img src='${meal.strMealThumb}'></img><p id="${meal.strMeal}" class="mb-0 text-center d-flex align-items-center">${meal.strMeal}</p>`
    main.appendChild(div)
    div.addEventListener("click", () => {
      tambahlist(meal.strMeal)
    })
  });
}

document.getElementById("gamran").addEventListener("click", tambahlistrandom)
document.getElementById("carirandom").addEventListener("click", makanrandom)
window.addEventListener("load", makanrandom)
window.addEventListener("load", getkategori)