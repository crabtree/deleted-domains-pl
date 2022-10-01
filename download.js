const path = require("path");
const https = require("https");
const fs = require("fs");

const URL = "https://dns.pl/deleted_domains.txt"
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
            const f = fs.createWriteStream(fp);
            res.pipe(f);
            f.on("finish", () => {
                f.close();
                resolve();
            });
        }).on("error", () => {
            fs.unlinkSync(fp);
            reject();
        });
    });
}

async function main() {
    const fp = getPath();
    prepareDir(fp);
    await getFile(URL, fp);
}

main();
