import DS from 'ember-data';

export default DS.Model.extend({
  title:      DS.attr(),
  lat:        DS.attr(),
  lon:        DS.attr(),
  radius:     DS.attr(),
  created_at: DS.attr()
});
