
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  ;

var app = express();

poet = require('poet')(app);

var locals = { 
  title: "Patrick Simpson"
};

poet.set({
  posts: './_posts/',  // Directory of posts
  postsPerPage: 5,     // Posts per page in pagination
  metaFormat: 'json',  // meta formatter for posts
  readMoreLink: function (post) {
    // readMoreLink is a function that
    // takes the post object and formats an anchor
    // to be used to append to a post's preview blurb
    // and returns the anchor text string
  },
  readMoreTag: '<!--more-->' // tag used to generate
  // the preview. More in 'preview' section
}).createPostRoute()
  .createPageRoute()
  .createTagRoute()
  .createCategoryRoute()
  .init(function ( locals ) {
    locals.postList.forEach(function ( post ) {
    // We can iterate over each post and alter
    // its properties, add new fields, custom
    // preview formatter or format the dates
  });
});

app.set( 'view engine', 'jade' );
//app.set( 'views', __dirname + '/views' );
//app.use( express.static( __dirname + '/public' ));
app.use( poet.middleware() );
//app.use( app.router );

app.get( '/post/:post', function ( req, res ) {
  console.log("got here");
  var post = req.poet.getPost( req.params.post );
  if ( post ) {
    console.log("got here");
    res.render( 'post', { post: post }); 
  } else {
    res.send(404);
  }
});

app.get( '/tag/:tag', function ( req, res ) {
  var taggedPosts = req.poet.postsWithTag( req.params.tag );
  if ( taggedPosts.length ) {
    res.render( 'tag', {
      posts : taggedPosts,
      tag : req.params.tag
    });
  }
});

app.get( '/category/:category', function ( req, res ) {
  var categorizedPosts = req.poet.postsWithCategory( req.params.category );
  if ( categorizedPosts.length ) {
    res.render( 'category', {
      posts : categorizedPosts,
      category : req.params.category
    });
  }
});

app.get( '/page/:page', function ( req, res ) {
  var page = req.params.page,
    lastPost = page * 3
  res.render( 'page', {
    posts : req.poet.getPosts( lastPost - 3, lastPost ),
    page : page
  });
});

app.get( '/', function ( req, res ) { 
  res.render( 'index', locals);

});
console.log("Listening on 3000");
app.listen( 3000 );
