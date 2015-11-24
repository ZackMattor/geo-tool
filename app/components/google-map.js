import Ember from 'ember';

export default Ember.Component.extend({
  markers: [],

  currentId: 0,

  circles: [],

  map: null,
  classNames: ['map-object'],

  didInsertElement: function() {
    this._getLocation().then(function(location) {
      console.log('WE GOT THE LOCATION');
      console.log(location);
      var map = new google.maps.Map(this.$()[0], {
        center: location,
        zoom: 3
      });

      this.set('map', map);

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE
          ]
        },
        circleOptions: {
          fillColor: '#299AE6',
          fillOpacity: 0.3,
          strokeWeight: 1,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      });

      // Wire up events
      drawingManager.addListener('circlecomplete', this._circleCreated.bind(this));

      drawingManager.setMap(map);
    }.bind(this));
  },

  _circleCreated: function(circle) {
    console.log(circle.center.lat());
    console.log(circle.center.lng());
    console.log(circle.radius);

    circle.id = this.incrementProperty('currentId');

    let scope = {
      circle: circle,
      self: this
    };

    circle.addListener('radius_changed', this._circleUpdated.bind(scope));
    circle.addListener('center_changed', this._circleUpdated.bind(scope));
  },

  _circleUpdated: function() {
    console.log('Got an update for circle id: ' + this.circle.id);
  },

  _getLocation: function() {
    var promise = new Ember.RSVP.Promise(function(resolve) {
      //if (navigator.geolocation) {
      if(false) {
        console.log('Waiting for location');
        navigator.geolocation.getCurrentPosition(function(location) {
          resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          });
        });
      } else {
        resolve({
          lat: 42.9905605,
          lng: -71.4417947
        });
      }

    });

    return promise;

  }
});
