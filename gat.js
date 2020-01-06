function GA2AT(tracker, config) {
  var site = config.site || null;
  var log = config.log || 'logp.xiti.com';
  var pixel = config.pixel || 'hit.xiti';

  ga(function(tracker) {

    var originalSendHitTask = tracker.get('sendHitTask');

    tracker.set('sendHitTask', function(model) {
      originalSendHitTask(model);

      let hitParams = null;

      if(site) {
        const pageLabel = tracker.get('title');
        const hitType = tracker.get('hitType');

        if(hitType === 'pageview') {
          hitParams = `&p=${pageLabel}`;
        }

        if(hitType === 'social') {
          const socialNetwork = tracker.get('socialNetwork') || '';
          const socialAction = tracker.get('socialAction') || '';
          const socialTarget = tracker.get('socialTarget') || '';

          hitParams = `&p=social::${socialNetwork}::${socialAction}::${socialTarget}&click=a&type=click&pclick=${pageLabel}`;
        }

        if(hitType === 'event') {
          const eventCategory = tracker.get('eventCategory') || '';
          const eventAction = tracker.get('eventAction') || '';
          const eventLabel = tracker.get('eventLabel') || '';
          const eventValue = tracker.get('eventValue') || '';

          hitParams = `&p=${eventCategory}::${eventAction}::${eventLabel}::${eventValue}&click=a&type=click&pclick=${pageLabel}`;
        }

        if (hitParams) {
          const idclient = tracker.get('clientId');
          const ref = tracker.get('referrer') || '';
          const base = `https://${log}/${pixel}?s=${site}&idclient=${idclient}`;
          const suffix = `&ref=${ref}`;

          const hit = base + hitParams + suffix
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

function providePlugin(pluginName, pluginConstructor) {
  var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
  if (typeof ga == 'function') { ga('provide', pluginName, pluginConstructor); }
}

providePlugin('GA2AT', GA2AT);