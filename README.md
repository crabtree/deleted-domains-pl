# deleted-domains-pl

Daily dump of deleted domains from dns.pl

## How it works?

The NASK each day presents recently deleted domains under the URL https://dns.pl/deleted_domains.txt. This repository contains a Node.js script that downloads this file. There is a GitHub action which runs periodically executing the download script, and pushes the downloaded file into the deleted-domains branch of this repository.
