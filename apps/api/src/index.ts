/**
 * Module principal de l'application.
 * @module app
 */

import * as Cors from 'cors'

import * as express from 'express'
import { Application, Request, Response } from 'express'
import { DB_NAME, MESSAGES } from './config'
import Client from './models/Client'
import MongoClient from './mongoclient'
import { getCheckAccount } from './service'

const app: Application = express()
const port: number = parseInt(process.env.PORT ?? '3000', 10)

app.use(express.json())
app.use(Cors())

/**
 * Initializes connection to MongoDB database.
 * @function
 * @async
 */
MongoClient.initialize()
  .then(() => console.info(`${MESSAGES.successDB} ${DB_NAME} 🎉`))
  .catch((error) => {
    console.error(MESSAGES.errorDB, error)
    process.exit(1)
  })

/**
 * Recovers all customers.
 * @function
 * @async
 * @param {Response} res - The Request d'Express object.
 * @throws {Error}An internal server error.
 * @returns {Response} A JSON response with customer data or an error message.
 */
app.get('/api/clients', async (req: Request, res: Response) => {
  try {
    const clientsData = await Client.find()
    if (clientsData.length > 0) {
      res.status(200).json({ success: true, message: MESSAGES.allClient, data: clientsData })
    } else {
      res.status(404).json({ success: false, message: MESSAGES.noClient })
    }
  } catch (error) {
    console.error(MESSAGES.serverError, error)
    res.status(500).json({ success: false, message: MESSAGES.serverError })
  }
})

/**
 * Retrieves customer names.
 * @function
 * @async
 * @param {Request} req - The Request d'Express object.
 * @returns {Response} A JSON response with customer names or an error message.
 */
app.get('/api/clients/name', async (req: Request, res: Response) => {
  try {
    const clientsData = await Client.find({}, 'clientId uuid')
    if (clientsData.length > 0) {
      res.status(200).json({ success: true, message: MESSAGES.clientName, data: clientsData })
    } else {
      res.status(404).json({ success: false, message: MESSAGES.noClient })
    }
  } catch (error) {
    console.error(MESSAGES.errorClientName, error)
    res.status(500).json({ success: false, message: MESSAGES.serverError })
  }
})

/**
 * Récupère un client par son ID.
 * @function
 * @async
 * @param {Request} req - The Request d'Express object.
 * @param {Response} res - L'objet Response d'Express.
 * @throws {Error} Une erreur interne du serveur.
 * @returns {Response} Une réponse JSON avec le client trouvé ou un message d'erreur.
 */
app.get('/api/client/:uuid', async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid
    const client = await Client.findOne({ uuid })
    if (!client) {
      res.status(404).json({ success: false, message: MESSAGES.noClient })
      return
    }
    res.status(200).json({ success: true, message: MESSAGES.client, data: client })
  } catch (error) {
    console.error(MESSAGES.errorClient, error)
    res.status(500).json({ success: false, message: MESSAGES.serverError })
  }
})

/**
 * Vérifie le compte client.
 * @function
 * @async
 * @param {Request} req - The Request d'Express object.
 * @param {Response} res - L'objet Response d'Express.
 * @throws {Error} Une erreur interne du serveur.
 * @returns {Response} Une réponse JSON indiquant si la vérification du compte a réussi ou échoué.
 */
app.get('/api/check-account/:uuid', async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid
    const data = await getCheckAccount(uuid)
    if (data) {
      res.status(202).json({ success: true, message: MESSAGES.checkAccount, data })
    } else {
      res.status(404).json({ success: false, message: MESSAGES.checkError })
    }
  } catch (error) {
    console.error(MESSAGES.serverError, error)
    res.status(500).json({ success: false, message: MESSAGES.serverError })
  }
})

/**
 * Supprime une opération client.
 * @function
 * @async
 * @param {Request} req - The Request d'Express object.
 * @param {Response} res - L'objet Response d'Express.
 * @throws {Error} Une erreur interne du serveur.
 * * @returns {Response} Une réponse JSON indiquant si la suppression de l'opération a réussi ou échoué.
 */
app.delete('/api/client/:uuidClient/operation/:uuidOperation', async (req: Request, res: Response) => {
  try {
    const uuidClient = req.params.uuidClient // Extraire uuidClient directement de req.params
    const uuidOperation = req.params.uuidOperation // Extraire uuidOperation directement de req.params

    const clientTarget = await Client.findOne({ uuid: uuidClient })
    if (!clientTarget) {
      return res.status(404).json({ success: false, message: MESSAGES.noClient })
    }
    await Client.updateOne({ uuid: uuidClient }, { $pull: { operations: { uuid: uuidOperation } } })
    res.sendStatus(204)
  } catch (error) {
    console.error(MESSAGES.errorOperationDelete, error)
    res.status(500).json({ success: false, message: MESSAGES.serverError })
  }
})

app.listen(port, () => {
  console.log(`${MESSAGES.listen} ${port}`)
})

export default app
