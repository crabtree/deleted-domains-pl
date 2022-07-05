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
        padWithZero(now.getUTCMonth()),
        `${now.getFullYear()}-${padWithZero(now.getMonth()+1)}-${padWithZero(now.getDate())}.txt`
    );
}

function prepareDir(fp) {
    const dirname = path.dirname(fp);
    fs.mkdirSync(dirname, { recursive: true });
}

function main() {
    const fp = getPath();
    prepareDir(fp);
    
    const f = fs.createWriteStream(fp);
    https.get(URL, (res) => {
        res.pipe(f);
        f.on("finish", () => {
            f.close();
        });
    }).on("error", () => {
        fs.unlink(fp);
    });
}

main();
