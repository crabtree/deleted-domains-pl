# deleted-domains-pl

Daily dump of deleted domains from dns.pl

## How it works?

The NASK each day presents recently deleted domains under the URL [https://dns.pl/deleted_domains.txt](https://dns.pl/deleted_domains.txt). This repository contains a Node.js script that downloads this file. There is a GitHub action which runs periodically executing the download script, and pushes the downloaded file into the `deleted-domains` branch of this repository.

## How to get the files?

You can access each downloaded file directly under following path: `https://raw.githubusercontent.com/crabtree/deleted-domains-pl/deleted-domains/deleted_domains/{YEAR}/{MONTH}/{YEAR}-{MONTH}-{DAY}.txt`. Please keep in mind that the script started its life at 5th of July 2022.
