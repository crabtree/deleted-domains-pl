const path = require("path");
const https = require("https");
const fs = require("fs");

const URL = "https://dns.pl/deleted_domains1.txt"
const PATH_ROOT = "deleted_domains"

function padWithZero(value) {
    return value <= 9
        ? `0${value}`
        : value.toString();
}

function getPath() {
    const now = new Date();
    return path.join(
        PATH_ROOT,
        now.getFullYear().toString(),
        padWithZero(now.getMonth()+1),
        `${now.getFullYear()}-${padWithZero(now.getMonth()+1)}-${padWithZero(now.getDate())}.txt`
    );
}

function prepareDir(fp) {
    const dirname = path.dirname(fp);
    fs.mkdirSync(dirname, { recursive: true });
}

async function getFile(url, fp) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if(res.statusCode != 200) {
                return reject(`Got status code ${res.statusCode}`);
            }

            const f = fs.createWriteStream(fp);
            res.pipe(f);
            
            f.on("finish", () => {
                f.close((err) => {
                    if(err) {
                        return reject(`Got error on f.close, ${err}`);
                    }
                    return resolve();
                });
            });
        }).on("error", (err) => {
            return reject(`Got error on https.get, ${err}`);
        });
    });
}

async function main() {
    const fp = getPath();
    prepareDir(fp);
    
    try {
        await getFile(URL, fp);
    } catch(ex) {
        console.error(ex);
        fs.unlinkSync(fp);
        process.exit(1);
    }
}

main();
