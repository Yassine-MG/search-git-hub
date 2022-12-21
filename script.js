let form = document.getElementById("formulaire");
let userName ;
let h2 = document.querySelector("h2");





form.addEventListener("submit",(event)=>{
    document.getElementById("api").style.display ="block";
    event.preventDefault();
    search()
})

// The function of searching for someone in github
function search(){
    let input = document.getElementById("search").value; 
    let name = input.split(" ").join("");
    fetch("https://api.github.com/users/"+name)
    .then((result)=>result.json())
    .then((data)=>{
        console.log(data.repos_url)
        document.querySelector(".picture").innerHTML= `<a href="${data.html_url}" target="_blank"> <img src="${data.avatar_url}"/></a>`;
        document.querySelector("h2").innerHTML = `<a href="${data.html_url}" target="_blank"> ${data.name}</a>`;
        document.querySelector("h3").innerText = `Number Of Repositories : ${data.public_repos}`;
        document.querySelector("h4").innerText = `this account has been created since : ${data.created_at}`
    })
    fetch(`https://api.github.com/users/${name}/repos`)

    .then((response) => response.json())

    .then((repositories) => {
        document.querySelector("ul").innerHTML = '';
        repositories.forEach(repo => {
            let ul = document.querySelector("ul")
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.setAttribute('href',`https://github.com/${name}/${repo.name}`)
            a.setAttribute('target',`_blank`)
            ul.appendChild(li);
            li.appendChild(a);
            a.innerText = `${repo.name}`;
        })
    })
}