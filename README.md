# GA2AT

GA2AT is a Google Analytics (analytics.js) plugin, duplicating GA tracking to AT Internet.

## Usage

Integrate the gat.js script into your website:

```html
<script async src="gat.js"></script>
```

Ask GA to use the plugin, with the plugin's parameters:

```javascript
ga('require', 'GA2AT', {site:123456, log:'log.xiti.com', pixel:'hit'})
```

|Parameter|Description      |Mandatory?         |Default value  |
|---------|-----------------|:-----------------:|---------------|
|`site`   |Site number      |:heavy_check_mark: |`null`         |
|`log`    |Collection domain|:heavy_check_mark: |`logp.xiti.com`|
|`pixel`  |Pixel path       |:x:                |`hit.xiti`     |

### Full integration example

```html
<head>
  <title>GA2AT</title>
  <!-- Google Analytics -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // Create the GA tracker
    ga('create', 'UA-XXXXXX-XX', 'auto');

    // Add GA2AT plugin
    ga('require', 'GA2AT', {site:123456, log:'logp.xiti.com', pixel:'hit'})

    // Send a pageview
    ga('send', 'pageview');
  </script>
  <!-- End Google Analytics -->

  <!-- Call gat.js plugin -->
  <script async src="gat.js"></script>
</head>
```

## How it works

GA2AT plugs on [analytics.js tasks](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks) to catch data sent to GA and rework it to create AT Internet hits.

## Duplicated hit types

This plugin doesn't duplicate all the data sent to GA.
Here are the hit types duplicated, and how the will be converted to AT Internet

### `pageview`

The most common GA hit type. Measure page views.
In AT Internet, it will be tracked as a page view too.

### `event`

Measure various events.
In AT Internet, it will be tracked as an action click, following this pattern:

|AT Internet property|Value            |
|--------------------|-----------------|
|Chapter 1           |`{eventCategory}`|
|Chapter 2           |`{eventAction}`  |
|Chapter 3           |`{eventLabel}`   |
|Click name          |`{eventValue}`   |


### `social`

Measure social interactions.
In AT Internet, it will be tracked as an action click, following this pattern:

|AT Internet property|Value            |
|--------------------|-----------------|
|Chapter 1           |`social`         |
|Chapter 2           |`{socialNetwork}`|
|Chapter 3           |`{socialAction}` |
|Click name          |`{socialTarget}` |
