const Gallery = require('../models/Gallery'); 

const galleryController = {

  uploadPhotos: (req, res) => {
    const campaignTitle = req.body.title;
    const photos = req.files;

    if (!campaignTitle || photos.length === 0) {
      return res.status(400).send('Campaign title and at least one photo are required');
    }


    const uploadPromises = photos.map((photo) => {
      const fileType = photo.mimetype; 
      const photoUrl = `/uploads/gallery/${photo.filename}`; 
      return Gallery.addPhoto(fileType, campaignTitle, photoUrl);
    });

    Promise.all(uploadPromises)
      .then(() => {
      })
      .catch((err) => {
        console.error('Error uploading photos:', err);
      });
  },

  getPhotosByCampaign: (req, res) => {
    const campaignTitle = req.params.title;

    Gallery.getPhotosByCampaign(campaignTitle)
      .then((photos) => {
        if (photos.length === 0) {
          return res.status(404).send('No photos found for this campaign');
        }
        res.status(200).json(photos);
      })
      .catch((err) => {
        console.error('Error fetching photos:', err);
        res.status(500).send('Error fetching photos');
      });
  },

  deletePhotosByCampaign: (req, res) => {
    const campaignTitle = req.params.title;

    Gallery.deletePhotosByCampaign(campaignTitle)
      .then(() => {
        res.status(200).send('Photos deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting photos:', err);
        res.status(500).send('Error deleting photos');
      });
  },
};

module.exports = galleryController;
