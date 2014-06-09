$script.ready('foo', function() {
function dependsOnFoo() {
    this.test = 1;
}
});