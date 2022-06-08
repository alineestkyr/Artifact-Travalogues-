const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

window.onload = (event) => {
    if (id !== undefined && id !== null) {
        fetchArtifact(id)
    }
}

function fetchArtifact(id) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer 78e17825b6b7d0edd54a98dce33ba49aaaed8bdb0e22636b24b8894afccf42d9f1d8197810fd0ffa9b439ee7e862d646b984efb7c568236b6d259069078d1bbb57ec020ddacec9cd6245656fa9ad7669f2a1be7efedc1b0820fa35ce7ed32cf6452bfb73dfb6366f6159e4ed60663fb22c941ca76e80937222d2c11ad8516714');
    
    fetch('https://artifact-travelogues.668558.xyz/api/artifacts/'+id+'?'+ new URLSearchParams({
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
    let title = document.getElementById('title')
    title.innerHTML = data.name

    let img = document.getElementById('img')
    img.src = 'https://artifact-travelogues.668558.xyz'+data.image.data[0].attributes.url
    img.alt = data.name

    let ownerList = document.getElementById('ownerList')

    let map = document.createElement('div')
    map.id = 'map'

    // Go though all owners and create elements
    data.owners.forEach((value, index, array) => {
        let table = document.createElement('table')
        table.style.width = '20%'

        let line = document.createElement('hr')
        line.style.width = '20%'
        line.style.marginLeft = '0'
        line.style.marginTop = '30px'

        ownerList.appendChild(line)
        
        let name = table.insertRow()
        name.insertCell().innerHTML = '<b>Name:</b>'
        name.insertCell().innerHTML = value.name

        let status = table.insertRow()
        status.insertCell().innerHTML = '<b>Status:</b>'
        status.insertCell().innerHTML = value.status

        let lat = table.insertRow()
        lat.insertCell().innerHTML = '<b>Latitude:</b>'
        lat.insertCell().innerHTML = value.latitude

        let long = table.insertRow()
        long.insertCell().innerHTML = '<b>Longitude:</b>'
        long.insertCell().innerHTML = value.longitude

        if (value.start !== null && value.end !== null) {
            let start = table.insertRow()
            start.insertCell().innerHTML = '<b>Start:</b>'
            start.insertCell().innerHTML = value.start

            let end = table.insertRow()
            end.insertCell().innerHTML = '<b>End:</b>'
            end.insertCell().innerHTML = value.end
        }

        if (value.duration !== null) {
            let duration = table.insertRow()
            duration.insertCell().innerHTML = '<b>Duration:</b>'
            duration.insertCell().innerHTML = value.duration
        }

        ownerList.appendChild(table)

        if (value.description !== undefined && value.description !== null) {
            let descTitle = document.createElement('h5')
            descTitle.innerHTML = 'Description:'
            descTitle.style.marginBottom = '0'

            ownerList.appendChild(descTitle)

            let description = document.createElement('div')
            description.innerHTML = value.description

            ownerList.appendChild(description)
        }

        let map = document.createElement('div')
        map.id = 'map'+value.id
        map.style.width = '20%'
        map.style.height = '200px'

        ownerList.appendChild(map)

        initMap(value.latitude, value.longitude, 'map'+value.id)
    })
}  

function initMap(lat, lng, id) {
    // Adds icon to map
    let iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat])),
        name: 'Artifact Location',
    });

    // Map with lat long
    let map = new ol.Map({
        target: id,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                  features: [iconFeature]
                }),
                style: new ol.style.Style({
                  image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                  })
                })
              })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lng, lat]),
            zoom: 6
        })
    });
}