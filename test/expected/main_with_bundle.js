function() {
    $script("tmp/foo.js","foo");
    $script(["tmp/bar.js","tmp/baz.js"],"stuff");
    $script.ready(["foo","stuff"], function() {
        runMyApp();
    });
}