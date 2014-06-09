function() {
    $script("foo.js","foo");
    $script("depends_on_foo.js","fooPlugin");
    $script.ready(["foo","fooPlugin"], function() {
        runMyApp();
    });
}