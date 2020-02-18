const express = require('express')
const FolderService = require('./folders-service')

const folderRouter = express.Router()
const jsonParser = express.json()

const serializeFolders = folder =>({
    id: folder.id,
    name: folder.name,
})

folderRouter
    .route('/')
    .get((req,res,next)=>{
        const knexInstance = req.app.get('db')
        FolderService.getAllFolders(knexInstance)
        .then(folders=>{
            res.json(folders.map(serializeFolders))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name} = req.body
        const newFolder = {id, name}
        for (const [key, value] of Object.entries(newFolder))
            if(value == null)
                return res.status(400)
                .json({ error: {message: `Missing ${key} in request body`}
                })
        FoldersService.insertFolder(
            req.app.get('db'),
            newFolder
        )
        .then(folder =>{
            res 
                .status(201)
                .location(path.join(req.originalUrl, `/${folder.id}`))
                .json(serializeFolders(folder))
        })
        .catch(next)
    })

    folderRouter  
        .route('/:folder_id')
        .all((req, res, next) => {
            FoldersService.getById(
                req.app.get('db'),
                req.params.folder_id
            )
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: {message: `Folder doesn't exist`}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
        })
        .get((req,res,next) => {
            res.json(serializeFolders(res.folder))
        })
        // .delete((req,res,next) => {
        //     FolderService.deleteFolder(
        //         req.app.get('db'),
        //         req.params.folder_id
        //     )
        //     .then(removeRows => {
        //         res.status(204).end()
        //     })
        //     .catch(next)
        // })
        // .patch(jsonParser, (req, res, next) => {
        //     const {name} = req.body
        //     const updateFolder = {name}
        //     const numValues = Object.values(updateFolder).filter(Boolean).length
        //     if(numValues===0)
        //         return res.status(400).json({
        //             error: {
        //                 message: 'Request body must contain folder name'
        //             }
        //         })
        //     FolderService.updateFolder(
        //         req.app.get('db'),
        //         req.params.folder_id,
        //         updateFolder
        //     )
        //     .then(removeRows => {
        //         res.status(204).end()
        //     })
        //     .catch(next)
        // })

module.exports = folderRouter
