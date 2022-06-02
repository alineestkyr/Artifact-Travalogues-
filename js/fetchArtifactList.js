window.onload = (event) => {
    get();
}

function get() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer 78e17825b6b7d0edd54a98dce33ba49aaaed8bdb0e22636b24b8894afccf42d9f1d8197810fd0ffa9b439ee7e862d646b984efb7c568236b6d259069078d1bbb57ec020ddacec9cd6245656fa9ad7669f2a1be7efedc1b0820fa35ce7ed32cf6452bfb73dfb6366f6159e4ed60663fb22c941ca76e80937222d2c11ad8516714');
    
    fetch('https://artifact-travelogues.668558.xyz/api/artifacts', {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        fillPage(data)
        console.log(data)
    }).catch(err => {
        console.log("error")
        console.log(err)
    })
}

function fillPage(responseData) {
    let tableHeaders = [
        "Name",
        "Description",
        "Origin",
        "Published At",
        "Updated At"
    ]

    let output = document.getElementById("testOutput")
    output.innerHTML = ""

    let table = document.createElement('table')
    table.style.width = '80%'
    table.style.margin = 'auto'

    let thead = table.createTHead()
    let trow = thead.insertRow(0)
    tableHeaders.forEach(h => {
        let tcell = trow.insertCell()
        tcell.appendChild(document.createTextNode(h))
    })

    responseData.data.forEach((value, index, array) => {
        let tr = table.insertRow()
        
        // Create link to other page
        var a = document.createElement('a');
        var linkText = document.createTextNode(value.attributes.name);
        a.appendChild(linkText);
        a.title = value.attributes.name;
        a.href = "dataFile.html?id="+value.id;

        let tdName = tr.insertCell()
        tdName.appendChild(a)

        tr.insertCell().appendChild(document.createTextNode(value.attributes.description))
        tr.insertCell().appendChild(document.createTextNode(value.attributes.origin))
        tr.insertCell().appendChild(document.createTextNode(value.attributes.publishedAt))
        tr.insertCell().appendChild(document.createTextNode(value.attributes.updatedAt))
    })

    output.appendChild(table)
}
