function() {
    $script("foo.js","foo");
    $script.ready(["foo"], function() {
        runMyApp();
    });
}