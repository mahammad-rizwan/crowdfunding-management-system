const Admin = require('../models/Admin');  
const Campaign = require('../models/Campaign');  
const db = require('../config/dbConnect');  

const adminController = {

  createAdmin: (req, res) => {
    const { name, email, contactNumber, password } = req.body;  


    Admin.createAdmin(name, email, contactNumber, password)  
      .then((result) => {
        res.status(201).send('Admin created successfully');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error creating admin');
      });
  },

  getAdmin: (req, res) => {
    const email = req.params.email;  
    
    Admin.getAdminByEmail(email)
      .then((admin) => {
        if (admin) {
          res.status(200).json(admin);  
        } else {
          res.status(404).send('Admin not found');  
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching admin data');
      });
  },

  showwaitinglist: (req, res) => {
    
    Campaign.getCampaignsByStatus('hold')
      .then((waitingListCampaigns) => {
        res.render('waitinglist', {
          waitingListCampaigns: waitingListCampaigns || [], 
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching campaigns');
      });
  },


  approveCampaign: (req, res) => {
    const title = req.params.title;
    
    
    Campaign.updateCampaignStatus(title, 'ongoing')
      .then(() => {
        console.log('Campaign approved and moved to ongoing!');
        res.redirect("/admin/waitinglist");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error2 approving campaign');
      });
  },

  completeCampaign: (req, res) => {
    const title = req.params.title;
    
    Campaign.updateCampaignStatus(title, 'completed')
      .then(() => {
        console.log('Campaign approved and moved to completed!');
        res.redirect("/admin/editCampaign");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error2 approving campaign');
      });
  },


  rejectCampaign: (req, res) => {
    const title = req.params.title;

    Campaign.deleteCampaignByTitle(title)
      .then(() => {
        res.redirect('/admin/waitinglist');
        
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error rejecting campaign');
      });
  },

  deleteCampaign: (req, res) => {
    const title = req.params.title;
    
    Campaign.deleteCampaignByTitle(title)
      .then(() => {
        res.redirect('/admin/editCampaign');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error rejecting campaign');
      });
  },
};

module.exports = adminController;
