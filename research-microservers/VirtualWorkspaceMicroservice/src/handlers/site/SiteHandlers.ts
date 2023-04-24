import { Request, Response, Handler } from 'express'
import { AuthRequest } from '@types'
import { StatusCodes } from 'http-status-codes'
import { Model } from '@model'

// handlebars templates are loaded by WebPack using handlebars-loader
// https://www.npmjs.com/package/handlebars-loader
// see webpack.config.js for handlebars-loader config
const signin_handlebars = require('./signin.handlebars.html');
const dashboard_handlebars = require('./dashboard.handlebars.html');
const console_handlebars = require('./console.handlebars.html');
const stream_handlebars = require('./stream.handlebars.html');
const unityGL_handlebars = require('./unityGL.handlebars.html');

export class SiteHandlers {
    private static instance: SiteHandlers;

    private constructor() {
    }

    public static getInstance(): SiteHandlers {
        if (!SiteHandlers.instance) {
            SiteHandlers.instance = new SiteHandlers()
        }
        return SiteHandlers.instance
    }

    public redirectToDashboardHandler: Handler = async (req: AuthRequest, res: Response) => {
        res.status(StatusCodes.OK).redirect('/dashboard/');
    }

    public redirectToConsoleHandler: Handler = async (req: AuthRequest, res: Response) => {
        res.status(StatusCodes.OK).redirect('/console/');
    }

    public redirectToStreamHandler: Handler = async (req: AuthRequest, res: Response) => {
        res.status(StatusCodes.OK).redirect('/stream/');
    }

    public redirectToUnityGLHandler: Handler = async (req: AuthRequest, res: Response) => {
        res.status(StatusCodes.OK).redirect('/UnityGL/');
    }

    public signinHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('signinHandler')
        Model.getInstance().onRequest()
        res.status(StatusCodes.OK).send(this.getSigninContent(req.auth?.accountId))
    }

    private getSigninContent(accountId?: string) {
        return signin_handlebars({ accountId: accountId })
    }

    public dashboardHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('dashboardHandler')
        Model.getInstance().onRequest()
        res.status(StatusCodes.OK).send(this.getDashboardContent(req.auth?.accountId))
    }

    private getDashboardContent(accountId?: string) {
        const data = []
        for (let i=0; i<7; i++) {
            data.push(15000 + Math.floor(Math.random()*5000))
        }
        return dashboard_handlebars({ linkStates: { dashboard: 'active', console: '' }, accountId: accountId, requestCount: Model.getInstance().requestCount, chartData: data.join(',') })
    }

    public consoleHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('consoleHandler')
        Model.getInstance().onRequest()
        const command: string = req.query?.command ? `${req.query?.command}` : ''
        let summary = ''
        let details = ''
        if (command === 'reset') {
            Model.getInstance().resetRequestCount()
            summary = 'Model:resetRequestCount.'
            details = 'requestCount reset successfully.'
        }
        res.status(StatusCodes.OK).send(this.getConsoleContent(req.auth?.accountId, command, summary, details))
    }

    private getConsoleContent(accountId: string | undefined, command: string, summary: string, details: string) {
        return console_handlebars({ linkStates: { dashboard: '', console: 'active' }, accountId: accountId, command, requestCount: Model.getInstance().requestCount, summary, details })
    }

    public streamHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('streamHandler')
        Model.getInstance().onRequest()
        const command: string = req.query?.command ? `${req.query?.command}` : ''
        let summary = ''
        let details = ''
        if (command === 'reset') {
            Model.getInstance().resetRequestCount()
            summary = 'Model:resetRequestCount.'
            details = 'requestCount reset successfully.'
        }
        res.status(StatusCodes.OK).send(this.getStreamContent(req.auth?.accountId, command, summary, details))
    }

    private getStreamContent(accountId: string | undefined, command: string, summary: string, details: string) {
        return stream_handlebars({ linkStates: { dashboard: '', stream: 'active' }, accountId: accountId, command, requestCount: Model.getInstance().requestCount, summary, details })
    }

    public UnityGLHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('unityGLHandler')
        Model.getInstance().onRequest()
        const command: string = req.query?.command ? `${req.query?.command}` : ''
        let summary = ''
        let details = ''
        if (command === 'reset') {
            Model.getInstance().resetRequestCount()
            summary = 'Model:resetRequestCount.'
            details = 'requestCount reset successfully.'
        }
        res.status(StatusCodes.OK).send(this.getUnityGLContent(req.auth?.accountId, command, summary, details))
    }

    private getUnityGLContent(accountId: string | undefined, command: string, summary: string, details: string) {
        return unityGL_handlebars({ linkStates: { dashboard: '', stream: 'active' }, accountId: accountId, command, requestCount: Model.getInstance().requestCount, summary, details })
    }

    public forbiddenHandler: Handler = async (req: AuthRequest, res: Response) => {
        console.log('forbiddenHandler')
        Model.getInstance().onRequest()
        res.status(StatusCodes.OK).json({ error: 'Forbidden.' })
    }
}
