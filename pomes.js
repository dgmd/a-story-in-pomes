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

var bgimgs = {"detroit":detroit_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "clifftop":clifftop_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "la":la_bgimgs.map(function(currentValue) {return media_path_base+currentValue;}), 
                "orlando":orlando_bgimgs.map(function(currentValue) {return media_path_base+currentValue;})
            };

var trips = document.getElementsByClassName('trip'); 
var bgimg_curr;
var bgimg_new;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        var map = document.getElementById('map-canvas');
        var nav = document.getElementById('nav');
        if (map.getBoundingClientRect().bottom <= 0) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
        } else {
            nav.style.position = 'relative';
        }
    };
}

window.onload = function() {

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

}
