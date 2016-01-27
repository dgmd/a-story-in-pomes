function initialize() {

    var mapOptions = {
        center: {
            lat: 39,
            lng: -99
        },
        zoom: 5,

        // disables scroll-initiated zooming
        scrollwheel: false,

        // hides other scaling, zooming, and display options
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,

        //display satellite map w high level labels as default
        mapTypeId: google.maps.MapTypeId.HYBRID,
    };

    var styles = [
        //stuff placed in here will style the map -- when it is a road map displayed
        {
            featureType: "administrative.country",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }
    ];

    // defines map object and applies styling to that object
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({
        styles: styles
    });

    var icon = 'https://s3.amazonaws.com/kpomes/media/map-marker1.png';
    var markers = [];
    // items added to this list will be added to the navigation map at the top of the site
    markers[0] = new google.maps.Marker({
        position: new google.maps.LatLng(42.333172, -83.044960),
        map: map,
        icon: icon,
        title: 'Detroit, MI',
        url: '#detroit'
    });
    markers[1] = new google.maps.Marker({
        position: new google.maps.LatLng(38.004111, -80.944114),
        map: map,
        icon: icon,
        title: 'Clifftop, WV',
        url: '#clifftop'
    });
    markers[2] = new google.maps.Marker({
        position: new google.maps.LatLng(34.056915, -118.248311),
        map: map,
        icon: icon,
        title: 'Los Angelas, CA',
        url: '#la'
    });
    markers[3] = new google.maps.Marker({
        position: new google.maps.LatLng(28.539998, -81.370123),
        icon: icon,
        map: map,
        title: 'Orlando, FL',
        url: '#orlando'
    });

    // turns each map marker into a link
    for (var i = 0; i < markers.length; i++) {
        google.maps.event.addListener(markers[i], 'click', function() {
            window.location.href = this.url;
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var html = document.getElementsByTagName('html')[0];
var media_path_base = 'https://s3.amazonaws.com/kpomes/'


var detroit_bgimgs = ['media/detroit/detroit3.jpg', 
                        'media/detroit/detroit5.jpg', 
                        'media/detroit/detroit6.jpg', 
                        'media/detroit/detroit7.jpg', 
                        'media/detroit/detroit9.jpg', 
                        'media/detroit/detroit10.jpg'
                        ];
var clifftop_bgimgs = ['media/clifftop/clifftop2.jpg', 
                        'media/clifftop/clifftop3.jpg', 
                        'media/clifftop/clifftop4.jpg', 
                        'media/clifftop/clifftop5.jpg', 
                        'media/clifftop/clifftop12.jpg'
                        ];
var la_bgimgs = ['media/la/la1.jpg', 
                        'media/la/la4.jpg', 
                        'media/la/la5.jpg', 
                        'media/la/la6.jpg', 
                        'media/la/la7.jpg'
                        ];
var orlando_bgimgs = ['media/orlando/orlando1.jpg', 
                        'media/orlando/orlando2.jpg', 
                        'media/orlando/orlando4.jpg', 
                        'media/orlando/orlando6.jpg', 
                        'media/orlando/orlando7.jpg'    
                        ];

var sng_bgimgs = ['media/sng/sng1.JPG', 
                        'media/sng/sng2.JPG',
                        'media/sng/sng3.JPG',  
                        'media/sng/sng4.JPG', 
                        'media/sng/sng5.JPG', 
                        'media/sng/sng6.JPG', 
                        'media/sng/sng7.JPG'    
                        ];

var bgimgs = {"detroit":detroit_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "clifftop":clifftop_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "la":la_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "orlando":orlando_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}),
                "sng":sng_bgimgs.map(function(currentValue) {return media_path_base+currentValue;})

            };

var trips = document.getElementsByClassName('trip'); 
var bgimg_curr;
var bgimg_new;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var alt_splash = document.getElementById('alt-splash');
var splash = document.getElementById('splash')

window.onscroll = function(event) {

    change_bgimgs();
    make_navbar_sticky();

    function change_bgimgs() {
    // changes background image based on which trip's media is on currently the screen
        for (var i = 0; i < trips.length; i++) {
            var trip_loc = trips[i].querySelector('h1').id;

            //defines transition point when scrolling up && down, respectively
            if (screen.height / 4 >= trips[i].getBoundingClientRect().top && screen.height / 4 <= trips[i].getBoundingClientRect().bottom) {
                if (bgimgs[trip_loc].indexOf(bgimg_curr) >= 0) {
                    // if current bgimg is in set of pics associated with this trip, don't change bgimg 
                    bgimg_new = bgimg_curr;
                } else {
                    // if current bgimg is not in set of pics associated with this trip, display new pic chosen randomly from this trip's image collection
                    bgimg_curr = bgimgs[trip_loc][(Math.floor(Math.random() * bgimgs[trip_loc].length))];
                    bgimg_new = bgimg_curr;

                    html.style.background = 'url(' + bgimg_new + ') no-repeat center center fixed';
                    html.style.backgroundSize = 'cover';
                }
            }
        }
    };

    function make_navbar_sticky() {
        // creates navbar below splash page map which sticks to top of screen when page is scrolled past map
        var nav = document.getElementById('nav');
        if ((getComputedStyle(alt_splash).getPropertyValue('display') !== 'none' && alt_splash.getBoundingClientRect().bottom <= 0) || 
            (getComputedStyle(splash).getPropertyValue('display') !== 'none' && splash.getBoundingClientRect().bottom <= 0)) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
        } else {
            console.log(!splash.style.display + "    " + splash.getBoundingClientRect().bottom);
            nav.style.position = 'relative';
        }
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var splash_toggle = document.getElementById('splash-toggle');
splash_toggle.addEventListener('click', toggleSplash)

function toggleSplash() {
    var navToTop = document.getElementById('top');
    if (getComputedStyle(alt_splash).getPropertyValue('display') == 'none') {
        alt_splash.style.display = 'block';
        splash.style.display = 'none';
        navToTop.href = '#alt-splash';
    } else if (getComputedStyle(splash).getPropertyValue('display') == 'none') {
        splash.style.display = 'block';
        alt_splash.style.display = 'none';        
        navToTop.href = '#splash';
    }
}

function nav_onclick(e) {
    // rotates through trip-specific bgimgs if same nav link clicked multiple times
    if (document.URL == e.target.href) {
        var loc = document.URL.split('#')[1]; // parse trip name from current url
        var trip_pics = bgimgs[loc]; // grabs list of trip related bgimgs
        var random_trip_pic = trip_pics[(Math.floor(Math.random() * trip_pics.length))];

        html.style.background = 'url(' + random_trip_pic + ') no-repeat center center fixed';
        html.style.backgroundSize = 'cover';
    }
}

for (var i=0; i<document.getElementsByClassName("nav_button").length; i++) {
    document.getElementsByClassName("nav_button")[i].addEventListener("click", nav_onclick)
}

// setting individual links to poems
function setting_pome_link(pome_block) {
    pome_block.querySelector('h2 a').href="#"+pome_block.id;
}

var pome_blocks = Array.prototype.slice.call(document.getElementsByClassName('pome-block'));
for (i=0; i<pome_blocks.length; i++) {
    setting_pome_link(pome_blocks[i])
}

// storing poem info in pome-block data-attributes
var attributes = ['year', 'month', 'day', 'time', 'trip', 'author'];
pome_blocks.forEach(function(pome_block, index) {
    attributes.forEach(function(attribute, index) {
        pome_block.setAttribute('data' + '-' + attributes[index], pome_block.id.split('-')[index]);
    });
});

function generate_byline(pome_block) {
// creates a byline for each poem based on info encoded in pome-block id
    var newdiv = document.createElement('div');

    // styles time to look like digital clock time with ":"
    var time_tmp = pome_block.getAttribute('data-time');
    var time = time_tmp.match(/.{1,2}/g)[0] + ":" + time_tmp.match(/.{1,2}/g)[1];

    // constructs byline from id contents
    newdiv.setAttribute('class', 'byline')
    newdiv.innerHTML = "written by " + pome_block.getAttribute('data-author') + " on " + pome_block.getAttribute('data-month') + "." + pome_block.getAttribute('data-day') + "." + pome_block.getAttribute('data-year') + " at " + time + " EST";

    return newdiv;
};

function place_bylines() {
    for (i=0; i<pome_blocks.length; i++) {
        // inserts byline after h2 elements (e.g. poem titles) 
        parentdiv = pome_blocks[i].querySelectorAll('h2')[0];
        parentdiv.appendChild(generate_byline(pome_blocks[i]));
    }
};

place_bylines();

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// connects built-in camera and reads output to take still picture

(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      startbutton  = document.querySelector('#startbutton'),
      width = 600,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// logic for identifying the color of images taken with the camera

var canvasObj = document.getElementById('canvas');

function avgColor(canvasObj) {
    var context = canvasObj.getContext('2d');
    var rgb = {
        r: 102,
        g: 102,
        b: 102
    }; // Set a base colour as a fallback for non-compliant browsers
    var pixelInterval = 5; // Rather than inspect every single pixel in the image inspect every 5th pixel
    var count = 0;
    var i = -4;
    var data;
    var length;

    try {
        data = context.getImageData(0, 0, canvasObj.width, canvasObj.height);
    } catch (e) {
        // catch errors - usually due to cross domain security issues
        alert(e);
    }

    data = data.data;
    length = data.length;
    while ((i += pixelInterval * 4) < length) {
        count++;
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
    }

    // floor the average values to give correct rgb values (ie: round number values)
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
}

function distanceBetween(p1, p2) { 
    // p1,p2 should both in the form of {r:#,b:#,g:#}
    var dist = Math.sqrt(Math.pow((p2.r - p1.r), 2) + Math.pow((p2.g - p1.g), 2) + Math.pow((p2.b - p1.b), 2));
    return dist;
}

function identifyColor(avgImgColor) {
    var colorTests = {};
    colorTests['red'] = {r:255,g:0,b:0};
    colorTests['green'] = {r:0,g:255,b:0};
    colorTests['blue'] = {r:0,g:0,b:255};
    colorTests['white'] = {r:255,g:255,b:255};
    colorTests['black'] = {r:0,g:0,b:0};  
    colorTests['yellow'] = {r:255,g:255,b:0};
    colorTests['magenta'] = {r:255,g:0,b:255};
    colorTests['cyan'] = {r:0,g:255,b:255}

    distDict = {};        
    for (color in colorTests) {
      distDict[distanceBetween(avgImgColor, colorTests[color])] = color;
    }
    
    var minDist = Math.min.apply(Math, Object.keys(distDict));
    
    var imgColor = distDict[minDist]

    console.log(imgColor);
    return imgColor;
};

//activates the camera-based splash picture taking ability
startbutton = document.querySelector('#startbutton');
startbutton.addEventListener('click', function() {
    window.location.href = '#' + identifyColor(avgColor(canvasObj));
});
