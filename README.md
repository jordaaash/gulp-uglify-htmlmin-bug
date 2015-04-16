# gulp-uglify-htmlmin-bug

Steps to reproduce:
```
git clone https://github.com/jordansexton/gulp-uglify-htmlmin-bug.git
cd gulp-uglify-htmlmin-bug
npm install
gulp fail

[04:20:18] Starting 'fail'...
[04:20:18] Starting 'clean'...
[04:20:18] Finished 'clean' after 16 ms
[04:20:18] Starting 'minify:html'...
[04:20:18] Finished 'minify:html' after 117 ms
[04:20:18] Starting 'minify:js'...

events.js:141
      throw er; // Unhandled 'error' event
            ^
TypeError: undefined is not a function
```

Alternatively:
```
gulp succeed

[04:20:24] Starting 'succeed'...
[04:20:24] Starting 'clean'...
[04:20:24] Finished 'clean' after 16 ms
[04:20:24] Starting 'minify:js'...
[04:20:24] Finished 'minify:js' after 37 ms
[04:20:24] Starting 'minify:html'...
[04:20:24] Finished 'minify:html' after 111 ms
[04:20:24] Finished 'succeed' after 167 ms
```

The issue appears to be related to running `gulp-htmlmin` first with the `minifyJS` option.
