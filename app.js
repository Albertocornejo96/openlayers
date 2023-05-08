window.onload=inicio;
function inicio(){



//colores personalizados por el Fundo
var colfundo = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[0,0,0,0]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,1],
        width:2
    })
})


// Define la función de estilo para las capas de tipo punto
function puntoStyleFunction(feature, resolution) {
    var nivel = feature.get('NIVEL');
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8, // Define el tamaño del círculo
        fill: new ol.style.Fill({
          color: 'blue' // Define el color de relleno del círculo
        }),
        stroke: new ol.style.Stroke({
          color: 'white', // Define el color del borde del círculo
          width: 2 // Define el ancho del borde del círculo
        })
      }),
      text: new ol.style.Text({
        text: nivel.toString(), // Texto de la etiqueta
        font: '9px Arial', // Define el tipo de letra y tamaño
        fill: new ol.style.Fill({
          color: '#fff' // Define el color del texto
        })
      })
    });
  }

//Etiquetado para el vector Fundo
  var estilosfundo = function(feature) {
    var fundogeojson = feature.get('MODULO') + feature.get('TURNO') + '\n' + feature.get('LOTE');
  
    var etiquetafundo = new ol.style.Style({
      text: new ol.style.Text({
        font: 'bold 10px Arial',
        text: fundogeojson,
        scale: 1.2,
        fill: new ol.style.Fill({
          color: [255, 255, 255, 0.8] // Color de relleno de la máscara blanca
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1], // Color del borde de la etiqueta
          width: 2 // Ancho del borde de la etiqueta
        })
      })
    });
  
    feature.setStyle([colfundo, etiquetafundo]);
  };
  

//colores personalizados por el color 1
 var col1 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[215, 25, 28, 1.00]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:2
    })
})


//colores personalizados por el NDVI 1
var colndvi1 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[215, 25, 28, 1.00 ]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:0
    })
})

//colores personalizados por el NDVI 2
var colndvi2 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[253, 174, 97, 1.00]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:0
    })
})

//colores personalizados por el NDVI 3
var colndvi3 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[ 255, 255, 192, 1.00]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:0
    })
})

//colores personalizados por el NDVI 4
var colndvi4 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[166, 217, 106, 1.00]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:0
    })
})

//colores personalizados por el NDVI 5
var colndvi5 = new ol.style.Style({
    fill : new ol.style.Fill({
        color:[26, 150, 65, 1.00]
    }),    
    stroke : new ol.style.Stroke({
        color:[0,0,0,0],
        width:0
    })
})

//funcion para etiquetas y colores personalizados
var estiloscol1=function(feature){    
    var NDVIgeojson=feature.get('NIVEL');
    if (NDVIgeojson==1){
        feature.setStyle([colndvi1])
    }
    if (NDVIgeojson==2){
        feature.setStyle([colndvi2])
    }
    if (NDVIgeojson==3){
        feature.setStyle([colndvi3])
    }
    if (NDVIgeojson==4){
        feature.setStyle([colndvi4])
    }
    if (NDVIgeojson==5){
        feature.setStyle([colndvi5])
    }
}

// Adicionar una capa vectorial de NDVI desde un geojson
var NDVIgeojson = new ol.layer.Vector({
    source: new ol.source.Vector({
        url:'data/NDVI_SANTO DOMINGO.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible:true,
    title:'NDVI',
    style: estiloscol1
})

//Adicionar una capa vectorial de Fundo desde un geojson
var fundogeojson = new ol.layer.Vector({
    source: new ol.source.Vector({
        url:'data/SANTO_DOMINGO.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible:true,
    title:'Santo Domingo',
    style: estilosfundo
})

//Adicionar una capa vectorial de Muestras desde un geojson
var Muestrasgeojson = new ol.layer.Vector({
    source: new ol.source.Vector({
        url:'data/MUESTRAS.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible:true,
    title:'Muestras',
    style: puntoStyleFunction
})


var vistaMapa=new ol.View({
    center:[-78.906348,-8.115796],// longitud, latitud
    zoom:16.5,
    projection:'EPSG:4326'//Datum: WGS84 Geográficas:4326
});

const map = new ol.Map({
    view: vistaMapa,
    //layers:[basemapOSM,wmsLayer,restLayer],
    target:"mapa",
    controls:[]
  })
  
var basemapBlanco = new ol.layer.Tile({
    title: 'Blanco',
    type: 'base',
    visible: false
});     
var basemapBing = new ol.layer.Tile({
    title:'Bing Map',
    type:'base',
    visible:true,
    source: new ol.source.BingMaps({
        key:'Anzbo5_U1A0SuxVZpc8rqUBSRLsHmJ1ZgCGzhYnxXKpkpm9k3SuyK7OgitBhBPUs',
        imagerySet:'Aerial'
        })
}); 

var basemapOSM = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: false,
    type: 'base',
    source: new ol.source.OSM()
});

var basemapGoogleSatelite = new ol.layer.Tile({
    title:'Google Satellite',
    type:'base',
    visible:false,
    source: new ol.source.XYZ({
        url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        })
});

var basemapGoogle = new ol.layer.Tile({
    title:'Google Callejero',
    type:'base',
    visible:false,
    source: new ol.source.XYZ({
        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        })
});

var baseGroup = new ol.layer.Group({
    title: 'Mapas Base',
    fold: true,
    layers: [basemapBing, basemapGoogle, basemapOSM, basemapBlanco]
});

map.addLayer(baseGroup);

var mostrarCoordenadas = new ol.control.MousePosition({
    projection:'EPSG:4326',
    coordinateFormat: function(coordenada){
        return ol.coordinate.format(coordenada, '{y}, {x}', 6)
    }
});
map.addControl(mostrarCoordenadas);


    var pantallaCompleta = new ol.control.FullScreen();
    map.addControl(pantallaCompleta);

    var barraEscala = new ol.control.ScaleLine({
        bar:true,
        text:true
    });
    map.addControl(barraEscala);

    var overviewMap = new ol.control.OverviewMap({
        layers:[
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        collapsed:true
    });
    map.addControl(overviewMap);


var controlCapas=new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
});
map.addControl(controlCapas);

var overlayGroup = new ol.layer.Group({
    title: 'Capas Operacionales',
    fold: true,
    layers: [NDVIgeojson,fundogeojson, Muestrasgeojson
    ]
});
map.addLayer(overlayGroup);


//Adicionar un popup (ventana emergente)
var ventanaTitulo = document.getElementById('popup-title');
var ventanaContenido = document.getElementById('popup-content');
var ventanaContenedor = document.getElementById('popup-container');
var overlay = new ol.Overlay({
	element:ventanaContenedor
})

map.on('click',function(e){
	overlay.setPosition(undefined);
	map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
        var NIVEL = feature.get('NIVEL')
		var MIN =  Number(feature.get('I_MINIMO')).toFixed(3)
        var MAX = Number(feature.get('I_MAXIMO')).toFixed(3);
		map.addOverlay(overlay);
		ventanaContenido.innerHTML = 'RANGO NDVI' +'</iframe> ' + NIVEL+ ':[' + MIN + ' - ' + MAX + ']';
		overlay.setPosition(e.coordinate);
	})
})

var niveles = {
    "1": "#d7191c",
    "2": "#fdae61",
    "3": "#ffffc0",
    "4": "#a6d96a",
    "5": "#1a9641"
  };
  
  function estiloNDVIgeojson(NDVIgeojson) {
    var nivel = NDVIgeojson.get('NIVEL');
    var color = niveles[nivel];
    var estilo = new ol.style.Style({
      text: new ol.style.Text({
        text: nivel,
        fill: new ol.style.Fill({
          color: "#ffffff"
        }),
        stroke: new ol.style.Stroke({
          color: "#000000",
          width: 2
        })
      }),
      fill: new ol.style.Fill({
        color: color
      }),
      stroke: new ol.style.Stroke({
        color: "#000000",
        width: 2
      })
    });
    return estilo;
  }
  
  function generarLeyenda() {
    var leyenda = document.createElement("div");
    leyenda.className = "leyenda";
    
    // Agregar título de la leyenda
    var titulo = document.createElement("h4");
    titulo.textContent = "LEYENDA";
    leyenda.appendChild(titulo);
  
    // Agregar leyenda para cada nivel y su color correspondiente
    for (var nivel in niveles) {
      var color = niveles[nivel];
      var itemLeyenda = document.createElement("div");
      itemLeyenda.className = "leyenda-item";
      
      // Agregar color
      var colorBox = document.createElement("div");
      colorBox.className = "leyenda-color";
      colorBox.style.backgroundColor = color;
      itemLeyenda.appendChild(colorBox);
      
      // Agregar etiqueta
      var etiqueta = document.createElement("div");
      etiqueta.className = "leyenda-etiqueta";
      etiqueta.textContent = nivel;
      itemLeyenda.appendChild(etiqueta);
      
      leyenda.appendChild(itemLeyenda);
    }
  
    // Agregar la leyenda al DOM
    var contenedorLeyenda = document.getElementById("leyenda");
    contenedorLeyenda.appendChild(leyenda);
  }
  
  generarLeyenda();
  

}
