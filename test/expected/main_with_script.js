function() {
    $script("tmp/foo.js","foo");
    $script("tmp/bar.js","bar");
    $script.ready(["foo","bar"], function() {
        runMyApp();
    });
}