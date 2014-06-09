function() {
    $script("tmp/foo.js","foo");
    $script("tmp/depends_on_foo.js","fooPlugin");
    $script.ready(["foo","fooPlugin"], function() {
        runMyApp();
    });
}