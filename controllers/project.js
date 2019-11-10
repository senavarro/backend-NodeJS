'use stric'

var Project = require('../models/project');
var fs = require('fs');

var controller = {
    home: function(req,res){
        return res.status(200).send({
            message: 'Homepage'
        })
    },
    test: function(req,res){
        return res.status(200).send({
            message: "Test method of project controller"
        })
    },

    saveProject: function(req,res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored)=>{
            if(err)return res.status(500).send({
                message: "Error in the request, couldn't be saved"
            });
            if(!projectStored) return res.status(404).send({
                message: "Couldn't save the project"
            });
            
            return res.status(200).send({project: projectStored});
        });
        
        

        return res.status(200).send({
            project: project,
            message: "Method saveProject"
        })
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        Project.findById(projectId, (err, project)=>{

            if(projectId == null){
                return res.status(404).send({message:'Project not found'});
            }

            if(err) return res.status(500).send({message: 'Error returning data'});

            if(!project) return res.status(404).send({message:'Project not found'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects(req, res){
        Project.find({}).sort('-year').exec((err, projects)=>{

            if(err) return res.status(500).send({message: 'Error returning data'});

            if(!projects) return res.status(404).send({message: 'Projects not found'});

            return res.status(200).send({projects});
        })
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated)=>{
            if(err) return res.status(500).send({
                message: 'Error updating'
            });
            
            if(!projectUpdated) return res.status(404).send({message: "Project not found"});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req,res){
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({message: "Error, couldn't delete project"});

            if(!projectDeleted) return res.status(404).send({message: "Couldn't find and delete the project"});

            return res.status(200).send({
                project: projectRemoved,
                message: "Project removed"
            })
        })
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated )=>{
                    if(err) return res.status(500).send({message: 'Error, file not uploaded'});
    
                    if(!projectUpdated) return res.status(404).send({message: 'File not found'})
                    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            }else{

                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'file extension not valid'});
                });
            }


        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    }
};

module.exports = controller; 