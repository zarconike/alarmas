#!/bin/sh
set -xe
: "${UrlKeyCloak?Need an UrlKeyCloak}"
: "${UrlSecurity?Need an UrlSecurity}"
: "${UrlAllowedClients?Need an Storage}"
: "${TokenSTO?Need an TokenSTO}"
: "${UrlNw?Need an UrlNw}"
: "${UrlLegacy?Need an UrlLegacy}"
: "${UrlContent?Need an UrlContent}"

sed -i "s|UrlKeyCloak|${UrlKeyCloak}|g" /usr/share/nginx/html/main*.js
sed -i "s|UrlSecurity|${UrlSecurity}|g" /usr/share/nginx/html/main*.js
sed -i "s|Storage|${UrlAllowedClients}|g" /usr/share/nginx/html/main*.js
T=$( echo ${TokenSTO} | sed -e "s/&/\\\&/g")
sed -i "s|TokenSTO|$T|g" /usr/share/nginx/html/main*.js
sed -i "s|UrlNw|${UrlNw}|g" /usr/share/nginx/html/main*.js
sed -i "s|UrlLegacy|${UrlLegacy}|g" /usr/share/nginx/html/main*.js
sed -i "s|UrlContent|${UrlContent}|g" /usr/share/nginx/html/main*.js

exec "$@"
