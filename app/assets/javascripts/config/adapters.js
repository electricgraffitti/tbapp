// var get = Ember.get;

// TBook.LocalStorageAdapter = Ember.RESTAdapter.extend({

//   findAll: function (klass, records) {
//     var url = this.buildURL(klass),
//         localStorageData = this.getLocalStorageData(klass, url),
//         self = this;

//     if (!!localStorageData) {
//       return new Ember.RSVP.Promise(function (resolve, reject) {
//         Ember.run(records, records.load, klass, localStorageData);
//         resolve(records);
//       });
//     } else {
//       return this.ajax(url).then(function (data) {
//         self.storeLocalStorageData(klass, url, data);
//         Ember.run(records, records.load, klass, data);
//         return records;
//       });
//     }
//   },

//   getLocalStorageData: function (klass, key) {
//     var sliding = klass.localStorageSlidingExpiration,
//         hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
//         item, itemExpirationTime,
//         now = new Date(),
//         then = new Date();

//     if (!hasLocalStorage) return null;
    
//     item = localStorage.getItem(key);

//     if (Ember.isEmpty(item)) return null;

//     item = JSON.parse(item);
//     itemExpirationTime = item.expirationTime

//     if (itemExpirationTime !== null && itemExpirationTime !== undefined && itemExpirationTime % 1 == 0) {
//       then.setTime(itemExpirationTime);
//       if (now >= then) {
//         localStorage.removeItem(key);
//         return null;
//       }

//       if (sliding === true) {
//         this.storeLocalStorageData(klass, key, item.value);
//       }
//       return item.value;
//     }

//     return null;
//   },

//   storeLocalStorageData: function (klass, key, value) {
//     var item = {},
//         now = new Date(),
//         allowedLifespanMinutes = klass.localStorageAllowedLifespanMinutes;

//     if (allowedLifespanMinutes === undefined) {
//       return null;
//     }
    
//     now.setMinutes(now.getMinutes() + allowedLifespanMinutes);
//     item.expirationTime = now.getTime();
//     item.value = value;

//     localStorage.setItem(key, JSON.stringify(item));
//   }
// });