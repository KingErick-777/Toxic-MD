const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9ZNDNyMFpsQjV4TThqbGx4SXdhZTRoZTlOc0YzS1YyRFB0RDZ0TkJFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2ZScGJNak5WL0VyMmViTzdVKzZUL2xMQXVDRWxnYytDUm50YlhxUUxYQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUHY2MlhxaWtsNnA1TEZiUHVEYWNWenFhR0NwN1lnNTUxS1JOb2N2Y21FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTHQzU2g3N2RERTN2ZjZ3RGxZaWViZGxTSVQ5RjdYbmNWcTlhVVU2REhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVINHlPaW1hYmxoVVhsb0VDUk9wdGdPb1Arby9waU91Sk9qNGphNkRJM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZLdjBaU1h4WUZwK2IzUzN1NS92NGVwb3ViK2JBY2tidXZQbXY4aW9TSDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU1Yd1NuUmY3U0FaSVdheDZCbmJ4bFhOK0t4Qk1zMEUweU5WallvM3JYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDU3aVNoTm5BYUNHbm8yaVBJamVzTUZzTEVUemRmcktkeFR5UWQ4VkVrND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GTU9OSm81d09rajMxaC9aam0zNVZnMnNxVWFicGYzNnJhSkRWc1EwdGl0Tm9vUkwxNi94eTVDYUllc3BuczcvWmQzMzlXR3hPd3FhUlZQQU1LRENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJ4UXZBTms5djFneXFTcEdtRjZrdnlkM1lST3pteE5OUlhGVmNHUC9KaS80PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWLWQxQVpPR1JUaXQzajFBUFZGbXpBIiwicGhvbmVJZCI6ImJmNGZmMTRlLWYxZDYtNDhjZS1hNzBkLTAyMDEzYTdkMzI3YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzZzNvUnRCeDBDTXE3alM4OS9XQlM5Z3dRc0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXVXdWs5YlFFUCtuVWZEb0dWcEVkOCttbTI4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFEN1RFUU1BIiwibWUiOnsiaWQiOiIyMzQ5MDc4MzIzOTQ4OjE4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJTzVtTHdCRU03TnljQUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzaDVRTm9VQ0pGVi91VG9pcDhXekxaSTFoU0JNNWVDSHBYVlJHVGRIdlZNPSIsImFjY291bnRTaWduYXR1cmUiOiJLby9URmRraktwdnZmdlJ5WVV4VGhTQ0NlN1pOSSs0QlRiSUNRVUxWeGljQVVETHQ0M1RlQi9XZEp4T1M0NW5Eckx0b25jdnJMcVRtamtuMlZNYU1BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoielJBZTBXRlR3L0VCbzBUYS82TW5hUXExUTU5MkpFVzZFcUozOFFtemVNQ1hDbVZSUURmZ0pZVnVSZU0xTWpVVC96ckFIaHBzVXhqVUljT1RnNUY3Qmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDc4MzIzOTQ4OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJJZVVEYUZBaVJWZjdrNklxZkZzeTJTTllVZ1RPWGdoNlYxVVJrM1I3MVQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDYwMzY0NDUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2QzIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349078323948",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
