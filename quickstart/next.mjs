// next.js quickstart

import semver from 'semver';
import  { statSync, appendFileSync } from 'fs'
import chalk from 'chalk';
import fs from 'fs-extra'
import quickstart from './index.js';
import { randomBytes } from 'crypto'

const HELLO_CONFIG_FILE = 'hello.config.js'
const HELLO_COOP_FILE = 'pages/api/hellocoop.js'
const ENV_FILE = '.env.local'

import dotenv from 'dotenv'

// check if @hellocoop/nextjs is installed


const writeConfig = async (options) => {
    options.wildcard_domain=true
    const client_id = await quickstart(options)    
    const filePath = process.cwd()+'/'+HELLO_CONFIG_FILE
    try {
        statSync(filePath)
        const append = `
// added by @hellocoop/quickstart --nextjs on ${(new Date()).toISOString()}
config.client_id = '${client_id}'
`
        appendFileSync( filePath, append)
        console.log(`${chalk.greenBright('✓')} Updated ${HELLO_CONFIG_FILE} with client_id ${chalk.blueBright(client_id)}`)
        return
    } catch (err) {
        if (err.code !== 'ENOENT') { // error other than file does not exist
            throw(err)
        }
    }
    const config =`// ${HELLO_CONFIG_FILE}
// see https://hello.dev/docs/sdks/nextjs/#configuration for details

const config = {
    client_id: '${client_id}',
}
module.exports = config
`
    fs.outputFileSync( filePath, config)
    console.log(`${chalk.greenBright('✓')} Created ${HELLO_CONFIG_FILE} with client_id ${chalk.blueBright(client_id)}`)
}

const writeHelloCoop = async () => {
    const filePath = process.cwd()+'/'+HELLO_COOP_FILE
    try {
        statSync(filePath);
        console.log(`${chalk.yellowBright('⚠')} Skipping - ${HELLO_COOP_FILE} already exists`)
        return
    } catch (err) {
        if (err.code !== 'ENOENT') { // error other than file does not exist
            throw(err)
        }
    }

    const content = `// ${HELLO_COOP_FILE}
// generated by @hellocoop/quickstart --nextjs on ${(new Date()).toISOString()}
// NOTE: this file should not need to be edited
import config from '../../hello.config'
import { pageAuth } from '@hellocoop/nextjs'
export default pageAuth(config)
`
    fs.outputFileSync( filePath, content )
    console.log(`${chalk.greenBright('✓')} Created ${HELLO_COOP_FILE}`)

}


const writeEnvLocal = async () => {
    const existingSecret = process.env.HELLO_COOKIE_SECRET
    if (existingSecret) {
        console.log(`${chalk.yellowBright('⚠')} Skipping - HELLO_COOKIE_SECRET already exists`)
        return
    } 

    const secret = randomBytes(32).toString('hex')
    const env = `
# added by @hellocoop/quickstart --nextjs on ${(new Date()).toISOString()}
HELLO_COOKIE_SECRET='${secret}'
`
    const outputFile = process.cwd()+'/'+ENV_FILE
    appendFileSync(outputFile,env)
    console.log(`${chalk.greenBright('✓')} Updated ${ENV_FILE} with HELLO_COOKIE_SECRET ${chalk.blueBright(secret)}`)
}

const defaultOptions = {
    integration: 'quickstart-nextjs',
    suffix: 'Next.js App',
    wildcard_domain: true,
    provider_hint: 'google github gitlab apple-- email--'
}

const next = async (options) => {
    dotenv.config({ path: './.env.local' })
    options = { ...defaultOptions, ...options }
    try {
        await writeConfig(options)
        await writeHelloCoop()
        await writeEnvLocal()
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

export default next





