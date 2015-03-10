const Images = require('../models/image');

exports = module.exports = function applyBadgeRoutes (server) {

  server.get('/public/images/:imageId', function (req, res, next) {
    const query = {slug: req.params.imageId};

    Images.getOne(query, function (err, image) {
      if (err) {
        res.send(404, {error: 'not found'});
        return next();
      }

      if (image.url) {
        var location = image.url.toString('ascii');
        res.header('Location', location);
        res.send(301, {location: location});
        return next();
      }

      res.header('Content-Type', image.mimetype.toString('ascii'));
      res.send(image.data);
      return next();
    });
  });

}
