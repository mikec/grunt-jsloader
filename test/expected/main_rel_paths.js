function() {
    $script("foo.js","foo");
    $script("bar.js","bar");
    $script.ready(["foo","bar"], function() {
        runMyApp();
    });
}