
window.onload = (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get('id')

    if (id !== undefined && id !== null) {
        fetchArtifact(id)
    }
}

function fetchArtifact(id) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer 78e17825b6b7d0edd54a98dce33ba49aaaed8bdb0e22636b24b8894afccf42d9f1d8197810fd0ffa9b439ee7e862d646b984efb7c568236b6d259069078d1bbb57ec020ddacec9cd6245656fa9ad7669f2a1be7efedc1b0820fa35ce7ed32cf6452bfb73dfb6366f6159e4ed60663fb22c941ca76e80937222d2c11ad8516714');
    
    fetch('http://artifact-travelogues.668558.xyz/api/artifacts/'+id+'?'+ new URLSearchParams({
        populate: ['owners', 'image'],
    }),{
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(responseData => {
        fillPage(responseData.data.attributes)
    }).catch(err => {
        console.log("error")
        console.log(err)
    })
}

function fillPage(data) {
    let body = document.body

    console.log(data)

    let title = document.createElement('h1')
    title.innerHTML = data.name

    let img = document.createElement('img')
    img.src = 'https://artifact-travelogues.668558.xyz'+data.image.data[0].attributes.url
    img.alt = data.name
    img.style.width = '300px'
    img.style.height = 'auto'

    let h2 = document.createElement('h2')
    h2.innerHTML = 'Owners History'

    body.appendChild(title)
    body.appendChild(img)
    body.appendChild(h2)

    let detailsDiv = document.createElement('div')
    detailsDiv.set = "details"
    body.appendChild(detailsDiv)

    let map = document.createElement('div')
    map.id = 'map'
    body.appendChild(map)

    data.owners.forEach((value, index, array) => {
        let para = document.createElement('p')
        para.innerHTML = 'Details'

        detailsDiv.appendChild(para)
    })
}

  