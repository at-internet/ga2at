function GA2AT(tracker, config) {
  var site = config.site || null;
  var log = config.log || 'logp.xiti.com';
  var pixel = config.pixel || 'hit.xiti';
  var useTitle = config.useTitle || false;

  ga(function (tracker) {

    var originalSendHitTask = tracker.get('sendHitTask');

    tracker.set('sendHitTask', function (model) {
      originalSendHitTask(model);

      var hitParams = null;

      if (site) {
        var pageLabel = '';
        if(useTitle) { pageLabel = tracker.get('title'); }
        var hitType = tracker.get('hitType');

        if (hitType === 'pageview') {
          hitParams = '&p=' + encodeURIComponent(pageLabel);
        }

        if (hitType === 'social') {
          var socialNetwork = tracker.get('socialNetwork') || '';
          var socialAction = tracker.get('socialAction') || '';
          var socialTarget = tracker.get('socialTarget') || '';

          hitParams = '&p=social::' + encodeURIComponent(socialNetwork) + '::' + encodeURIComponent(socialAction) + '::' + encodeURIComponent(socialTarget) + '&click=a&type=click&pclick=' + encodeURIComponent(pageLabel);
        }

        if (hitType === 'event') {
          var eventCategory = tracker.get('eventCategory') || '';
          var eventAction = tracker.get('eventAction') || '';
          var eventLabel = tracker.get('eventLabel') || '';
          var eventValue = tracker.get('eventValue') || '';

          hitParams = '&p=' + encodeURIComponent(eventCategory) + '::' + encodeURIComponent(eventAction) + '::' + encodeURIComponent(eventLabel) + '::' + encodeURIComponent(eventValue) + '&click=a&type=click&pclick=' + encodeURIComponent(pageLabel);
        }

        if (hitParams) {
          var idclient = tracker.get('clientId');
          var ref = tracker.get('referrer') || '';
          var base = 'https://' + log + '/' + pixel + '?s=' + site + '&idclient=' + idclient;
          var suffix = '&ref=' + ref;

          var hit = base + hitParams + suffix
          if (navigator.sendBeacon) {
            navigator.sendBeacon(hit);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', hit, true);
            xhr.send(null);
          }
        }
      }
    });
  });
}

function providePlugin(pluginName, pluginvarructor) {
  var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
  if (typeof ga == 'function') { ga('provide', pluginName, pluginvarructor); }
}

providePlugin('GA2AT', GA2AT);