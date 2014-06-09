$script("tmp/foo.js","foo");
$script.ready(["foo"], function() {
    runMyApp();
});